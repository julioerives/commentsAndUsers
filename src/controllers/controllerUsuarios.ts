import { getConnection } from "../database/database";
import { error } from "../responses/error";
import { anythingInserted } from "../responses/anythingInserted";
export const getAllUsuarios = async(req:any,res:any)=>{
    try{
        const connection = await getConnection()
    const allUsers = await connection.query("SELECT * FROM usuarios");
    res.json(allUsers[0])
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
            res.json({
                message:"Usuario no encontrado",
                error: true,
                data:[]
            })
            return;
        }
        res.json({
            message:"Usuario encontrado",
            error: false,
            data:getUser[0]
        })
    }catch(err){
        console.log(err);
        const response = error
        res.json(response)
    }
}
export const postUsuarios = async(req:any, res:any)=>{
    const data = req.body;
    try{
        const connection = await getConnection();
        const postUsuarios = await connection.query("INSERT INTO usuarios(nombre,apellido,correo) VALUES (?, ?,?)",[data.nombre,data.apellido,data.correo])
        const response = anythingInserted("Usuario insertado",postUsuarios)
    res.json(response)
    }catch(err){
        console.log(err);
        const response = error
        res.json(response)
    }
}