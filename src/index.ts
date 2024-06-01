import express from 'express'
import routsApp from './routes/routesComentarios';
import routerUsuarios from './routes/routesUsuarios';
import { config } from 'dotenv';
import { validateToken } from './shared/token/validateToken';
const app = express();
app.use(validateToken);
app.use(express.json());
app.use("/comentarios", routsApp)
app.use("/usuarios",routerUsuarios)
app.use((req:any, res:any,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","*")
    res.header("Access-Control-Allow-Headers","Content-Type, Authorization")
})
app.listen(3000,()=>{
    console.log("listening on port 3000")
})