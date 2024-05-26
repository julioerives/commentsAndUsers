import { Response } from "../models/modelResponse"
export const anythingInserted=(message:string, data:any):Response=>({
    message:message,
    error:false,
    data:data
})