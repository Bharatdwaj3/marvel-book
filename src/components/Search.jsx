import axios from "axios";
import { useState } from "react";
import md5 from "md5";
import Img from "../assets/paper.jpg";
import ComicCard from "./ComicCard";

function Search() {
  const [characterData, setCharacterData] = useState([]);
  const [characterName, setCharacterName] = useState("");
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  const getCharacterData = (event) => {
    if (event.key === "Enter") {
      const timeStamp = new Date().getTime();
      const hash = generateHash(timeStamp);
      const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

      axios
        .get(url)
        .then((response) => {
          setCharacterData(response.data.data.results || []); 
          console.log(response.data.data.results);
        })
        .catch((error) => {
          console.error("Error fetching character data:", error);
          setCharacterData([]); 
        });

      setCharacterName("");
    }
  };

  const generateHash = (timeStamp) => {
    return md5(timeStamp + privateKey + publicKey);
  };

  return (
    <>
      <div className="h-[2000px] bg-gradient-to-tr from-slate-800 to-slate-800 w-full justify-center relative">
        <div className="ml-52 rounded-3xl bg-opacity-30 bg-slate-300 w-[900px] h-96 absolute inset-y-32 -bottom-8">
          <input
            placeholder="Character..."
            className="mt-36 ml-[150px] h-12 w-[600px] rounded-3xl p-[2rem]"
            type="text"
            value={characterName}
            onChange={(event) => setCharacterName(event.target.value)}
            onKeyUp={getCharacterData}
          />
        </div>
        <div className="h-[1260px] w-full absolute bottom-0">
          <div
            style={{background: `url(${Img})`  }}
            className="mt-12  w-full h-auto"
          >
            <div className="ml-20 mr-12 w-[1200px] h-auto">
            
            <ComicCard data={characterData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
