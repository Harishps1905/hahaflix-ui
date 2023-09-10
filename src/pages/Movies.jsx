import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import SelectGenre from '../components/SelectGenre';

export default function Movies() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genresLoaded = useSelector((state) => state.hahaflix.genresLoaded);
    const movies = useSelector((state) => state.hahaflix.movies);
    const genres = useSelector((state) => state.hahaflix.genres);


    useEffect(() =>{
      if (genresLoaded) dispatch(fetchMovies({type: "movie"}))
    }, [genresLoaded])

     useEffect(() => {
        console.log("what is happening...");
        dispatch(getGenres());
     },[])
     
    window.onscroll = () =>{
        setIsScrolled(window.scrollY === 0 ? false : true);
        return ()=>{window.onscroll = null};
    }
    onAuthStateChanged(firebaseAuth, (currentUser)=>{
        // if(currentUser) navigate("/");
    })


  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/>
        </div>
        <div className="data">
            <SelectGenre genres={genres} type="movie"/>
            {/* {console.log(movies)} */}
            {movies.length ? <Slider movies={movies} /> : <NotAvailable/>}
        </div>
    </Container>
  )
}


const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-available{
            text-align: center;
            color: white;
        }
    }

` 
