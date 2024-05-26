export interface RespuestaUsuarios{
    message: string,
    error:boolean,
    data:Usuarios[] | Usuarios | null
}
export interface Usuarios{
    id:number,
    nombre:string,
    apellido:string
    correo:string,
    contraseña:string
}