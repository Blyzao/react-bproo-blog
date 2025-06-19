import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="404">
      <h2>Oooooooops.....</h2>
      <p>La page à laquelle vous essayez d'acceder est inacessible.</p>
      <Link>Retour à la page d'accueil</Link>
    </div>
  );
};

export default NotFound;
