import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import { useState } from "react";
import ExportData from "./ExportData";

const Home = () => {
  const {
    datas: blogs,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs?_sort=id&_order=desc");
  const [blogData, setBlogData] = useState(blogs);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    });
    setBlogData(blogData.filter((blog) => blog.id !== id));
  };

  const handleEdit = async (id, updatedBlog) => {
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });
    setBlogData(
      blogData.map((blog) =>
        blog.id === id ? { ...blog, ...updatedBlog } : blog
      )
    );
  };

  return (
    <div className="home">
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isLoading && <div>En cours de traitement...</div>}
      <div className="actions">
        <Link to="/blogs/add" className="btn-create">
          Ajouter un nouveau blog
        </Link>
        <ExportData
          data={blogs}
          filename="blogs_export"
          buttonText="Exporter"
          format="xlsx"
        />
      </div>
      {blogs && (
        <BlogList
          blogs={blogs}
          title="Liste des blogs"
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Home;
