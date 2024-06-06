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

        console.log('in return');
        console.log(value1);
        console.log('in return');
 
        if(help.getObjectValue(data, value1) || help.getObjectValue(data, value1) === 0)
        {
            console.log('help.getObjectValue');
            toSet = help.getObjectValue(data, value1);
            console.log('help.getObjectValue');
            console.log(toSet);
        }
        else 
        { 
            return false;
        }

        console.log('exiting return');
        console.log(toSet);

        help.setObjectValue(data, 'return', value1);

        console.log('after set object');
        console.log(data);
 
        return true;
    }
}