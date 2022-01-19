import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    axios.get("https://api.disneyapi.dev/characters").then((res) => {
      setData(res.data.data);
    });
  }, []);
  const loadmoreHandler = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  return (
    <div className='App'>
      <h1 className='heading'>DISNEY CHARACTERS</h1>
      <input
        className='search_bar'
        type='text'
        placeholder='Search...'
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className='mainpage'>
        {data && data.length > 0 ? (
          data
            .filter((person) => {
              if (searchTerm === "") {
                return person;
              } else if (
                person.name
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toString().toLowerCase())
              ) {
                return person;
              }
            })
            .slice(0, visible)
            .map((char) => {
              return (
                <div className='main_card' key={char._id}>
                  <img
                    className='image'
                    src={char.imageUrl}
                    alt='no image available
            '
                  />
                  <div className='desc_container'>
                    <div className='name'>
                      Name: <p> {char.name}</p>
                    </div>

                    <div className='shows'>
                      <p>-: Shows :-</p>
                      <p className='film_name'> {char.films}</p>
                      <p className='tv_shows'> {char.tvShows}</p>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className='loader'></div>
        )}
      </div>
      <button onClick={loadmoreHandler} className='loadmore'>
        load more...
      </button>
    </div>
  );
}

export default App;
