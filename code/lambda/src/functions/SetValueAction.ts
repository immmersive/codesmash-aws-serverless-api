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

        console.log(source.value1);
        console.log(value1);
 
        if((value1.startsWith('"') && value1.endsWith('"')) || (value1.startsWith("'") && value1.endsWith("'")))
        { 
            console.log('*1*');
            toSet = value1.slice(1, -1);
            console.log(value1);
        }
        else if(!isNaN(value1))
        { 
            console.log('*2*');
            toSet = Number(value1);
        }
        else if(value1.startsWith('[') && value1.endsWith(']'))
        { 
            console.log('*3*');
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
            console.log('*4*');
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
            console.log('*5*');
            toSet = new Function('data', 'return ' + value1.substring(1))(data);
        }
        else if(value1.includes('(') && value1.includes(')'))
        {
            console.log('*6*');
            console.log(value1);
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
            console.log('*7*');
            toSet = help.getObjectValue(data, value1);
        }
        else 
        { 
            console.log('*8*');
            return false;
        }
 
        help.setObjectValue(data, value2, toSet);
 
        return true;
    }
}