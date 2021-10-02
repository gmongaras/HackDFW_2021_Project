upload_file (helper function):
- Input:
  file_name   | File to upload
  bucket      | Name of bucket to upload to
  object_name | S3 object name. If not specified then file_name is used
- Output:
  True if file was uploaded, else False


transcribe_file (helper function):
- 
- Input:
  job_name          | The jobname when the job is running
  file_uri 	    | The URI where the mp3 file can be found
  transcribe_client | The client used to transcribe the mp3
- Output:
  A URI to download the transcribed audio


transcribe_audio:
- Uploads a file to an S3 bucket and downloads a transcribed JSON file
    for that audio file.
- Input:
  infile  | The name of the file to send to the bucket
  outfile | The name of the file to download
- Output:
  True if success. None otherwise.


upload_recording (not really needed, but useful for only uploads):
- Given an audio file, it uploads it to the S3 bucket for transcription.
- Input:
  infile | The name of the file to send to the bucket
- Output:
  A file is downloaded to the CWD
  True if success. None otherwise


createDatabase:
- Creates the database needed for this project
- Input:
  None
- Output:
  A setup database on Amazon RDS


check_credentials:
- Checks the given credentials against the database's credentials to determine
    if the user enetered the correct credentials
- Inputs:
  username | A user to search for in the database
  password | The password to test against the one in the database
- Output:
  - 0 if the stored user's password is different from the given one
  - 1 if the stored user's password is the same to the given one
  - -1 if username not in database


add_credentials:
- Adds the given credentials to the database
- Input:
  username | A username to store in the database
  password | A password to store in the database
- Output:
  A username-password combination entry in the database


add_recording:
- Adds data about an audiofile to the database
- Input:
  uploader       | The username of the user uploading the file
  JSON_filename  | The filename of the JSON file to upload to the database
  audio_filename | The filename of the audio file
- Output:
  A new entry in the database with a username, JSON file data, and 
    an audio filename corresponding to that JSON data.


get_JSON_Data:
- Gets the JSON data for a given file
- Input:
  audio_filename | The name of the audiofile to get the JSON data for.
- Output:
  JSON data for the given audio file or -1 if the file wasn't found