const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <a href="#" className="logo">
          BZProo BLog
        </a>
      </div>
      <ul className="liens">
        <li>
          <a href="#" className="lien">
            Accueil
          </a>
        </li>
        <li>
          <a href="#" className="lien">
            Articles
          </a>
        </li>
        <li>
          <a href="#" className="lien">
            A Propos
          </a>
        </li>
        <li>
          <a href="#" className="lien">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
