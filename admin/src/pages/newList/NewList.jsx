import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import storage from '../../firebase';
import './newList.css';
import { getMovies } from '../../contexts/movieContext/apiCalls';
import { createList } from '../../contexts/listContext/apiCalls';
import { MovieContext } from '../../contexts/movieContext/MovieContext';
import { ListContext } from '../../contexts/listContext/ListContext';

export default function NewList() {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  const history = useHistory();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.id]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push('/lists');
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="Popular Movies" id="title" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="action" id="genre" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select id="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>

        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select multiple id="content" onChange={handleSelect} style={{ height: '280px' }}>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {`${movie.title}\u00A0\u00A0\u00A0\u00A0----\u00A0\u00A0\u00A0\u00A0${movie.genre}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
