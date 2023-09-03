import { HelpApi } from "../HelpApi";

export class DeleteType
{
    ID: string = '/type/delete';

    async process(args: 
    {   
        id: string
    }): Promise<any>
    {
        var help = new HelpApi();
 
        var result = await help.deleteItem(
        {
            'pk': args.id,
            'sk': args.id
        });         
         
        return {
            id: args.id
        }
    }
}
