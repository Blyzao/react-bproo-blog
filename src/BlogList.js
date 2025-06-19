import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "./Modal";

const BlogList = ({ blogs, title, onDelete, onEdit }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDelete = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBlog && onDelete) {
      onDelete(selectedBlog.id);
    }
    setIsDeleteModalOpen(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedBlog && onEdit) {
      const updatedBlog = {
        title: e.target.title.value,
        author: e.target.author.value,
        body: e.target.body.value,
        date: e.target.date.value || new Date().toISOString(),
      };
      onEdit(selectedBlog.id, updatedBlog);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="bloglist">
      <h2 className="bloglist-title">{title}</h2>
      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`} className="blog-titre">
            {blog.title}
          </Link>
          <small className="blog-publication-date">
            Publier le: {blog.date}
          </small>
          <p className="blog-author">Publier par: {blog.author}</p>
          <div className="blog-actions">
            <button onClick={() => handleEdit(blog)} className="btn-edit">
              Modifier
            </button>
            <button onClick={() => handleDelete(blog)} className="btn-delete">
              Supprimer
            </button>
          </div>
        </div>
      ))}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Modifier le blog"
      >
        <form onSubmit={handleUpdate}>
          <label>
            Titre :
            <input
              type="text"
              name="title"
              defaultValue={selectedBlog?.title}
              required
            />
          </label>
          <label>
            Auteur :
            <input
              type="text"
              name="author"
              defaultValue={selectedBlog?.author}
              required
            />
          </label>
          <label>
            Corps :
            <textarea name="body" defaultValue={selectedBlog?.body} required />
          </label>
          <label>
            Date :
            <input
              type="datetime-local"
              name="date"
              defaultValue={
                selectedBlog?.date
                  ? new Date(selectedBlog.date).toISOString().slice(0, 16)
                  : ""
              }
            />
          </label>
          <button type="submit" className="btn-save">
            Sauvegarder
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
      >
        <p>Êtes-vous sûr de vouloir supprimer "{selectedBlog?.title}" ?</p>
        <button onClick={confirmDelete} className="btn-confirm-delete">
          Oui
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="btn-cancel"
        >
          Non
        </button>
      </Modal>
    </div>
  );
};

export default BlogList;
