import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuote } from './quoteSlice';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { quote, author, loading, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

  return (
    <Container id="quote-box" className="d-flex flex-column align-items-center justify-content-center position-relative">
    {loading && (
      <div className="spinner-container">
        <Spinner animation="border" role="status">
        </Spinner>
      </div>
    )}
    <div id="quote-container">
      {!loading && !error && (
        <>
          <p id="text">{quote}</p>
          <p id="author">- {author}</p>
        </>
      )}
      {error && (
        <Alert variant="danger">Error loading quote</Alert>
      )}
        <Button id="new-quote" onClick={() => dispatch(fetchQuote())} className=" m-3" variant="danger">New Quote</Button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
          target="_top"
          className="btn btn-dark"
        >
          Tweet Quote
        </a>
      </div>
    </Container>
  );
};

export default App;
