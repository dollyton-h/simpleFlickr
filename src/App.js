import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { Pagination } from "@material-ui/lab";

function App() {
  const [photo, setPhoto] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=68ac49c07ba61167a69d3eba81f6505b&tags=${search}&per_page=15&page=${page}&format=json&nojsoncallback=1`;

    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        credentials: "include",
      })
      .then(function (response) {
        return response;
      })
      .then(function (k) {
        let pict = k.data.photos.photo.map((pic) => {
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

  const handleChange = (event, value) => {
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
