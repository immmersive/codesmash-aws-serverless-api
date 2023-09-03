import { DynamoDB } from "aws-sdk";
import { v4 } from 'uuid'; 

export class HelpApi
{
    async getItem<T>(id: string) : Promise<T>
    {
        return (await new DynamoDB.DocumentClient().get(
        {
            TableName : process.env.database,
            Key: 
            {
                pk: id,
                sk: id
            }
        })
        .promise())
        .Item as T;
    }

    async putItem<T>(item: any) : Promise<T>
    {
        return (await new DynamoDB.DocumentClient().put(
        {
            TableName: process.env.database,
            Item: item,
            ConditionExpression: 'attribute_not_exists(pk) AND attribute_not_exists(sk)'
        })
        .promise())
        .$response
        .data as T;
    }

    async updateItem<T>(         
        key: any,
        values: any,
        names: any,
        update: string) : Promise<T>
    {
        return (await new DynamoDB.DocumentClient().update(
        {
            TableName: process.env.database, 
            ExpressionAttributeNames: names,
            ExpressionAttributeValues: values,
            Key: key,
            UpdateExpression: update,
            ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)'
        })
        .promise())
        .$response
        .data as T;
    }

    async deleteItem<T>(key: any) : Promise<T>
    {
        return (await new DynamoDB.DocumentClient().delete(
        {
            TableName: process.env.database,            
            Key: key,            
            ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)'
        })
        .promise())
        .$response
        .data as T; 
    }

    async query<T>(
        indexName: string, 
        keyConditionExpression: string,
        expressionAttributeValues: any,
        expressionAttributeNames?: any) : Promise<T>
    {
        return (await new DynamoDB.DocumentClient().query(
        {
            TableName : process.env.database,
            IndexName: indexName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames
        })
        .promise())
        .Items as T;
    }

    getUuid(): string
    {
        return v4();
    }
}
