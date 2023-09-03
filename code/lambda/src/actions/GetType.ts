import { HelpApi } from "../HelpApi";

export class GetType
{
    ID: string = '/type/get';

    async process(args: 
    {        
        id: string
    }): Promise<any>
    {
        var help = new HelpApi();
 
        var result = await help.getItem<{ 
            pk: string 
            sk: string 
            type: string 
        }>(args.id); 

        return result;
    }
}
