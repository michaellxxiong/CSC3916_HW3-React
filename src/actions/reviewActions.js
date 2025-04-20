// src/actions/reviewActions.js
export const submitReview = (movieId, reviewData) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('name'); // Or from Redux if available
  
        const payload = {
          username,             //  Capture logged-in user
          review: reviewData.text,
          rating: parseInt(reviewData.rating)
        };
  
        const response = await fetch(`https://csci3916-hw4-api.onrender.com/movies/${movieId}/review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to submit review');
        }
  
        const data = await response.json();
        console.log("Review submission successful:", data);
  
        // You can dispatch success action here if needed
      } catch (error) {
        console.error("Review submission failed:", error);
        // Optionally dispatch a failure action
      }
    };
  };
  