import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="logo">
          BZProo BLog
        </Link>
      </div>
      <ul className="liens">
        <li>
          <Link to="/" className="lien">
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/blogs/add" className="lien buttonArticle">
            Ajouter un article
          </Link>
        </li>
        <li>
          <Link to="/apropos" className="lien">
            A Propos
          </Link>
        </li>
        <li>
          <Link to="/contact" className="lien">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
