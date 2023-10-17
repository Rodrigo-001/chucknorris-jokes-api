import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [joke, setJoke] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteJokes"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random",
      );
      setJoke(response.data.value);
    } catch (error) {
      console.error("Erro ao buscar piada:", error);
    }
  };

  const handleLike = () => {
    const updatedFavorites = [...favorites, joke];
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteJokes", JSON.stringify(updatedFavorites));
  };

  const handleDelete = (index) => {
    const isConfirmed = window.confirm(
      "Tem certeza que quer deletar esta piada?",
    );
    if (isConfirmed) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteJokes", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div>
      <h1>Chuck Norris Joke</h1>
      <button onClick={fetchJoke}>Nova Piada</button>
      <p>{joke}</p>
      <button onClick={handleLike}>Like</button>

      <h2>Favoritos</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            {favorite}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
