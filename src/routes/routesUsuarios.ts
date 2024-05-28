import express from 'express'; 
import { getAllUsuarios,postUsuarios,getUser,login,deleteUser } from '../controllers/controllerUsuarios';
const router = express.Router();
router.get("/",getAllUsuarios);
router.post("/",postUsuarios);
router.get("/user/:id",getUser);
router.delete("/user/:id",deleteUser);

router.post("/login",login)
export default router;
