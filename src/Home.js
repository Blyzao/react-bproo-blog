import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    datas: blogs,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs?_sort=id&_order=desc");

  return (
    <div className="home">
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isLoading && <div> En cours de traitement...</div>}
      {blogs && <BlogList blogs={blogs} title={"Liste des blogs"} />}
    </div>
  );
};

export default Home;
