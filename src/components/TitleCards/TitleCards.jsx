import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);

    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmY4MjcyN2I4Yzk5ZTIyYmYxN2ZmZmQxMTNmYmViYyIsIm5iZiI6MTc2Nzk4NDM2Mi4yMTI5OTk4LCJzdWIiOiI2OTYxNGNlYThjOTZiNGFkYzg1OTVkYjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uecYCO9PQUFke9nEuz50pfLxZV4tRg8a-Qn_u12d3Bo'
        }
    };



    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }



    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));


        const currentRef = cardsRef.current;
        currentRef.addEventListener('wheel', handleWheel);

        return () => {
            currentRef.removeEventListener('wheel', handleWheel);
        };
    }, [])




    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={'https://image.tmdb.org/t/p/w500' + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>

        </div>
    )
}

export default TitleCards