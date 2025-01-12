import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { TypeAnimation } from 'react-type-animation';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: ${props => props.background || 'white'};
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  width: 90%;
  max-width: 1200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: #ff6b6b;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BookContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  
  .stf__parent {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  
  .stf__block {
    background: #fff;
    border: 1px solid #ddd;
  }
`;

const Page = styled.div`
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const MediaContainer = styled(motion.div)`
  width: 70%;
  height: 300px;
  margin: 20px auto;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: rotate(360deg);
    transition: transform 1s ease;
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover .play-button {
    opacity: 1;
  }
`;

const Caption = styled.div`
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0 0 10px 10px;
  
  h3 {
    font-family: 'Dancing Script', cursive;
    font-size: 1.5rem;
    color: #ff6b6b;
    margin: 0 0 5px 0;
  }
  
  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }
`;

const Sticker = styled(motion.div)`
  position: absolute;
  font-size: 24px;
  z-index: 2;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
`;

const Input = styled.input`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: #f7f7f7;
  color: #333;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Hint = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: #ff6b6b;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Letter = styled(motion.div)`
  background: linear-gradient(45deg, #ffe6e6, #ffebeb);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50C50 77.6142 27.6142 100 0 100C-27.6142 100 -50 77.6142 -50 50C-50 22.3858 -27.6142 0 0 0C27.6142 0 50 22.3858 50 50Z' fill='%23ff9999' fill-opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.1;
  }
`;

const LetterContent = styled(motion.div)`
  text-align: center;
  color: #333;
  position: relative;
  z-index: 1;
`;

const LetterTitle = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const LetterText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  color: #555;
`;

const LetterDecoration = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  opacity: 0.6;
  ${props => props.position};
`;

const ContinueButton = styled(motion.button)`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 30px;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
`;

export const Clue2 = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const correctAnswers = ['chapli', 'chaapli','cutie'];

  const checkAnswer = () => {
    const userAnswer = answer.toLowerCase().trim();
    if (correctAnswers.includes(userAnswer)) {
      navigate('/clue3');
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
      background="linear-gradient(135deg, #4b6cb7 0%, #182848 100%)"
    >
      <Card>
        <h1>Second Clue 🎵</h1>
        <TypeAnimation
          sequence={[
            'I am a word used most by you to me \n What am I?',
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
        <Hint
          onClick={() => setShowHint(!showHint)}
          whileHover={{ scale: 1.05 }}
        >
          Need a hint? 💭
        </Hint>
        {showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '10px', fontSize: '0.9rem', color: 'white' }}
          >
             ˚.🎀༘⋆
          </motion.p>
        )}
      </Card>
    </PageContainer>
  );
};

export const Clue3 = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const correctAnswers = ['classes', 'near classes'];

  const checkAnswer = () => {
    const userAnswer = answer.toLowerCase().trim();
    if (correctAnswers.includes(userAnswer)) {
      navigate('/final');
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
      background="linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)"
    >
      <Card>
        <h1>Final Clue 💫</h1>
        <TypeAnimation
          sequence={[
            'I am a place where we first met or first saw each other \n What am I!!',
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
        <Hint
          onClick={() => setShowHint(!showHint)}
          whileHover={{ scale: 1.05 }}
        >
          Need a hint? 💭
        </Hint>
        {showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '10px', fontSize: '0.9rem', color: 'white' }}
          >
            Think about where we usually meet... 🏫
          </motion.p>
        )}
      </Card>
    </PageContainer>
  );
};

export const FinalPage = () => {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showBook, setShowBook] = useState(false);
  
  const mediaPages = [
    {
      title: "Our Fun Videos",
      items: [
        {
          type: "video",
          url: "/videos/niti.MP4",
          thumbnail: "/images/photo_2025-01-12_13-33-09.jpg",
          caption: "Our Special Moments",
          description: "Every moment with you is a treasure! 💖",
          stickers: ["🎵", "💃"]
        },
        {
          type: "video",
          url: "/videos/nitie.MP4",
          thumbnail: "/images/photo_2025-01-12_13-39-33.jpg",
          caption: "Cutie phase",
          description: "Dancing like nobody's watching! 🎉",
          stickers: ["🎊", "✨"]
        }
      ]
    },
    {
      title: "More Memories",
      items: [
        {
          type: "video",
          url: "/videos/nito.MP4",
          thumbnail: "/images/photo_2025-01-12_13-39-34.jpg",
          caption: "Alexa Play mai Pareshaan",
          description: "Creating memories that last forever! 🌟",
          stickers: ["🎭", "💫"]
        },
        {
          type: "image",
          url: "/images/photo_2025-01-12_13-39-33 (2).jpg",
          caption: "Perfect Moments",
          description: "Just us being us! 😊",
          stickers: ["🌈", "💕"]
        }
      ]
    },
    {
      title: "Photo Collection",
      items: [
        {
          type: "image",
          url: "/images/photo_2025-01-12_13-39-33 (3).jpg",
          caption: "Tomboy edition",
          description: "Best friends make life better! 🤗",
          stickers: ["🎀", "💝"]
        },
        {
          type: "image",
          url: "/images/photo_2025-01-12_13-39-33 (4).jpg",
          caption: "One day before exam phase",
          description: "Your smile lights up my day! ✨",
          stickers: ["🌟", "💫"]
        }
      ]
    },
    {
      title: "Special Shots",
      items: [
        {
          type: "image",
          url: "/images/photo_2025-01-12_13-40-13.jpg",
          caption: "Jeva Me Gaurish la roast karte",
          description: "Every picture tells our story! 📸",
          stickers: ["📸", "💖"]
        },
        {
          type: "image",
          url: "/images/photo_2025-01-12_13-40-24.jpg",
          caption: "Jeva Gaurish mala roast karto",
          description: "Here's to many more years! 🎉",
          stickers: ["🎈", "💫"]
        }
      ]
    }
  ];

  const decorations = [
    { emoji: "💝", position: "top: 20px; left: 20px;" },
    { emoji: "✨", position: "top: 20px; right: 20px;" },
    { emoji: "🌹", position: "bottom: 20px; left: 20px;" },
    { emoji: "💫", position: "bottom: 20px; right: 20px;" },
  ];

  const renderPage = (item) => (
    <Page>
      <h2 style={{ 
        fontFamily: 'Dancing Script, cursive',
        fontSize: '2rem',
        color: '#ff6b6b',
        marginBottom: '20px'
      }}>
        {item.caption}
      </h2>
      <MediaContainer
        whileHover={{ y: -5 }}
        onClick={() => {
          if (item.type === "video") {
            setSelectedMedia(item);
          }
        }}
      >
        {item.type === "video" ? (
          <>
            <img src={item.thumbnail} alt={item.caption} />
            <div className="play-button">▶️</div>
          </>
        ) : (
          <img src={item.url} alt={item.caption} />
        )}
        {item.stickers.map((sticker, i) => (
          <Sticker
            key={i}
            style={{
              top: i === 0 ? '10px' : 'auto',
              bottom: i === 1 ? '10px' : 'auto',
              right: i === 0 ? '10px' : 'auto',
              left: i === 1 ? '10px' : 'auto',
            }}
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            {sticker}
          </Sticker>
        ))}
        <Caption>
          <p>{item.description}</p>
        </Caption>
      </MediaContainer>
    </Page>
  );

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      background="linear-gradient(135deg, #FF0099 0%, #493240 100%)"
    >
      <AnimatePresence>
        {!showBook ? (
          <Letter
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LetterContent>
              <LetterTitle>Happy Birthday, Nititi ! 🎂</LetterTitle>
              <LetterText>
                To my dearest best friend,
              </LetterText>
              <LetterText>
                On this special day, I want to tell you how much joy and happiness you bring to my life. 
                Your smile brightens my darkest days, as me kadhich nhi bolnar rakshas sarki hastes. 
              </LetterText>
              <LetterText>
                You're not just my friend, you're my best friend, my confidante, and my biggest supporter. 
                Tbh i never knew we could be this close, but i am so glad that we are.
              </LetterText>
              <LetterText>
                As you start another year of your amazing journey, I wish you all the happiness, success, 
                and love that you deserve. May your dreams take flight and your heart stay as pure and beautiful as it is.
                Let's make this year even more special by celebrating our love story together.
                LOADDSSS OF LOOVVEEEEE !!!!!!
              </LetterText>
              <LetterText>
                Happy Birthday, Sweetheart! Here's to many more years of us! ❤️
              </LetterText>
              <LetterText style={{ marginTop: '30px', fontFamily: 'Dancing Script, cursive', fontSize: '1.5rem' }}>
                Yours one and only  ,<br/>
                Gaurish.. !!!
              </LetterText>
              <ContinueButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBook(true)}
              >
                Open Memory Book 📖
              </ContinueButton>
            </LetterContent>
            {decorations.map((item, index) => (
              <LetterDecoration
                key={index}
                position={item.position}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {item.emoji}
              </LetterDecoration>
            ))}
          </Letter>
        ) : (
          <Card>
            <h1 style={{ 
              textAlign: 'center', 
              fontFamily: 'Dancing Script, cursive',
              fontSize: '3rem',
              color: '#ff6b6b',
              marginBottom: '30px'
            }}>
              Our Memory Book
            </h1>
            <BookContainer>
              <HTMLFlipBook
                width={400}
                height={600}
                size="stretch"
                minWidth={300}
                maxWidth={400}
                minHeight={400}
                maxHeight={600}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                className="demo-book"
                style={{ margin: '0 auto' }}
              >
                {/* Cover */}
                <Page>
                  <div style={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)',
                    borderRadius: '10px',
                    padding: '20px'
                  }}>
                    <h1 style={{ 
                      color: 'white',
                      fontSize: '2.5rem',
                      textAlign: 'center',
                      fontFamily: 'Dancing Script, cursive',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      Our Special Memories
                    </h1>
                    <p style={{ color: 'white', fontSize: '1.2rem' }}>
                      A collection of our best moments 
                    </p>
                  </div>
                </Page>

                {/* Media Pages */}
                {mediaPages.flatMap(page => 
                  page.items.map(item => renderPage(item))
                )}

                {/* Back Cover */}
                <Page>
                  <div style={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(45deg, #fad0c4, #ff9a9e)',
                    borderRadius: '10px',
                    padding: '20px'
                  }}>
                    <h2 style={{ 
                      color: 'white',
                      fontSize: '2rem',
                      textAlign: 'center',
                      fontFamily: 'Dancing Script, cursive',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      The End
                    </h2>
                    <p style={{ color: 'white', fontSize: '1.1rem' }}>
                      Here's to many more memories! 
                    </p>
                  </div>
                </Page>
              </HTMLFlipBook>
            </BookContainer>

            {/* Full-screen media viewer */}
            {selectedMedia && selectedMedia.type === "video" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  zIndex: 1000
                }}
                onClick={() => setSelectedMedia(null)}
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  style={{ maxWidth: '90%', maxHeight: '90%' }}
                  onClick={e => e.stopPropagation()}
                >
                  <video
                    controls
                    autoPlay
                    style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '10px' }}
                  >
                    <source src={selectedMedia.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </motion.div>
            )}
          </Card>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
