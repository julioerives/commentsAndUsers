import { Response} from "../models/modelResponse.model"
export const error =(message:string):Response=>({
    message:message,
    error:true,
    data:[]
})