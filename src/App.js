import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Howl } from 'howler';
import Particles from 'react-particles';
import { loadFull } from "tsparticles";
import { Clue2, Clue3, FinalPage } from './CluePages';

const birthdaySong = new Howl({
  src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'], // Happy instrumental music
  loop: true,
  volume: 0.5,
});

const backgroundMusic = new Howl({
  src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'],
  loop: true,
  volume: 0.3,
});

// Styled Components
const PageContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: ${props => props.background || 'linear-gradient(135deg, #1a1a1a 0%, #363636 100%)'};
  color: white;
  position: relative;
  overflow: hidden;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.1rem;
  text-align: center;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled(motion.button)`
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 10px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Welcome Page
const WelcomePage = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  const startHunt = () => {
    backgroundMusic.play();
    birthdaySong.pause();
    setStarted(true);
    setTimeout(() => navigate('/clue1'), 2000);
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      background="linear-gradient(135deg, #000428 0%, #004e92 100%)"
    >
      <Particles
        init={loadFull}
        options={{
          particles: {
            number: { value: 80 },
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            move: {
              enable: true,
              speed: 3
            }
          }
        }}
      />
      <Card>
        <TypeAnimation
          sequence={[
            'Hey there! 🌟',
            1000,
            'Ready for an adventure?',
            1000,
            'A special birthday surprise awaits...',
            1000,
            'But first, you must solve some mysteries! 🔍',
            1000,
          ]}
          wrapper="h1"
          speed={50}
          style={{ fontSize: '2em', marginBottom: '20px' }}
          repeat={0}
        />
        {!started ? (
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startHunt}
          >
            Begin the Adventure 🎈
          </Button>
        ) : (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Preparing your journey... ✨
          </motion.h2>
        )}
      </Card>
    </PageContainer>
  );
};

// First Clue Page
const Clue1 = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const correctAnswers = ['paisa', 'money'];

  const checkAnswer = () => {
    const userAnswer = answer.toLowerCase().trim();
    if (correctAnswers.includes(userAnswer)) {
      navigate('/clue2');
    } else {
      document.querySelector('input').classList.add('shake');
      setTimeout(() => {
        document.querySelector('input').classList.remove('shake');
      }, 500);
    }
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      background="linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)"
    >
      <Card>
        <h1>First Clue 🔍</h1>
        <TypeAnimation
          sequence={[
            'I am a thing we both love ,\n i am the thing we both want \n What am I?',
          ]}
          wrapper="p"
          speed={50}
          style={{ fontSize: '1.2em', whiteSpace: 'pre-line', margin: '20px 0' }}
        />
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer..."
        />
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
        >
          Check Answer 🔍
        </Button>
      </Card>
    </PageContainer>
  );
};

// App Component
const App = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [balloons, setBalloons] = useState([]);
  const [currentPhotoSet, setCurrentPhotoSet] = useState('her');
  const [flippedCards, setFlippedCards] = useState({});

  // Photo sets
  const photoSets = {
    her: [
      { 
        url: "https://via.placeholder.com/300x250", 
        caption: "Your beautiful smile ✨", 
        backText: "You light up every room you walk into!" 
      },
      { 
        url: "https://via.placeholder.com/300x250", 
        caption: "Queen on her throne 👑", 
        backText: "Always carrying yourself with grace and confidence!" 
      },
      { 
        url: "https://via.placeholder.com/300x250", 
        caption: "Birthday girl! 🎂", 
        backText: "Making every moment special!" 
      },
    ],
    together: [
      { 
        url: "https://via.placeholder.com/300x250", 
        caption: "Best friends forever! 💕", 
        backText: "Years of friendship and countless memories!" 
      },
      { 
        url: "https://via.placeholder.com/300x250", 
        caption: "Our crazy adventures 🌟", 
        backText: "Never a dull moment with you!" 
      },
      { 
        url: "https://via.placeholder.com/300x250", 
        caption: "Partners in crime 😎", 
        backText: "Through thick and thin!" 
      },
    ]
  };

  const messages = [
    "Happy Birthday to my amazing best friend! 🎉",
    "You make every day brighter just by being you! ✨",
    "Here's to another year of crazy adventures together! 🎈",
    "Thank you for being the best friend anyone could ask for! 💖",
    "May your day be as special as you are! 🌟",
    "Celebrating you today and always! 🎊"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (balloons.length < 10) {
        const newBalloon = {
          id: Date.now(),
          color: `hsl(${Math.random() * 360}, 80%, 60%)`,
          x: Math.random() * window.innerWidth,
        };
        setBalloons(prev => [...prev, newBalloon]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [balloons]);

  const toggleMusic = () => {
    if (isPlaying) {
      birthdaySong.pause();
    } else {
      birthdaySong.play();
    }
    setIsPlaying(!isPlaying);
  };

  const startCelebration = () => {
    setShowModal(false);
    setShowConfetti(true);
    birthdaySong.play();
    setIsPlaying(true);
  };

  const togglePhotoSet = () => {
    setCurrentPhotoSet(current => current === 'her' ? 'together' : 'her');
    // Reset flipped states when changing photo set
    setFlippedCards({});
  };

  const handleCardFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/clue1" element={<Clue1 />} />
          <Route path="/clue2" element={<Clue2 />} />
          <Route path="/clue3" element={<Clue3 />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
