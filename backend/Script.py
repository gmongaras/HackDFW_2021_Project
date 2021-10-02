import time
import boto3
import os
from botocore.exceptions import ClientError
import logging
import threading
import sys
import requests
from flask import Flask
import pymysql
import json
import math



# Create teh flask app
app = Flask(__name__)




# Tracks the progress of the upload_file function
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
# Uploads a file to the AWS S3 bucket
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


# Transcribes a file and returns a link to a JSON file with the transcribed text
def transcribe_file(job_name, file_uri, transcribe_client):
    """
    Transcribes an audio file from an mp3 to text

    :param job_name: The jobname when the job is running
    :param file_uri: The URI where the mp3 file can be found
    :param transcribe_client: The client used to transcribe the mp3

    Returns:
    A URI to download the transcribed audio
    """
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

    Returns:
    True if success. None otherwise.
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
    return True



def upload_recording(infile):
    """
    Uploads an MP3 file to an S3 bucket.

    :param infile: The name of the file to send to the bucket

    Returns:
    True if success. None otherwise
    """

    bucketName = 'hackdfw2021storage'

    # Upload the file
    print('Uploading file')
    upload_file(infile, bucketName)
    print('File uploaded')
    return True



def createDatabase():
    """
    Creates the database needed for this project

    Output:
    A setup database on Amazon RDS
    """

    masterUsername = 'admin'
    masterPass = 'dJL8n2kLGFDf6L4xtBex'
    endpoint = 'hackdfw-2021-db.cra1ktdcyijt.us-east-2.rds.amazonaws.com'

    # Connect to the database and create a cursor
    try:
        db = pymysql.connect(host=endpoint, user=masterUsername, password=masterPass)
    except:
        print("Unable to connect to database")
        exit()
    cursor = db.cursor()

    # Create the database
    cursor.execute("CREATE DATABASE IF NOT EXISTS readingRoomDB;")
    cursor.execute("USE readingRoomDB;")

    # Create the user information table
    cursor.execute("CREATE TABLE IF NOT EXISTS userInfo (ID BIGINT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY (ID));") 

    # Create the recordings table
    cursor.execute("CREATE TABLE IF NOT EXISTS recordings (ID BIGINT, uploader VARCHAR(255), JSON_info JSON, filename VARCHAR(255), PRIMARY KEY(ID));")




def check_credentials(username, password):
    """
    Checks the given credentials against the database's credentials to determine
    if the user enetered the correct credentials

    :param username: A user to search for in the database
    :param password: The password to test against the one in the database

    Return values:
    - 0 if the stored user's password is different from the given one
    - 1 if the stored user's password is the same to the given one
    - -1 if username not in database
    """
    masterUsername = 'admin'
    masterPass = 'dJL8n2kLGFDf6L4xtBex'
    endpoint = 'hackdfw-2021-db.cra1ktdcyijt.us-east-2.rds.amazonaws.com'
    returnVal = 0

    # Connect to the database and create a cursor
    try:
        db = pymysql.connect(host=endpoint, user=masterUsername, password=masterPass)
    except:
        print("Unable to connect to database")
        exit()
    cursor = db.cursor()

    # Use the readingRoomDB database
    cursor.execute("USE readingRoomDB;")

    # Check if the username and passwords are equal
    cursor.execute("SELECT password FROM userInfo WHERE username = '" + username + "';")
    fetch = cursor.fetchall()
    if len(fetch) == 0:
        print("Username not in database")
        returnVal = -1
    else:
        try:
            if ([i[0] for i in fetch][0] == password):
                returnVal = 1
        except:
            if ([i[0] for i in fetch] == password):
                returnVal = 1
    
    # Return false if the values do not match
    cursor.close()
    db.close()
    return returnVal


def add_credentials(username, password):
    """
    Adds the given credentials to the database

    :param username: A username to store in the database
    :param password: A password to store in the database

    Output:
    A username-password combination entry in the database
    """
    masterUsername = 'admin'
    masterPass = 'dJL8n2kLGFDf6L4xtBex'
    endpoint = 'hackdfw-2021-db.cra1ktdcyijt.us-east-2.rds.amazonaws.com'

    # Connect to the database and create a cursor
    try:
        db = pymysql.connect(host=endpoint, user=masterUsername, password=masterPass)
    except:
        print("Unable to connect to database")
        exit()
    cursor = db.cursor()

    # Use the readingRoomDB database
    cursor.execute("USE readingRoomDB;")

    # Add the username and passwork to the userInfo database
    cursor.execute("INSERT INTO userInfo (ID, username, password) VALUES (" + str(int(cursor.execute("SELECT LAST_INSERT_ID() FROM userInfo"))) + ", '" + username + "', '" + password + "');")
    
    
    # Save and close the changes
    db.commit()
    cursor.close()
    db.close()
    return True


def add_recording(uploader, JSON_filename, audio_filename):
    """
    Adds data about an audiofile to the database


    :param uploader: The username of the user uploading the file
    :param JSON_filename: The filename of the JSON file to upload to the database
    :param audio_filename: The filename of the audio file

    Output:
    A new entry in the database with a username, JSON file data, and 
    an audio filename corresponding to that JSON data.
    """
    masterUsername = 'admin'
    masterPass = 'dJL8n2kLGFDf6L4xtBex'
    endpoint = 'hackdfw-2021-db.cra1ktdcyijt.us-east-2.rds.amazonaws.com'

    # Connect to the database and create a cursor
    try:
        db = pymysql.connect(host=endpoint, user=masterUsername, password=masterPass)
    except:
        print("Unable to connect to database")
        exit()
    cursor = db.cursor()

    # Use the readingRoomDB database
    cursor.execute("USE readingRoomDB;")

    # Open the JSON file
    JSON_file = open(JSON_filename, mode='r')

    # Add the username and password to the userInfo database
    JSONF = str(JSON_file.readline())
    s = []
    for i in range(0, len(JSONF)):
        if JSONF[i] == "'":
            s.append("\\" + JSONF[i])
        else:
            s.append(JSONF[i])
    s = ''.join(s)
    cursor.execute("""INSERT INTO recordings (ID, uploader, JSON_info, filename) VALUES (%d, '%s', '%s', '%s');"""%(int(cursor.execute("SELECT LAST_INSERT_ID() FROM recordings")), uploader, s, audio_filename))


    # Save and close the changes
    db.commit()
    JSON_file.close()
    cursor.close()
    db.close()
    return True


def get_JSON_Data(audio_filename):
    """
    Gets the JSON data for a given file

    :param audio_filename: The name of the audiofile to get the JSON data for.

    Returns: JSON data for the given audio file or -1 if the file wasn't found
    """
    masterUsername = 'admin'
    masterPass = 'dJL8n2kLGFDf6L4xtBex'
    endpoint = 'hackdfw-2021-db.cra1ktdcyijt.us-east-2.rds.amazonaws.com'

    # Connect to the database and create a cursor
    try:
        db = pymysql.connect(host=endpoint, user=masterUsername, password=masterPass)
    except:
        print("Unable to connect to database")
        exit()
    cursor = db.cursor()

    # Use the readingRoomDB database
    cursor.execute("USE readingRoomDB;")

    # Get the data
    cursor.execute("SELECT JSON_info FROM recordings WHERE filename = '" + audio_filename + "';")
    JSON_data = cursor.fetchall()
    if len(JSON_data) == 0:
        return -1
    return JSON_data
    





""" Some tests can be found below """
#transcribe_audio('test2.mp3', 'test2_trans.json')
#upload_recording('test2.mp4')
#add_credentials("b", "a")
#print(check_credentials("b", "a"))
#add_recording("bob", "../test2_trans.json", "../test2.mp3")
#print(get_JSON_Data("../test2.mp2"))