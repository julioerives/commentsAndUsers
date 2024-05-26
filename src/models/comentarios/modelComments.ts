export interface RespuestaComentarios{
    message: string;
    error:boolean;
    data:Comentarios[]| Comentarios | null;
}
export interface Comentarios{
    id:number,
    comentario:String,
    id_usuario:number
}