import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Ajouter from "./Ajouter";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="contenu">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/add" element={<Ajouter />} />
            <Route path="/blogs/:id/edit" element={<Ajouter />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
            {/* Ajoutez d'autres routes ici */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
