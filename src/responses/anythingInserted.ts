import { Response } from "../models/modelResponse.model"
export const anythingInserted=(message:string, data:any):Response=>({
    message:message,
    error:false,
    data:data
})