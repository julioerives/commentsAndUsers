import express from 'express'; 
import { getAllUsuarios,postUsuarios,getUser,login } from '../controllers/controllerUsuarios';
const router = express.Router();
router.get("/",getAllUsuarios);
router.post("/",postUsuarios);
router.get("/user/:id",getUser);
router.post("/login",login)
export default router;
