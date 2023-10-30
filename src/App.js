import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [joke, setJoke] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // armazena piadas favoritas no localStorage como uma sequência JSON. Depois, recupera e analisa os dados do localStorage.
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteJokes"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // função fazendo uma chamada assíncrona
  const fetchJoke = async () => {
    try {
      // await - espere que a api(axios.get) retorne uma piada
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random",
      );
      // atualiza o estado joke com a piada obtida ( re-renderização)
      // data - prop que contém os dados retornados pelo servidor.
      // value -  prop específica que contém o valor da piada.
      setJoke(response.data.value);
      // caso erro na busca da piada, trata exceção
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
      <button onClick={fetchJoke}>New joke</button>
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
      <br></br>
      <br></br>
      <p>author: Rodrigo Camargo</p>
    </div>
  );
}

export default App;
