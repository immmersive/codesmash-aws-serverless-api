import { HelpApi } from "../HelpApi";

export class QueryType
{
    ID: string = '/type/query';

    async process(args: 
    {        
        name: string
    }): Promise<any>
    {
        var help = new HelpApi();
 
        var result = (await help.query<{ 
            pk: string 
            sk: string 
            type: string 
        }[]>(
        'type-pk-index', 
        '#type = :type',
        {
            ':type': args.name
        },
        {
            "#type" : "type"
        }));
 
        return result;
    }
}
