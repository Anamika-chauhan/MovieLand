import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// call api  to get all data about movie
const API_URL = "http://www.omdbapi.com?apikey=a97732a3";

// const movie1 = {
//   Title: "Harry Potter and the Prisoner of Azkaban",
//   Year: "2004",
//   imdbID: "tt0304141",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
// };

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

  // async means take some time to fetch movies
  const searchMovies = async (title) => {
    // dynamically specifing Api url
    const response = await fetch(`${API_URL} &s=${title}`);
    // get data from api
    const data = await response.json();
    // console.log(data);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("movies");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
            <div className="container">
                {movies.map((movie) => (
                    <MovieCard movie={movie}/>
                ))}
            </div>
        ) : (
            <div className="empty">
                <h2>No movies found</h2>
            </div>
        )}
    </div>
  );
};

export default App;
