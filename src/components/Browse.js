import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../redux/Userslice.js'; // Import actions
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import bodyVideo from './Logo/body.mp4';
import axios from 'axios';

// Sample movie data
const movies = [
  { title: 'Movie 1', genre: 'Thriller', type: 'Bollywood', rating: 'Top Rated' },
  { title: 'Movie 2', genre: 'Comedy', type: 'Hollywood', rating: 'Mid Rated' },
  { title: 'Movie 3', genre: 'Romance', type: 'Molly', rating: 'Low Rated' },
  { title: 'Movie 4', genre: 'Mystery', type: 'Tollywood', rating: 'Top Rated' },
  { title: 'Movie 5', genre: 'Action', type: 'Bollywood', rating: 'Mid Rated' },
  { title: 'Movie 6', genre: 'Thriller', type: 'Hollywood', rating: 'Top Rated' },
  { title: 'Movie 7', genre: 'Romance', type: 'Tollywood', rating: 'Low Rated' },
  { title: 'Movie 8', genre: 'Comedy', type: 'Molly', rating: 'Top Rated' },
];

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const { user, isLoading } = useSelector((state) => state.user); // Access user and loading state

  const [filter, setFilter] = useState({
    genre: 'All',
    type: 'All',
    rating: 'All',
  });

  const [isButtonClicked, setIsButtonClicked] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); // Store messages in an array
  const [userInput, setUserInput] = useState(''); // State for user input

  const [videos, setVideos] = useState([]); // State for storing fetched videos

  const handleButtonClick = (index) => {
    setIsButtonClicked(index);
    setTimeout(() => {
      setIsButtonClicked(null);
    }, 200);
  };

  const handleStreamAIClick = async () => {
    setIsPopupVisible(true);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return; // Don't send empty messages

    const userMessage = userInput;
    setChatMessages([...chatMessages, { sender: 'user', text: userMessage }]);
    setUserInput(''); // Clear the input field after sending the message

    try {
      const payload = {
        message: userMessage, 
      };

      const response = await axios.post('http://localhost:8000/chat-bot', payload);

      // Add AI's response to the chat messages
      setChatMessages([
        ...chatMessages,
        { sender: 'user', text: userMessage },
        { sender: 'ai', text: response.data.message },
      ]);
    } catch (error) {
      console.error('Error while fetching chat response:', error);
      setChatMessages([
        ...chatMessages,
        { sender: 'user', text: userMessage },
        { sender: 'ai', text: 'There was an error with the chat service.' },
      ]);
    }
  };

  const filterMovies = (movies) => {
    return movies.filter((movie) => {
      return (
        (filter.genre === 'All' || movie.genre === filter.genre) &&
        (filter.type === 'All' || movie.type === filter.type) &&
        (filter.rating === 'All' || movie.rating === filter.rating)
      );
    });
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/video/upload-video');
      setVideos(response.data); // Set the fetched videos to state
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(setLoading(true));
      setTimeout(() => {
        // After a timeout or an API call, set user or handle failure
        dispatch(setUser(null));  // Simulate user not being logged in
        dispatch(setLoading(false));  // Set loading state to false
        navigate('/');  // Redirect to login if no user is found
      }, 100);  // Simulate an API call delay
    }

    fetchVideos(); // Fetch the videos when component mounts
  }, [user, isLoading, dispatch, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <video
        autoPlay
        loop
        muted
        style={styles.backgroundVideo}
        playbackRate={2}
      >
        <source src={bodyVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.sidebar}>
        <div style={styles.streamAI} onClick={handleStreamAIClick}>
          StreamAI
        </div>
        <div
          style={isButtonClicked === 0 ? styles.sidebarItemClicked : styles.sidebarItem}
          onClick={() => handleButtonClick(0)}
        >
          Settings
        </div>
        <div
          style={isButtonClicked === 1 ? styles.sidebarItemClicked : styles.sidebarItem}
          onClick={() => handleButtonClick(1)}
        >
          Notifications
        </div>
        <div
          style={isButtonClicked === 2 ? styles.sidebarItemClicked : styles.sidebarItem}
          onClick={() => handleButtonClick(2)}
        >
          Downloads
        </div>
        <div
          style={isButtonClicked === 3 ? styles.sidebarItemClicked : styles.sidebarItem}
          onClick={() => handleButtonClick(3)}
        >
          Preferences
        </div>
      </div>

      <div style={styles.content}>
        <Header />

        <div style={styles.bodyContent}>
          <h1 style={styles.heading}>Welcome to Stream Horizon</h1>
          <p style={styles.description}>Feel the Cinema</p>
        </div>

        <div style={styles.topBar}>
          <select
            style={styles.filterSelect}
            onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
            value={filter.genre}
          >
            <option value="All">All Genres</option>
            <option value="Thriller">Thriller</option>
            <option value="Comedy">Comedy</option>
            <option value="Romance">Romance</option>
            <option value="Mystery">Mystery</option>
          </select>

          <select
            style={styles.filterSelect}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            value={filter.type}
          >
            <option value="All">All Types</option>
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Molly">Molly</option>
            <option value="Tollywood">Tollywood</option>
          </select>

          <select
            style={styles.filterSelect}
            onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
            value={filter.rating}
          >
            <option value="All">All Ratings</option>
            <option value="Top Rated">Top Rated</option>
            <option value="Mid Rated">Mid Rated</option>
            <option value="Low Rated">Low Rated</option>
          </select>
        </div>

        <div style={styles.movieList}>
          {filterMovies(movies).map((movie, index) => (
            <div key={index} style={styles.movieItem}>
              <h3>{movie.title}</h3>
              <p>{movie.genre} | {movie.type} | {movie.rating}</p>
            </div>
          ))}
        </div>

        <div style={styles.uploadedVideos}>
          <h2>Uploaded Videos</h2>
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} style={styles.videoItem}>
                <h3>{video.title}</h3>
                <video width="300" controls>
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          ) : (
            <p>No videos uploaded yet.</p>
          )}
        </div>
      </div>

      {isPopupVisible && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>Chat with StreamAI</h2>
            <div style={styles.chatBox}>
              {chatMessages.map((msg, index) => (
                <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={styles.inputSection}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your question..."
                style={styles.chatInput}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>
                Send
              </button>
            </div>
            <button onClick={() => setIsPopupVisible(false)} style={styles.closeButton}>
              Close Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
  },
  backgroundVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  sidebar: {
    position: 'fixed',
    top: '50%',
    left: '0',
    width: '180px',
    height: 'auto',
    background: 'rgba(0, 0, 0, 0)',
    color: '#fff',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
    transform: 'translateY(-50%)',
    borderRadius: '0 10px 10px 0',
    boxShadow: '10px 0px 20px rgba(0, 0, 0, 0.7)',
  },
  streamAI: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '40px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#e50914',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.8)',
    cursor: 'pointer',
  },
  sidebarItem: {
    margin: '15px 0',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '12px 15px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    background: 'transparent',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
  },
  sidebarItemClicked: {
    margin: '15px 0',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '12px 15px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    color: 'white',
    marginLeft: '210px',
    marginTop: '80px',
  },
  bodyContent: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.5rem',
    marginTop: '10px',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    marginTop: '20px',
  },
  filterSelect: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    background: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    margin: '0 5px',
    width: '250px',
  },
  movieList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    justifyContent: 'center',
    animation: 'fadeInUp 1.5s ease',
  },
  movieItem: {
    background: 'rgba(0, 0, 0, 0.6)',
    padding: '40px',
    borderRadius: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    textAlign: 'center',
    height: '100%',
    width: 'auto',
  },
  uploadedVideos: {
    marginTop: '50px',
    textAlign: 'center',
  },
  videoItem: {
    marginBottom: '20px',
  },
  popup: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)', // Darker background to make the chat more visible
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  popupContent: {
    background: 'rgba(255, 255, 255, 0.8)', // Slightly opaque background for more visibility
    padding: '30px',
    borderRadius: '10px',
    width: '450px',
    textAlign: 'center',
    color: '#000',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.7)', // Increased shadow
  },
  chatBox: {
    height: '300px',
    overflowY: 'scroll',
    marginBottom: '10px',
    marginTop: '15px',
  },
  userMessage: {
    backgroundColor: '#e50914', // Red for user messages
    color: '#fff',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '5px',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '5px',
    alignSelf: 'flex-start',
  },
  inputSection: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  chatInput: {
    width: '80%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: '#e50914',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    marginTop: '15px',
    padding: '10px 15px',
    backgroundColor: '#e50914',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Browse;
