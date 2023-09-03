import { HelpApi } from "../HelpApi";

export class UpdateType
{
    ID: string = '/type/update';

    async process(args: 
    {   
        id: string     
        name: string
    }): Promise<any>
    {
        var help = new HelpApi();
 
        var result = await help.updateItem(
        {
            'pk': args.id,
            'sk': args.id
        },
        {
            ':type': args.name
        },   
        {
            '#type': 'type'
        },              
        'SET #type = :type');         
         
        return {
            id: args.id
        }
    }
}
