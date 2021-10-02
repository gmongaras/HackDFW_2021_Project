import time
import boto3
import os
from botocore.exceptions import ClientError
import logging
import threading
import sys
import requests
from flask import Flask



# Create teh flask app
app = Flask(__name__)




class ProgressPercentage(object):
    def __init__(self, filename):
        self._filename = filename
        self._size = float(os.path.getsize(filename))
        self._seen_so_far = 0
        self._lock = threading.Lock()

    def __call__(self, bytes_amount):
        # To simplify, assume this is hooked up to a single filename
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            sys.stdout.write(
                "\r%s  %s / %s  (%.2f%%)" % (
                    self._filename, self._seen_so_far, self._size,
                    percentage))
            sys.stdout.flush()
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Name of bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name, Callback=ProgressPercentage(file_name))
    except ClientError as e:
        logging.error(e)
        return False
    return True


# https://docs.aws.amazon.com/code-samples/latest/catalog/python-transcribe-getting_started.py.html
def transcribe_file(job_name, file_uri, transcribe_client):
    transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': file_uri},
        MediaFormat='mp3',
        LanguageCode='en-US'
    )

    max_tries = 500
    while max_tries > 0:
        max_tries -= 1
        job = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
        job_status = job['TranscriptionJob']['TranscriptionJobStatus']
        if job_status in ['COMPLETED', 'FAILED']:
            print(f"Job {job_name} is {job_status}.")
            if job_status == 'COMPLETED':
                print(
                    f"Download the transcript from\n"
                    f"\t{job['TranscriptionJob']['Transcript']['TranscriptFileUri']}.")
                
                # Return the file URI
                return job['TranscriptionJob']['Transcript']['TranscriptFileUri']
            break
        else:
            print(f"Waiting for {job_name}. Current status is {job_status}.")
        time.sleep(10)



def transcribe_audio(infile, outfile):
    """
    Uploads a file to an S3 bucket and downloads a transcribed JSON file
    for that audio file.

    :param infile: The name of the file to send to the bucket
    :param outfile: The name of the file to download
    """
    region = 'us-east-2'
    jobName = 'Transcription-job'
    bucketName = 'hackdfw2021storage'


    # Upload the file
    print('Uploading file')
    upload_file(infile, bucketName)
    print('File uploaded')


    # Transcribe the file
    print('Transcribing file')
    transcribe_client = boto3.client('transcribe', region_name=region)
    file_uri = 's3://hackdfw2021storage/'+infile
    transcriptionURI = transcribe_file(jobName, file_uri, transcribe_client)
    print('Transcription finished')
    # Download the transcription file
    transcriptionFile = requests.get(transcriptionURI, allow_redirects=True)
    open(outfile, 'wb').write(transcriptionFile.content)
    # Delete the transcription job
    transcribe_client.delete_transcription_job(TranscriptionJobName=jobName)
    return


transcribe_audio('test2.mp3', 'test2_trans.json')