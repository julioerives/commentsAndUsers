import { RespuestaUsuarios,Usuarios } from "../../models/usuarios/modelUsuarios.model";
export const usersFound=(data:any)=>({
    message:"Usuarios encontrados",
    error:false,
    data:data
})