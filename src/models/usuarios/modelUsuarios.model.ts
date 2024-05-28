export interface RespuestaUsuarios{
    message: string,
    error:boolean,
    data:Usuarios[] | Usuarios | null | UsuarioInformacion
}
export interface Usuarios{
    id:number,
    nombre:string,
    apellido:string
    correo:string,
    contraseña:string
}
export interface Detalles_Usuarios{
    id:number,
    fecha_creacion:string,
    ultima_sesion:string,
}
export interface UsuarioInformacion{
    id:number,
    nombre:string,
    apellido:string
    correo:string,
    contraseña:string,
    detalles: Detalles_Usuarios
}