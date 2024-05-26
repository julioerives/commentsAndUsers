import { getConnection } from "../database/database";
import { error } from "../responses/error";
import { commentsFound } from "../responses/comentarios/commentsFound";
import { anythingInserted } from "../responses/anythingInserted";
import { notFound } from "../responses/notFound";
export const getAllComentarios = async (req: any, res: any) => {
  try {
    const connection = await getConnection();
    const allComentarios: any[] = await connection.query(
      "SELECT * FROM comentarios"
    );
    const response = commentsFound(allComentarios[0]);
    console.log(allComentarios[0]);
    res.json(response);
  } catch (e) {
    res.json(error);
  }
};
export const postComentarios = async (req: any, res: any) => {
  const data = req.body;
  try {
    const connection = await getConnection();
    const postComentarios = await connection.query(
      "INSERT INTO comentarios (comentarios,id_usuario) VALUES (?, ?)",
      [data.comentarios, data.id_usuario]
    );
    const response = anythingInserted(
      "Comentario insertados",
      postComentarios[0]
    );
    res.json(response);
  } catch (e) {
    console.log(e);
    res.json();
  }
};
export const getComentario = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const getComment = await connection.query(
      "SELECT * FROM comentarios WHERE id = ?",
      [id]
    );
    if (Array.isArray(getComment[0]) && getComment[0].length < 1) {
      res.status(404).json(notFound);
      return;
    }

    res.status(404).json(commentsFound(getComment[0]));
  } catch (err) {}
};
export default getAllComentarios;
