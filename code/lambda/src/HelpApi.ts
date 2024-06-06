import { DynamoDB } from "aws-sdk";
import { v4 } from 'uuid'; 

export class HelpApi
{
    async getItem<T>(key: any) : Promise<T>
    {
        return (await new DynamoDB.DocumentClient(
        {
            region: process.env.region
        })
        .get(
        {
            TableName: process.env.database,
            Key: key
        })
        .promise())
        .Item as T;
    }

    async putItem<T>(item: any, conditionExpression: string) : Promise<void>
    {
        await new DynamoDB.DocumentClient(
        { 
            region: process.env.region
        })
        .put(
        {
            TableName: process.env.tableName,
            Item: item,
            ConditionExpression: conditionExpression
        })
        .promise();
    }

    async updateItem<T>(         
        key: any,
        expressionAttributeValues: any,
        expressionAttributeNames: any,
        updateExpression: string,
        conditionExpression: string) : Promise<void>
    {
        await new DynamoDB.DocumentClient(
        {
            region: process.env.region
        })
        .update(
        {
            TableName: process.env.database, 
            Key: key,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            UpdateExpression: updateExpression,
            ConditionExpression: conditionExpression
        })
        .promise(); 
    }

    async deleteItem<T>(key: any, conditionExpression: string) : Promise<T>
    {
        return (await new DynamoDB.DocumentClient().delete(
        {
            TableName: process.env.database,            
            Key: key,            
            ConditionExpression: conditionExpression
        })
        .promise())
        .$response
        .data as T; 
    }

    async query<T>(
        indexName: string, 
        keyConditionExpression: string,
        expressionAttributeNames: any,
        expressionAttributeValues: any) : Promise<T>
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

    getObjectValue(obj: any, path: string) : any | undefined 
    {
        const keys = path.split('.');
        let currentObj = obj;
        let foundValue: any | undefined;
    
        keys.forEach(key => 
        {
            if (!currentObj || typeof currentObj !== 'object') 
            {
                foundValue = undefined;
                return;
            }

            currentObj = currentObj[key];
            foundValue = currentObj;
        });
    
        return foundValue;
    }    

    setObjectValue(obj: any, path: string, value: any) 
    {
        const keys = path.split('.');
        let currentObj = obj;
    
        keys.slice(0, -1).forEach(x => 
        {
            if (!currentObj[x]) currentObj[x] = {};
            
            currentObj = currentObj[x];
        });
    
        currentObj[keys[keys.length - 1]] = value;
    }

    createRegexPattern(prefix: string): RegExp 
    {
        return new RegExp(`^\\/${prefix}$`);
    }

    createRegexPattern2p(prefix: string): RegExp 
    {
        return new RegExp(`^\\/${prefix}\\/[\\w-]+$`);
    }

    createRegexPattern3p(prefix1: string, prefix2: string): RegExp 
    {
        return new RegExp(`^\\/${prefix1}\\/[\\w-]+\\/${prefix2}$`);
    }

    async describeTable() : Promise<{
        AttributeName: string
        KeyType: string
    }[]>
    {
        var described : 
        {
            Table:
            {
                AttributeDefinitions: 
                {
                    AttributeName: string
                    AttributeType: string
                }[]
                GlobalSecondaryIndexes: 
                {
                    IndexName: string
                    KeySchema: 
                    {
                        AttributeName: string
                        KeyType: string
                    }[]
                }[]
                KeySchema: 
                {
                    AttributeName: string
                    KeyType: string
                }[]
            }
        } = (await new DynamoDB(
        {
            region: process.env.region
        })
        .describeTable(
        {
            TableName: process.env.database
        })
        .promise()) as any;

        return described.Table.KeySchema;
    }

    splitRoute(route: string) : string[]
    {
        var temp = route;

        if(route.startsWith('/')) temp = route.substring(1);        

        return temp.split('/').filter(x => x !== '');
    }

    async executeSequentially(functions: (() => Promise<string>)[]) 
    {
        return functions.reduce((promise, func: any) => promise.then(() => func()), Promise.resolve());
    }   

    async promisify(x: any, data: any, source: any, other: any) : Promise<string>
    {    
        return await new Promise(async (resolve, reject) => 
        { 
            var result = await x.run(
                data, 
                source,
                other);      
                  
            result === true ? resolve(x) : reject();            
                           
            return '';
        });
    }

    searchForArray(array: any[], val: any) : boolean
    {
        for (let i = 0; i < array.length; i++) 
        {            
            if(JSON.stringify(array[i]) === JSON.stringify(val)) return true;
        }
        
        return false;
    }

    extractNumbersFromUUID(uuid: string) : number
    {
        return Number.parseInt(uuid.match(/\d/g).join(''));
    }

    selectMany<T, K>(input: T[], selectListFn: (t: T) => K[]): K[] 
    {
        return input.reduce((out, inx) => 
        {
            out.push(...selectListFn(inx));
            return out;
        }, 
        new Array<K>());
    }
}
