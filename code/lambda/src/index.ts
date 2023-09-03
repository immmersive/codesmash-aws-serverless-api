import { Repo } from "./Repo";

export const handler = async (event: 
{ 
    path: string 
    queryStringParameters: any
}): Promise<any> => 
{     
    var action: 
    { 
        ID : string
        process(p: any) : Promise<any> 
    } = new Repo()
            .getActions()
            .filter(x => x.ID === event.path)[0];

    try 
    {
        return { 
            statusCode: 200,
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(await action.process(event.queryStringParameters))
        };
    } 
    catch (error) 
    {
        return { 
            statusCode: 500,
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: error.message ? error.message : 'API Call Failed',
                code: error.code ? error.code : 'APICallFailed'
            })
        };
    }
}
