import { HelpApi } from "../HelpApi";

export class ReturnAction 
{ 
    id = 'return'

    async run(
        data: any, 
        source: { value1: any }) : Promise<boolean>
    { 
        var help = new HelpApi();
        var value1 = source.value1;        
        var toSet = null;
 
        if(help.getObjectValue(data, value1) || help.getObjectValue(data, value1) === 0)
        { 
            toSet = help.getObjectValue(data, value1); 
        }
        else 
        { 
            return false;
        }
 
        help.setObjectValue(data, 'return', value1);
 
        return true;
    }
}
