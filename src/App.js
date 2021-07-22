import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { Pagination } from "@material-ui/lab";

function App() {
  const [photo, setPhoto] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=42f9a936ec32cb70bcd8c2bb92c7b576&tags=${search}&per_page=10&page=${page}&format=json&nojsoncallback=1`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        return response;
      })
      .then(function (item) {
        let pict = item.data.photos.photo.map((pic) => {
          let srcc = `https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
          return srcc;
        });
        console.log(pict, "kkk");
        setPhoto(pict);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, page]);

  const handleChange = (value) => {
    setPage(value);
  };

  return (
    <>
      <div>
        <input
          className="searchInput"
          value={search}
          placeholder="Search Picture"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
        />
      </div>
      {photo.map((e) => (
        <img className="gbr" src={e} alt="a" />
      ))}

      <Pagination count={5} page={page} onChange={handleChange} />
    </>
  );
}

export default App;
