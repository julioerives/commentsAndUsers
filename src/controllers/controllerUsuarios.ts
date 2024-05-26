import { getConnection } from "../database/database";
import { error } from "../responses/error";
import { anythingInserted } from "../responses/anythingInserted";
import { usersFound } from "../responses/usuarios/usersFound";
import { notFound } from "../responses/notFound";
export const getAllUsuarios = async(req:any,res:any)=>{
    try{
        const connection = await getConnection()
    const allUsers = await connection.query("SELECT * FROM usuarios");
    
    const response = usersFound(allUsers[0])
    res.json(response)
    }catch(err){
        console.error(err);
        res.json(error)
    }
}
export const getUser = async(req:any,res:any)=>{
    const data = req.body;
    const {id} = req.params;
    console.log(id);
    try{
        const connection = await getConnection();
        const getUser = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        console.log(getUser[0]);
        if(getUser.length < 1){
            res.json(notFound)
            return;
        }
        res.json({
            message:"Usuario encontrado",
            error: false,
            data:getUser[0]
        })
    }catch(err){
        console.log(err);
        res.json(error)
    }
}
export const postUsuarios = async(req:any, res:any)=>{
    const data = req.body;
    try{
        const connection = await getConnection();
        const postUsuarios = await connection.query("INSERT INTO usuarios(nombre,apellido,correo,contraseña) VALUES (?, ?,?,?)",[data.nombre,data.apellido,data.correo,data.contraseña])
        const response = anythingInserted("Usuario insertado",postUsuarios)
    res.json(response)
    }catch(err){
        console.log(err);
        res.json(error)
    }
}
export const login= async(req:any, res:any)=>{
    const data = req.body;
    try{
        const connection = await getConnection();
        const login = await connection.query("SELECT * FROM usuarios INNER JOIN detalles_usuarios ON usuarios.id = detalles_usuarios.id_usuario WHERE nombre = ? AND correo = ? AND contraseña =?",[data.nombre,data.correo,data.contraseña]);
        if (Array.isArray(login[0]) && login[0].length < 1) {
            res.status(404).json(notFound);
            return;
          }
        // const response = usersFound(login[0])
        res.json(login[0])  
    }catch(e){
        console.log(e)
        res.json(error)
    }
}