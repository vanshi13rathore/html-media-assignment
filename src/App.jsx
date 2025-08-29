import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  IconButton,
  Paper,
  Chip,
  Box,
  CircularProgress,
} from '@mui/material';
import { Send, Mic, VolumeUp } from '@mui/icons-material';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const App = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  const exampleQuestions = [
    "Solve the integral of x^2",
    "Explain Newton's Laws",
    "How do you calculate electrical current?",
  ];

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botResponse = data.response || data.error || 'Sorry, something went wrong.';

      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      setMessages([...newMessages, { text: 'Failed to connect to the server.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (question) => {
    setInput(question);
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  const handleTextToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text.replace(/\$\$(.*?)\$\$/g, '')); // Remove LaTeX for pronunciation
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    chatHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">ProdigyPrep</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((msg, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 1.5,
              mb: 1,
              maxWidth: '80%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#fff',
              ml: msg.sender === 'user' ? 'auto' : '0',
              mr: msg.sender === 'user' ? '0' : 'auto',
            }}
          >
            <Typography variant="body1">
              <Latex>{msg.text}</Latex>
            </Typography>
            {msg.sender === 'bot' && (
              <IconButton size="small" onClick={() => handleTextToSpeech(msg.text)}>
                <VolumeUp fontSize="inherit" />
              </IconButton>
            )}
          </Paper>
        ))}
        {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}
        <div ref={chatHistoryRef} />
      </Container>

      <Paper elevation={3} sx={{ p: 1, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          {exampleQuestions.map((q, i) => (
            <Chip key={i} label={q} onClick={() => handleChipClick(q)} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend}><Send /></IconButton>
          <IconButton color="secondary" onClick={handleVoiceInput}><Mic /></IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
