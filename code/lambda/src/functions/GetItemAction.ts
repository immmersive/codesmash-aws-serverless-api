import { HelpApi } from "../HelpApi";

export class GetItemAction
{ 
    id = 'get-item';

    async run(
        data: any, 
        source: { value1: any, value2: any , value3: any },
        other: { partitionKey: string, sortKey?: string }) : Promise<boolean>
    { 
        var help = new HelpApi();
        var value1 = source.value1;
        var value3 = source.value3;
        var toSet = null;
 
        if(value1.startsWith('{') && value1.endsWith('}'))
        { 
            try 
            {
                toSet = new Function('data', 'return ' + value1)(data);
            } 
            catch (error) 
            {
                toSet = undefined as any;
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

        var keys = [other.partitionKey]; 
        var key = {};
        (key as any)[other.partitionKey] = (toSet as any)[other.partitionKey];

        if(other.sortKey) 
        {
            keys.push(other.sortKey); 
            (key as any)[other.sortKey] = (toSet as any)[other.sortKey];
        }
 
        var result = await help.getItem(key);
            
        if(result != undefined) 
        {
            help.setObjectValue(data, value3, result);

            return true;
        }
        else
        { 
            return false;
        }
    }
}
