import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'; // Import useParams

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Get movieId from URL parameters
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading); // Assuming you have a loading state in your reducer
  const error = useSelector(state => state.movie.error); // Assuming you have an error state in your reducer


  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const DetailInfo = () => {
    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie) {
      return <div>No movie data available.</div>;
    }

    return (
      <Card className="bg-dark text-dark p-4 rounded">
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>
        <ListGroup>
          <ListGroupItem><b>{selectedMovie.title}</b></ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}>
                <b>{actor.actorName}</b> {actor.characterName}
              </p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill className="text-warning"/> {selectedMovie.avgRating != null ? selectedMovie.avgRating.toFixed(2) : "N/A"}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body className="bg-white text-dark rounded">
          <h5 className="mb-3">Reviews</h5>
          {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
            selectedMovie.reviews.map((review, i) => (
              <p key={i} className="mb-2">
                <b>{review.username}</b>: {review.review} &nbsp;
                <BsStarFill className="text-warning" /> {review.rating}
              </p>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </Card.Body>

        <Link to={`/movie/${selectedMovie._id}/review`}>
          <Button variant="outline-light" className="mt-3">Write a Review</Button>
        </Link>
        
      </Card>
    );
  };

  return <DetailInfo />;
};


export default MovieDetail;