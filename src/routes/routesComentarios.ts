import express from 'express'; 
import getAllComentarios,{postComentarios,getComentario} from '../controllers/controllerComentarios'; 
const router = express.Router();
router.get("/", getAllComentarios);
router.post("/",postComentarios);
router.get("/comentario/:id",getComentario)
export default router;