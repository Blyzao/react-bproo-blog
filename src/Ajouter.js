import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Ajouter = () => {
  const { id } = useParams(); // Récupère l'ID du blog pour le mode modification
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!!id); // Détermine si on est en mode modification

  // Charger les données du blog si en mode modification
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://localhost:8000/blogs/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Blog non trouvé");
          return res.json();
        })
        .then((data) => {
          setTitle(data.title);
          setAuthor(data.author);
          setBody(data.body);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Erreur:", error);
          setIsLoading(false);
          navigate("/"); // Rediriger si le blog n'existe pas
        });
    }
  }, [id, navigate]);

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    let tmp_date = new Date().toISOString().split("T");
    const date = `${tmp_date[0]} ${tmp_date[1]}`;
    const blog = { title, author, body, date };
    setIsLoading(true);

    const url = isEditing
      ? `http://localhost:8000/blogs/${id}`
      : "http://localhost:8000/blogs";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        setIsLoading(false);
        console.log(isEditing ? "Blog modifié" : "Nouveau blog ajouté");
        setTitle("");
        setAuthor("");
        setBody("");
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="create-blog">
      <h2>{isEditing ? "Modifier l'article" : "Ajouter un nouvel article"}</h2>
      <form onSubmit={handleBlogSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Titre de l'article</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Sélectionnez un auteur</label>
          <select
            required
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value=""></option>
            <option value="Tony">Tony</option>
            <option value="Duplex">Duplex</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="body">Contenu de l'article</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-control textarea"
            id="body"
            rows="10"
          ></textarea>
        </div>
        <div className="form-group">
          {!isLoading && (
            <button type="submit" className="btn-create">
              {isEditing ? "Enregistrer les modifications" : "Créer Article"}
            </button>
          )}
          {isLoading && (
            <button type="submit" className="btn-create" disabled>
              {isEditing ? "Enregistrement..." : "En cours de traitement..."}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Ajouter;
