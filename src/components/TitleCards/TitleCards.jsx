import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from'../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apidata, setApiData] = useState([])
  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzU2ODkzMTAyY2Y3M2VlMmU3NWJmMmU0ODczZjQyNyIsIm5iZiI6MTc3MDcwMjg3Mi43MDcsInN1YiI6IjY5OGFjODE4NDFlM2U5MjA3ZWQ3ZjI0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.siAabUrus3tlAbJhWtPfgwzMLy9VtpFNPDI89NkZoAg'
  }
};



const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=> {

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel)
}, [])
  return (
    <div className= 'title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apidata.map((card, index)=>{
          return <Link to={`/player/${card.id}`}className="card" key={index}>
          <img src={`http://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""></img>
          <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
