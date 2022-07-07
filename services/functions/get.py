import logging
from os import environ
import re
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal
import json
from exceptiongroup import catch

db_resource = boto3.resource('dynamodb')

def main(event, context):
    table = db_resource.Table(environ['table_name'])
    if event['rawPath'] == '/files':
        try:
            result = table.query(
                IndexName='users_file_id',
                KeyConditionExpression=Key('user_id').eq('admin')
            )
            for item in result['Items']:
                item['file_size'] = int(item['file_size'])

            return {
                "statusCode": 200,
                "body": json.dumps(result['Items'])
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'error': logging.error(e),
                'message': 'Error!'
            }
    else:
        try:
            id = event['rawPath'][7:]
            result= table.query(
                    IndexName='file_id_name',
                    KeyConditionExpression=Key('file_id').eq(id)
                )
            result['Items'][0]['file_size'] = int(result['Items'][0]['file_size'])
            print(result['Items'][0])
            return {
                'statusCode': 200,
                'body' : json.dumps(result['Items'][0]),
                'Access-Control-Allow-Origin': '*'
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'error': logging.error(e)
            }