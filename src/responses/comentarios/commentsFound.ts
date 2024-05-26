import { RespuestaComentarios,Comentarios } from "../../models/comentarios/modelComments.model"
export const commentsFound =(comments:any):RespuestaComentarios=>(
    {
        message:"Comentarios encotrados",
        error:false,
        data:comments
    }
)