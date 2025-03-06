import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, Fab, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useNavigate } from 'react-router-dom';
import MonkeyIcon from '@mui/icons-material/EmojiNature'; // Using emoji nature as monkey alternative
import { keyframes } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleChat, addMessage } from '../store/slices/chatbotSlice';

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const ChatBot: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, messages, showPopup } = useSelector((state: RootState) => state.chatbot);
  const [input, setInput] = useState('');
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).username : '';
  if (isOpen && messages.length === 0) {
    const initialMessage = isLoggedIn
      ? `Hello ${userName}! I'm Vijay Kumar's AI assistant. How can I help you learn more about my portfolio and work?`
      : "Please login to interact with me and explore Vijay's portfolio.";
    dispatch(addMessage({ text: initialMessage, sender: 'bot' }));
  }
  const handleSend = () => {
    if (!input.trim()) return;

    if (!isLoggedIn) {
      dispatch(addMessage({ text: input, sender: 'user' }));
      dispatch(addMessage({ 
        text: "Please login first to interact with me. Click here to login.", 
        sender: 'bot' 
      }));
      setInput('');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    dispatch(addMessage({ text: input, sender: 'user' }));
    setInput('');

    setTimeout(() => {
      const response = getBotResponse(input.toLowerCase());
      dispatch(addMessage({ text: response, sender: 'bot' }));
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    if (!isLoggedIn) {
      return "Please login to interact with me and explore Vijay's portfolio.";
    }

    // Personal Information
    if (input.includes('who are you') || input.includes('about you') || input.includes('introduce')) {
      return "I'm Vijay Kumar B, an aspiring Web Developer and Software Test Engineer based in Wanaparthy, Hyderabad. I specialize in building scalable web applications and have experience in both development and testing. Would you like to know more about my skills or experience?";
    }

    // Skills & Technologies
    if (input.includes('skills') || input.includes('technologies') || input.includes('tech stack')) {
      return "My technical expertise includes:\n\n" +
             "🔹 Frontend: HTML, CSS, ReactJS, Redux, JavaScript\n" +
             "🔹 Cloud & Backend: AWS Services (Cognito, S3, Lambda, etc.), Node.js, MySQL\n" +
             "🔹 Testing: Selenium, Postman, Manual Testing, Test Case Design\n" +
             "🔹 Tools: Git, Material UI, React Toastify, Agile Methodology\n\n" +
             "Which area would you like to know more about?";
    }

    // Education
    if (input.includes('education') || input.includes('qualification') || input.includes('study')) {
      return "My educational background:\n\n" +
             "🎓 B.Tech in Electronics & Communication (2018-2022)\n" +
             "   Sreedattha Institute of Engineering and Science\n\n" +
             "🎓 Diploma in Electronics & Communication (2015-2018)\n" +
             "   Gayathri Institute of Technology and Sciences\n\n" +
             "Would you like to know about my professional experience?";
    }

    // Experience
    if (input.includes('experience') || input.includes('work') || input.includes('internship')) {
      return "Professional Experience:\n\n" +
             "🏢 Product Engineer Intern at Voltuswave\n" +
             "• Developed scalable web apps using ReactJS & AWS\n" +
             "• Worked on Aadhar authentication & adaptive card rendering\n" +
             "• Implemented cloud solutions using AWS services\n\n" +
             "🏢 Software Testing Intern at Ikashi Fintech\n" +
             "• 3-month internship in manual & automation testing\n" +
             "• Designed test cases using Agile methodology\n\n" +
             "Would you like specific details about any role?";
    }

    // Projects
    if (input.includes('project')) {
      return "Here are my key projects:\n\n" +
             "1. E-commerce Platform (Current)\n" +
             "   • Full-stack app with React, Node.js, MySQL\n\n" +
             "2. AWS Cloud Projects\n" +
             "   • Student Data Entry with Redux & AWS\n" +
             "   • S3 Bucket Versioning\n" +
             "   • Cognito Authentication System\n\n" +
             "3. Basic Web Apps\n" +
             "   • Weather App\n" +
             "   • Calculator\n" +
             "   • Rock-Paper-Scissors Game\n\n" +
             "Which project would you like to know more about?";
    }

    // Contact Information
    if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
      return "You can reach me at:\n" +
             "📧 Email: vijaykumar.boddupalli1@gmail.com\n" +
             "📱 Phone: 9440082411\n" +
             "📍 Location: Wanaparthy, Hyderabad";
    }

    // AWS Experience
    if (input.includes('aws') || input.includes('cloud')) {
      return "I have experience with various AWS services:\n\n" +
             "• Cognito for authentication\n" +
             "• S3 for storage solutions\n" +
             "• Lambda for serverless functions\n" +
             "• API Gateway for REST APIs\n" +
             "• EventBridge for automation\n" +
             "• SQS & SNS for messaging\n\n" +
             "Would you like to know about specific AWS projects?";
    }

    // Testing Experience
    if (input.includes('testing') || input.includes('test') || input.includes('qa')) {
      return "My testing expertise includes:\n\n" +
             "• Manual Testing\n" +
             "• Automation with Selenium & Java\n" +
             "• API Testing using Postman\n" +
             "• Test Case Design\n" +
             "• Agile Testing Methodology\n" +
             "• Bug Tracking with Jira\n\n" +
             "Would you like specific details about my testing experience?";
    }

    // Default response
    return "I can tell you about my:\n\n" +
           "• Skills & Technologies\n" +
           "• Work Experience\n" +
           "• Projects\n" +
           "• Education\n" +
           "• AWS Experience\n" +
           "• Testing Knowledge\n\n" +
           "What would you like to know?";
  };

  return (
    <>
      {showPopup && !isLoggedIn && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 20,
            padding: '10px 20px',
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            animation: `${bounceAnimation} 1s infinite`,
            zIndex: 1300,
          }}
        >
          <Typography>Hey, please login! 🐵</Typography>
        </Paper>
      )}

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          animation: showPopup ? `${bounceAnimation} 1s infinite` : 'none',
        }}
        onClick={() => dispatch(toggleChat())}
      >
        <MonkeyIcon sx={{ fontSize: 30, animation: `${bounceAnimation} 2s infinite` }} />
      </Fab>

      {isOpen && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 300,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Box sx={{ 
            p: 1.5,
            bgcolor: 'primary.main', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 35, height: 35 }}>
                <MonkeyIcon sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="subtitle1">Vijay's Assistant</Typography>
            </Box>
            <IconButton size="small" color="inherit" onClick={() => dispatch(toggleChat())}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, p: 2, overflow: 'auto', bgcolor: '#f5f5f5' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                {message.sender === 'bot' && (
                  <Avatar sx={{ width: 35, height: 35, mr: 1 }}>
                    <MonkeyIcon />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '75%',
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'white',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                    {message.text}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          <Box sx={{ p: 2, bgcolor: 'white', borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder={isLoggedIn ? "Kick me a message! 🐵" : "Please login to chat..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={!isLoggedIn}
              />
              <IconButton 
                color="primary" 
                onClick={handleSend}
                disabled={!isLoggedIn}
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  '&:hover': { bgcolor: 'primary.dark' },
                  padding: '4px'
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;