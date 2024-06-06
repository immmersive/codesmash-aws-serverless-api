export class ApiDefinition
{
    definitions: 
    {
        route: string
        method: string
        funcInvocations: 
        {
            funcId: string
            skip: boolean
            values: any
        }[]
    }[];

    constructor()
    {
        this.definitions = [];
    }
}
