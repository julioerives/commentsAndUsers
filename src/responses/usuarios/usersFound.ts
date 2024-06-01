import { RespuestaUsuarios,Usuarios,Detalles_Usuarios } from "../../models/usuarios/modelUsuarios.model";
export const usersFound=(data:Usuarios[]):RespuestaUsuarios=>({
    message:"Usuarios encontrados",
    error:false,
    data:data
})
export const userFound = (data:Usuarios):RespuestaUsuarios=>({
    message:"Usuario encontrado",
    error:false,
    data:{
        ...data
    }
})
export const userFoundLogin=(data:Usuarios,dataDetails:Detalles_Usuarios,token:string):RespuestaUsuarios=>({
    message:"Usuario encontrado",
    error:false,
    data:
       {
        
        ...data,
        detalles:dataDetails,
        token:token,
       }
})