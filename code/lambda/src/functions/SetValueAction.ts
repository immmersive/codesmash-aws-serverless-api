import { HelpApi } from "../HelpApi";

export class SetValueAction 
{ 
    id = 'set-value';

    async run(
        data: any, 
        source: { value1: any, value2: any }) : Promise<boolean>
    {
        var help = new HelpApi();
        var value1 = source.value1;
        var value2 = source.value2;        
        var toSet = null;
 
        if((value1.startsWith('"') && value1.endsWith('"')) || (value1.startsWith("'") && value1.endsWith("'")))
        {  
            toSet = value1.slice(1, -1); 
        }
        else if(!isNaN(value1))
        {  
            toSet = Number(value1);
        }
        else if(value1.startsWith('[') && value1.endsWith(']'))
        {  
            try 
            {
                toSet = JSON.parse("[" + value1.slice(1, -1) + "]") as any[];
            } 
            catch (error) 
            {
                toSet = undefined;
            }
        }
        else if(value1.startsWith('{') && value1.endsWith('}'))
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
        else if(value1.startsWith('@'))
        { 
            toSet = new Function('data', 'return ' + value1.substring(1))(data);
        }
        else if(value1.includes('(') && value1.includes(')'))
        { 
            try 
            {
                toSet = new Function('data', 'return data.' + value1)(data);
            } 
            catch (error) 
            {
                console.log(error);
            }
            
        }        
        else if(help.getObjectValue(data, value1) || help.getObjectValue(data, value1) === 0)
        { 
            toSet = help.getObjectValue(data, value1);
        }
        else 
        {  
            return false;
        }
 
        help.setObjectValue(data, value2, toSet);
 
        return true;
    }
}
