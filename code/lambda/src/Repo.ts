import { NewType } from "./actions/NewType";
import { GetType } from "./actions/GetType";
import { UpdateType } from "./actions/UpdateType";
import { DeleteType } from "./actions/DeleteType";
import { QueryType } from "./actions/QueryType";
  
export class Repo
{ 
    getActions()
    { 
        return [
            new NewType(),
            new GetType(),
            new UpdateType(),
            new DeleteType(),
            new QueryType()
        ]
    }
}
