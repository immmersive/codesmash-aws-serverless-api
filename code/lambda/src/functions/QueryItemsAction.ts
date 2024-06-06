import { HelpApi } from "../HelpApi";

export class QueryItemsAction
{  
    id = 'query-items'
    
    async run(data: any, 
        source: { value1: any, value2: any, value3: any, value4: any },
        other: { partitionKey: string, sortKey?: string }) : Promise<boolean>
    {  
        var help = new HelpApi();
        var value1 = source.value1;
        var value2 = source.value2;
        var value3 = source.value3;
        var value4 = source.value4;
        var toSet = null as any;

        console.log('********** in QueryItemsAction **********');
        console.log(source);
        console.log('********** in QueryItemsAction **********');
        
        if(value1.startsWith('{') && value1.endsWith('}'))
        { 
            console.log('in 1');
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
            console.log('in 2');
            toSet = new Function('data', 'return data.' + value1)(data);
        }
        else if(help.getObjectValue(data, value1) || help.getObjectValue(data, value1) === 0)
        {
            console.log('in 3');
            toSet = help.getObjectValue(data, value1);
        }
        else
        {
            console.log('in 4');
            return false;
        }
 
        try 
        { 
            console.log('in try');
            var keyConditionExpression = Object
                .keys(toSet)            
                .map(x => '#' + x + ' = ' + ':' + x)
                .reduce((x, y) => x + ' and ' + y);

            var expressionAttributeNames = {} as any;
            var expressionAttributeValues = {} as any;

            Object.keys(toSet).forEach(x => expressionAttributeNames['#' + x] = x);
            Object.keys(toSet).forEach(x => expressionAttributeValues[':' + x] = toSet[x]);

            console.log(keyConditionExpression);
            console.log(expressionAttributeNames);
            console.log(expressionAttributeValues);

            var result = await help.query(
                value3, 
                keyConditionExpression,
                expressionAttributeNames,
                expressionAttributeValues);
  
            if(result) 
            {
                help.setObjectValue(data, value4, result);
            }
            else
            { 
                return false;
            }
 
            return true;
        } 
        catch (error) 
        { 
            console.log(error);
            return false;
        } 
    } 
}