import { Response } from "../models/modelResponse.model"
export const anythingDeleted =(message:string):Response=>({
    message:message,
    error:false,
    data:[]
})