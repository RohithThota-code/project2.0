import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'


const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#F3FF33', '#33FFF6', '#A6FF33', '#33A6FF'];

function MemoryGame({ onFinish }) {
  const [grid, setGrid] = useState(Array(16).fill(null));
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [score, setScore] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(15);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [revealed, setRevealed] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [data, setData] = useState({score});
  const [captureInterval, setCaptureInterval] = useState(null);
  const videoRef = useRef(undefined);

      useEffect(() => {
          initializeGrid();
          const revealTimeout = setTimeout(() => {
            setRevealed(false);
          }, 5000);
          startCapture();
          return () => {
            clearTimeout(revealTimeout);
            stopCapture();
          };
      }, []);

      function initializeGrid() {
        let tempGrid = Array(16).fill(null);
        let pairs = [...colors, ...colors];
        pairs = pairs.sort(() => Math.random() - 0.5);
    
        pairs.forEach((color, index) => {
          tempGrid[index] = color;
        });
    
        setGrid(tempGrid);
      }
    
      function handleBoxClick(index) {
        if (selectedBoxes.length < 2 && !selectedBoxes.includes(index) && !matchedPairs.includes(grid[index])) {
          const newSelected = [...selectedBoxes, index];
          setSelectedBoxes(newSelected);
          if (newSelected.length === 2) {
            checkMatch(newSelected);
          }
        }
      }
    
      function checkMatch(newSelected) {
        const [first, second] = newSelected;

        const updatedScore = grid[first] === grid[second] ? score + 1 : score;
    
        // Check if they match
        if (grid[first] === grid[second]) {
          setMatchedPairs([...matchedPairs, grid[first]]);
          setScore(updatedScore);
          console.log(updatedScore);
          setSelectedBoxes([]);
        } else {
          setTimeout(() => setSelectedBoxes([]), 1000);
        }
    
        // Decrease attemptsLeft after each attempt
        const newAttemptsLeft = attemptsLeft - 1;
    
        // Set the new attempts left
        setAttemptsLeft(newAttemptsLeft);
    
        // Check if attempts are exhausted
        if (newAttemptsLeft === 0) {
          setTimeout(() => alert('Game Over! Out of attempts.'), 500);
          
           saveGameScore(updatedScore);
           resetGame();

        }
    
        // Check for win condition (8 pairs match)
        if (score + 1 === 8) {
          setTimeout(() => alert('Congratulations! You win!'), 500);
         
            saveGameScore(updatedScore);
            resetGame();
            
          
        }
      }
    
      function resetGame() {
        stopCapture();
        setScore(0);
        setAttemptsLeft(15); // Reset attempts to 15 on new game
        setMatchedPairs([]);
        setRevealed(true);
        initializeGrid();
    
        // Show colors again for 4 seconds before hiding
        setTimeout(() => setRevealed(false), 4000);
      }

      const saveGameScore = async (score) => {
        try{
          const {data}= await axios.post('/save-score',{score})
          if(data.error){
            toast.error(data.error)
          }else{
            setData({})
            toast.success("scores saved successfully")
            console.log('Game score saved:', data);
          }
        }catch(error){
          console.log(error)
    
        }
    
      }

      const startCapture = () => {

        if (!videoRef.current) {
          console.error('Video element is not initialized.');
          return;
        };

        console.log('videoRef.current:', videoRef.current);

        // Start webcam stream
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
    
            // Capture image every 3 seconds
            const interval = setInterval(() => captureImage(), 4000);
            setCaptureInterval(interval);
          })
          .catch((err) => console.error('Error accessing webcam:', err));
      };

      const captureImage = () => {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
      
        if (!video) return;
      
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      
        // Draw video frame to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
        // Convert canvas to Blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'capture.png', { type: 'image/png' });
            saveImageToBackend(file);
          }
        }, 'image/png');
      };//new

      const saveImageToBackend = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
      
        try {
          const response = await axios.post('http://localhost:8000/upload-images', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Image uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error saving image:', error);
        }
      };//new
    
      const stopCapture = () => {
        clearInterval(captureInterval);
        setCaptureInterval(null);
    
        // Stop webcam stream
        if (videoRef.current?.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        }
      };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
       <h1>Memory Game</h1>
       <h2>Score: {score}</h2>
       <h2>Attempts Left: {attemptsLeft}</h2> {/* Display attempts left */}
       {score === 8 ? (
        <h2>Congratulations! You won!</h2>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '320px', margin: '0 auto' }}>
          {grid.map((color, index) => (
            <div
              key={index}
              className="box"
              style={{
                width: '70px',
                height: '70px',
                margin: '5px',
                backgroundColor:
                  revealed || selectedBoxes.includes(index) || matchedPairs.includes(color)
                    ? color
                    : '#ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onClick={() => handleBoxClick(index)}
            ></div>
          ))}
        </div>
      )}
      {score === 8 && <button onClick={() => {onFinish(score)}}>Finish Game</button>}
    </div>
  );
}

export default MemoryGame; 