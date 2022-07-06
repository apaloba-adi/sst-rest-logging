from cmath import log
import json
from os import environ
import uuid
import boto3
from datetime import datetime

def main(event, context):
  db_resource = boto3.resource('dynamodb')
  file_data = json.loads(event['body'])
  user_id = file_data['user_id']
  file_id = str(uuid.uuid4())
  date_time = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
  log_level = ''
  error=''
  item = {
    'user_id' : user_id,
    'file_id' : file_id,
    'file_name' : file_data['name'],
    'file_size' : file_data['size'],
    'date_time' : date_time,
    'type' : file_data['type']
  }

  try:
    db_resource.Table(environ['table_name']).put_item(
      Item = item
    )
    log_level = 'info'
  except Exception as e:
    log_level = 'error'
    error = e

  return {
      'data' : item,
      'log' : '[{}::{}::{}::{}]{}'.format(log_level,date_time,user_id,file_id,error)
    }