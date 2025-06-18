import { useParams } from "react-router-dom";
import UseFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    datas: blog,
    isLoading,
    error,
  } = UseFetch(`http://localhost:8000/blogs/${id}`);

  return (
    <div className="detail-blog">
      <h2>Page de détails de blog - {id}</h2>

      {isLoading && <div>Chargement en cours...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {blog && (
        <div className="blog">
          <h2 className="blog-title">{blog.title}</h2>
          <small className="blog-publication-date">
            Publié le : {blog.date}
          </small>
          <p className="blog-body">{blog.body}</p>
          <p className="blog-author">Publié par : {blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
