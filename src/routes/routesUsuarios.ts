import express from 'express'; 
import { getAllUsuarios,postUsuarios,getUser } from '../controllers/controllerUsuarios';
const router = express.Router();
router.get("/",getAllUsuarios);
router.post("/",postUsuarios);
router.get("/user/:id",getUser);
export default router;
