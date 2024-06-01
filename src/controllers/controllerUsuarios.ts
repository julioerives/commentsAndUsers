import { getConnection } from "../database/database";
import { error } from "../responses/error";
import { errorMessage } from "../constants/errorMessages";
import { anythingInserted } from "../responses/anythingInserted";
import { anythingDeleted } from "../responses/anythingDeleted";
import { usersFound,userFoundLogin,userFound } from "../responses/usuarios/usersFound";
import { accessToken } from "../shared/token/accessToken";
export const getAllUsuarios = async(req:any,res:any)=>{
    try{
        const connection = await getConnection()
    const allUsers:any = await connection.query("SELECT * FROM usuarios");
    
    const response = usersFound(allUsers[0])
    res.json(response)
    }catch(err){
        console.error(err);
        res.json(error(errorMessage.ERROR))
    }
}
export const getUser = async(req:any,res:any)=>{
    const data = req.body;
    const {id} = req.params;
    console.log(id);
    try{
        const connection = await getConnection();
        const getUser:any = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        console.log(getUser[0]);
        if(getUser.length < 1){
            res.json(error(errorMessage.NOT_FOUND))
            return;
        }
        const response = userFound(getUser[0][0]);
        res.json(response)
    }catch(err){
        console.log(err);
        res.json(error(errorMessage.ERROR))
    }
}
export const postUsuarios = async(req:any, res:any)=>{
    const data = req.body;
    try{
        const connection = await getConnection();
        const valiationExists:any = await connection.query("SELECT * FROM usuarios where correo = ?", [data.correo]);
        if(valiationExists[0][0]){
            res.json(error(errorMessage.MAIL_EXISTS))
            return;
        }
        const postUsuarios = await connection.query("INSERT INTO usuarios(nombre,apellido,correo,contraseña) VALUES (?, ?,?,?)",[data.nombre,data.apellido,data.correo,data.contraseña])
        const response = anythingInserted("Usuario insertado",postUsuarios)
    res.json(response)
    }catch(err){
        console.log(err);
        res.json(error(errorMessage.ERROR))
    }
}
export const deleteUser=async (req:any, res:any)=>{
    const {id} = req.params
    try{
        const connection = await getConnection();
        const deleteUser = await connection.query("DELETE FROM usuarios where id = ?",[id])
        console.log(deleteUser)
        const response = anythingDeleted("Usuario eliminado")
        res.json(response)
    }catch(err){
        console.log(err);
        res.json(error(errorMessage.ERROR))
    }
}
export const login= async(req:any, res:any)=>{
    const data = req.body;
    try{
        const connection = await getConnection();
        const login:any = await connection.query("SELECT * FROM usuarios WHERE nombre = ? AND correo = ? AND contraseña =?",[data.nombre,data.correo,data.contraseña]);
        if (Array.isArray(login[0]) && login[0].length < 1) {
            res.json(error(errorMessage.NOT_FOUND));
            return;
          }
          const date = new Date()
        const updateSession = await connection.query("UPDATE detalles_usuarios SET ultima_sesion = ? WHERE id_usuario = ?",[date,login[0][0].id])
        const dataDetails:any = await connection.query("SELECT id,fecha_creacion,ultima_sesion FROM detalles_usuarios where id_usuario = ?",[login[0][0].id]);
        console.log(dataDetails);
        const token = accessToken(login[0][0].id)
        res.header("authorization",token).json({
            message:"Usuario autenticado",
            token:token
        })
        // const response = userFoundLogin(login[0][0],dataDetails[0][0],token)
        // res.json(response);  
    }catch(e){
        console.log(e)
        res.json(error(errorMessage.ERROR))
    }
}