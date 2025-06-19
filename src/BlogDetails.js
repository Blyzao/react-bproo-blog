import { useParams } from "react-router-dom";
import UseFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    datas: blog,
    isLoading,
    error,
  } = UseFetch(`http://localhost:8000/blogs/${id}`);

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Blog supprimé");
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };
  return (
    <div className="detail-blog">
      <h2>Page de détails de blog - {id}</h2>

      {isLoading && <div>Chargement en cours...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {blog && (
        <div className="blog">
          <h2 className="blog-titre">{blog.title}</h2>
          <small className="blog-publication-date">
            Publié le : {blog.date}
          </small>
          <p className="blog-body">{blog.body}</p>
          <p className="blog-author">Publié par : {blog.author}</p>
          <button
            onClick={() => navigate(`/blogs/${id}/edit`)}
            className="btn-secondary"
          >
            Modifier
          </button>
          <button onClick={() => setShowConfirm(true)} className="btn-danger">
            Supprimer
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmer la suppression</h3>
            <p>
              Êtes-vous sûr de vouloir supprimer ce blog ? Cette action est
              irréversible.
            </p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="btn-danger">
                Oui, supprimer
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
