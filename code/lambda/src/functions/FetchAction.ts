import { HelpApi } from "../HelpApi"; 

export class FetchAction
{
    id = 'fetch'
    
    async run(data: any, 
        source: { value1: any, value2: any , value3: any },
        other: { partitionKey: string, sortKey?: string }) : Promise<boolean>
    {  
        var help = new HelpApi();
        var value3 = source.value3;
        var value2 = source.value2;
        var value1 = source.value1;
        var toUrl = null as any;
        var toHeaders = null as any;
 
        if((value1.startsWith('"') && value1.endsWith('"')) || (value1.startsWith("'") && value1.endsWith("'"))) 
        { 
            toUrl = value1.slice(1, -1);
        }
        else if(!isNaN(value1))
        { 
            toUrl = Number(value1);
        }
        else if(value1.startsWith('[') && value1.endsWith(']'))
        { 
            try 
            {
                toUrl = JSON.parse("[" + value1.slice(1, -1) + "]") as any[];
            } 
            catch (error) 
            {
                toUrl = undefined;
            }
        }
        else if(value1.startsWith('{') && value1.endsWith('}'))
        { 
            try 
            {
                toUrl = new Function('data', 'return ' + value1)(data);
            } 
            catch (error) 
            {
                toUrl = undefined;
            }
        }
        else if(value1.includes('(') && value1.includes(')'))
        {
            toUrl = new Function('data', 'return data.' + value1)(data);
        }
        else if(help.getObjectValue(data, value1) || help.getObjectValue(data, value1) === 0)
        {
            toUrl = help.getObjectValue(data, value1);
        }
        else 
        { 
            return false;
        }
     

        if(value2 && value2.startsWith('{') && value2.endsWith('}'))
        { 
            try 
            {
                toHeaders = new Function('data', 'return ' + value2)(data);
            } 
            catch (error) 
            {
                toHeaders = undefined;
            }
        }
        else if(value2 && value2.includes('(') && value2.includes(')'))
        {
            toHeaders = new Function('data', 'return data.' + value2)(data);
        }
        else if(value2 && (help.getObjectValue(data, value2) || help.getObjectValue(data, value2) === 0))
        {
            toHeaders = help.getObjectValue(data, value2);
        }
        else
        {
            toHeaders = undefined;
        }
   
        try 
        { 
            const response = await fetch(toUrl,
                toHeaders ? {
                    headers: toHeaders
                } : undefined);

            var result = await response.json();
 
            if(result) 
            {
                help.setObjectValue(data, value3, result);
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