import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
}
const apiKey = process.env.REACT_APP_API_KEY;
const tmdbUrl = process.env.REACT_APP_TMDB_BASE_URL;

export const getGenres = createAsyncThunk('hahaflix/genres', async ()=>{
    const {data} = await axios.get(`${tmdbUrl}/genre/movie/list?api_key=${apiKey}`);
    // console.log(data.genres);
    return data.genres;
})

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  
  const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
  };
  
  export const fetchDataByGenre = createAsyncThunk(
    "hahaflix/moviesByGenres",
    async ({ genre, type }, thunkAPI) => {
      const {
        hahaflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${tmdbUrl}discover/${type}?api_key=${apiKey}&with_genres=${genre}`,
        genres
      );
    }
  );
  export const getUserLikedMovies = createAsyncThunk("hahaflix/getLiked", async (email)=>{

    const {data: {Movies}} = await axios.get(`${process.env.REACT_APP_HAHAFLIX_API}liked/${email}`);
    return Movies;
  })
  
  export const removeUserLikedMovies = createAsyncThunk("hahaflix/removeLiked", async ({email, movieId})=>{

    const {data: {movies}} = await axios.put(`${process.env.REACT_APP_HAHAFLIX_API}delete`, {
      email, movieId
    });
    return movies;
  })
  


  export const fetchMovies = createAsyncThunk(
    "hahaflix/trending",
    async ({ type }, thunkAPI) => {
      const {
        hahaflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${tmdbUrl}trending/${type}/week?api_key=${apiKey}`,
        genres,
        true
      );
    }
  );



const hahaflixSlice = createSlice({
    name: 'hahaflix',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled,(state, action)=>{
            state.genres = action.payload;
            state.genresLoaded = true;
        })
        builder.addCase(fetchMovies.fulfilled,(state, action)=>{
            state.movies = action.payload;
        })
        builder.addCase(fetchDataByGenre.fulfilled,(state, action)=>{
            state.movies = action.payload;
        })
        builder.addCase(getUserLikedMovies.fulfilled,(state, action)=>{
          state.movies = action.payload;
        })
        builder.addCase(removeUserLikedMovies.fulfilled,(state, action)=>{
          state.movies = action.payload;
        })
    }
})

export const store = configureStore({
    reducer:{
        hahaflix: hahaflixSlice.reducer,
    }
})