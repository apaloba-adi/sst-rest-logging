import logging
from os import environ
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

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
                'statusCode': 200,
                'message':'Cowabunga',
                'items': result['Items']
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'error': logging.error(e)
            }
    else:
        try:
            id = event['rawPath'][7:]
            result= table.query(
                    IndexName='file_id_name',
                    KeyConditionExpression=Key('file_id').eq(id)
                )
            result['Items'][0]['file_size'] = int(result['Items'][0]['file_size'])
            return {
                'statusCode': 200,
                'result' : result['Items'][0]
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'error': logging.error(e)
            }