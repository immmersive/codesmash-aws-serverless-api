import { HelpApi } from "../HelpApi";

export class NewType
{
    ID: string = '/type/new';

    async process(args: 
    {        
        name: string
    }): Promise<any>
    {
        var help = new HelpApi();

        var id = help.getUuid();
 
        var result = await help.putItem({
            pk: id,
            sk: id,            
            type: args.name
        });
 
        return {
            id: id
        }
    }
}
