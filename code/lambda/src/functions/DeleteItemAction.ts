import { HelpApi } from "../HelpApi";

export class DeleteItemAction
{  
    id = 'delete-item'
    
    async run(data: any, 
        source: { value1: any, value2: any , value3: any },
        other: { partitionKey: string, sortKey?: string }) : Promise<boolean>
    { 
        var help = new HelpApi();
        var value1 = source.value1; 
        var toSet = null;

        if(value1.startsWith('{') && value1.endsWith('}'))
        { 
            try 
            {
                toSet = new Function('data', 'return ' + value1)(data);
            } 
            catch (error) 
            {
                toSet = undefined;
            }
        }
        else if(value1.includes('(') && value1.includes(')'))
        {
            toSet = new Function('data', 'return data.' + value1)(data);
        }
        else if(help.getObjectValue(data, value1) || help.getObjectValue(data, value1) === 0)
        {
            toSet = help.getObjectValue(data, value1);
        }
        else
        {
            return false;
        }
         
        if(!toSet)
        {
            return false;
        }        

        var keys = [other.partitionKey];
        var conditionExpression = 'attribute_exists(' + other.partitionKey + ')';
        var key = {} as any;
        key[other.partitionKey] = toSet[other.partitionKey];

        if(other.sortKey) 
        {
            keys.push(other.sortKey);
            conditionExpression += ' AND attribute_exists(' + other.sortKey + ')';
            key[other.sortKey] = toSet[other.sortKey];
        }
  
        return await help.deleteItem(key, conditionExpression);
    }
}
