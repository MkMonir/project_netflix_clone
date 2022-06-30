import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './movieList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { MovieContext } from '../../contexts/movieContext/MovieContext';
import { deleteMovie, getMovies } from '../../contexts/movieContext/apiCalls';

export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'movie',
      headerName: 'Movie',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: 'genre', headerName: 'Genre', width: 120 },
    { field: 'year', headerName: 'Year', width: 120 },
    { field: 'limit', headerName: 'Limit', width: 120 },
    { field: 'isSeries', headerName: 'IsSeries', width: 120 },

    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: `/movie/${params.row._id}`, movie: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="productList">
        <Link to="/newmovie" className="productAddButtonLink">
          <button className="productAddButton">Create Movie</button>
        </Link>
        <DataGrid
          rows={movies}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      </div>
    </>
  );
}
