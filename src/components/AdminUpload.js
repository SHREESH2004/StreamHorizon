import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file data and other form fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('type', type);
    formData.append('rating', rating);
    formData.append('video', video);        // File input for video
    formData.append('thumbnail', thumbnail); // File input for thumbnail

    try {
      // Post the data to the server
      const response = await axios.post('http://localhost:8000/videos/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Video uploaded successfully!');
        // Optionally reset the form fields after upload
        setTitle('');
        setGenre('');
        setType('');
        setRating('');
        setVideo(null);
        setThumbnail(null);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video!');
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Video:</label>
          <input
            type="file"
            onChange={handleVideoChange}
            accept="video/*"
            required
          />
        </div>
        <div>
          <label>Thumbnail:</label>
          <input
            type="file"
            onChange={handleThumbnailChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
};

// VideoList Component
const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/videos/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Uploaded Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h3>{video.title}</h3>
            <p>Genre: {video.genre}</p>
            <p>Type: {video.type}</p>
            <p>Rating: {video.rating}</p>
            <div>
              <img src={`http://localhost:8000/${video.thumbnail}`} alt={video.title} width="100" />
            </div>
            <video width="320" height="240" controls>
              <source src={`http://localhost:8000/${video.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

// AdminUpload Component - combines UploadVideo and VideoList
const AdminUpload = () => {
  return (
    <div>
      <UploadVideo />
      <VideoList />
    </div>
  );
};

export default AdminUpload;
