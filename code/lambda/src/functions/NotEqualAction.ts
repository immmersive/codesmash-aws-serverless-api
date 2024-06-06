import { HelpApi } from "../HelpApi";

export class NotEqualAction 
{ 
    id = 'not-equal'
    
    async run(data: any, 
        source: { value1: any, value2: any , value3: any },
        other: { partitionKey: string, sortKey?: string }) : Promise<boolean>
    {
        var help = new HelpApi();
        var value2 = source.value2;
        var value1 = source.value1;
        var toCompare1 = null;
        var toCompare2 = null;
  
        if((value1.startsWith('"') && value1.endsWith('"')) || (value1.startsWith("'") && value1.endsWith("'"))) 
        { 
            toCompare1 = value1.slice(1, -1);
        }
        else if(!isNaN(value1))
        { 
            toCompare1 = Number(value1);
        }
        else if(value1.startsWith('[') && value1.endsWith(']'))
        { 
            try 
            {
                toCompare1 = JSON.parse("[" + value1.slice(1, -1) + "]") as any[];
            } 
            catch (error) 
            {
                toCompare1 = undefined;
            }
        }
        else if(value1.startsWith('{') && value1.endsWith('}'))
        { 
            try 
            {
                toCompare1 = new Function('data', 'return ' + value1)(data);
            } 
            catch (error) 
            {
                toCompare1 = undefined;
            }
        }
        else if(value1.includes('(') && value1.includes(')'))
        {
            toCompare1 = new Function('data', 'return data.' + value1)(data);
        }
        else if(help.getObjectValue(data, value1) || help.getObjectValue(data, value1) === 0)
        {
            toCompare1 = help.getObjectValue(data, value1);
        }
        else 
        { 
            return false;
        }
     
        if((value2.startsWith('"') && value2.endsWith('"')) || (value2.startsWith("'") && value2.endsWith("'"))) 
        {
            toCompare2 = value2.slice(1, -1);
        }
        else if(!isNaN(value2))
        {
            toCompare2 = Number(value2);
        }
        else if(value2.startsWith('[') && value2.endsWith(']'))
        {
            try 
            {
                toCompare2 = JSON.parse("[" + value2.slice(1, -1) + "]") as any[];
            } 
            catch (error) 
            {
                toCompare2 = undefined;
            }
        }
        else if(value2.startsWith('{') && value2.endsWith('}'))
        { 
            try 
            {
                toCompare2 = new Function('data', 'return ' + value2)(data);
            } 
            catch (error) 
            {
                toCompare2 = undefined;
            }
        }
        else if(value2.includes('(') && value2.includes(')'))
        {
            toCompare2 = new Function('data', 'return data.' + value2)(data);
        }
        else if(help.getObjectValue(data, value2) || help.getObjectValue(data, value2) === 0)
        {
            toCompare2 = help.getObjectValue(data, value2);
        }
        else 
        {
            return false;
        }

        var s1 = JSON.stringify(toCompare1);
        var s2 = JSON.stringify(toCompare2);
   
        if(Array.isArray(toCompare1) && Array.isArray(toCompare2))
        {
            return s1 !== s2;
        }
        else if(s1.startsWith('{') && s1.endsWith('}') && s2.startsWith('{') && s2.endsWith('}'))
        {
            return s1 !== s2;
        }
        else
        {
            return toCompare1 !== toCompare2;
        }
    }   
}