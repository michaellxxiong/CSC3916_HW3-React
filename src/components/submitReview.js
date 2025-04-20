import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Correct for v6
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie } from '../actions/movieActions';
import { Form, Button, Card } from 'react-bootstrap';

import { submitReview } from '../actions/reviewActions';

const SubmitReview = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); // ✅
  const dispatch = useDispatch();

  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  //const loading = useSelector(state => state.movie.loading);
  //const error = useSelector(state => state.movie.error);

  const [review, setReview] = useState({ rating: '', text: '' });

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitReview(movieId, review));
    setReview({ rating: '', text: '' });
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container mt-4">
      <div className="w-50 mx-auto">
        <Card className="bg-dark text-light p-4 rounded">
          <h3>Submit a Review for {selectedMovie?.title || "Movie"}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="rating" className="mb-3">
              <Form.Label>Rating (1-5)</Form.Label>
              <Form.Group controlId="rating" className="mb-3">
                <Form.Label className="mb-1">Select a Rating (1–5)</Form.Label>
                <div>
                  <Form.Select
                    id="rating"
                    value={review.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a rating</option>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="text" className="mb-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={review.text}
                onChange={handleChange}
                placeholder="Write your review here..."
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Submit Review</Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SubmitReview;
