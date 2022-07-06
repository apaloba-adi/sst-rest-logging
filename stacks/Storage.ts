import { Table, StackContext, RDS, Bucket } from "@serverless-stack/resources";

export function Storage({stack} : StackContext) {
    const table = new Table(
        stack, 'FileInfo', {
            fields: {
                user_id : 'string',
                file_id : 'string',
                file_name : 'string',
                file_size : 'number',
                date_time : 'string',
                type : 'string'
            },
            primaryIndex : {
                partitionKey : 'date_time',
                sortKey : 'file_id'
            },
            localIndexes : {
                users : {
                    sortKey : 'user_id'
                },
                file_name : {
                    sortKey : 'file_name'
                }
            },
            globalIndexes : {
                users_file_id : {
                    partitionKey : 'user_id',
                    sortKey : 'file_id'
                },
                file_id_name : {
                    partitionKey : 'file_id',
                    sortKey : 'file_name'
                }
            }
        }
    )

    const react_bucket = new Bucket(
        stack, 'ReactBucket'
    )

    return {
        table,
        react_bucket
    }
}