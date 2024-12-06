import React, { useState } from 'react';
import './App.css';
import { Slider, Button, Typography, Container, Box } from '@mui/material';

// List of fragrance notes
const notes = ["Floral", "Citrus", "Woody", "Spicy", "Sweet"];

const recommendations = {
  Floral: "Lys 41 By Le Labo",
  Citrus: "Bergamote 22 By Le Labo",
  Woody: "Santal 33 by Le Labo",
  Spicy: "Rose 31 by Le Labo",
  Sweet: "Labdanum 18 by Le Labo",
};

function App() {
  const [preferences, setPreferences] = useState({
    Floral: 50,
    Citrus: 50,
    Woody: 50,
    Spicy: 50,
    Sweet: 50,
  });

  const [result, setResult] = useState("");

  // Handle slider change
  const handleChange = (note, value) => {
    setPreferences((prev) => ({
      ...prev,
      [note]: value,
    }));
  };

  // Generate recommendation based on highest preference
  const handleSubmit = () => {
    const sortedPreferences = Object.entries(preferences).sort(
      (a, b) => b[1] - a[1]
    );
    const topNote = sortedPreferences[0][0];
    setResult(`We recommend: ${recommendations[topNote]} (Top Note: ${topNote})`);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Le Labo Discovery Survey
        </Typography>
        <Typography variant="body1" gutterBottom>
          Rate your preference for each fragrance note:
        </Typography>
        {notes.map((note) => (
          <Box key={note} sx={{ mb: 3 }}>
            <Typography variant="h6">{note}</Typography>
            <Slider
              value={preferences[note]}
              onChange={(e, value) => handleChange(note, value)}
              aria-labelledby={`slider-${note}`}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>
        ))}
        <Button variant="contained" onClick={handleSubmit}>
          Get Recommendation
        </Button>
        {result && (
          <Typography variant="h6" sx={{ mt: 4 }}>
            {result}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;
