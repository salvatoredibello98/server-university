const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import the cors middleware
// Enable CORS for all routes
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Configurazione di multer per specificare la cartella di destinazione per i file caricati
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads'); // Imposta la cartella "uploads" come destinazione
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Imposta il nome del file caricato
  },
});

const upload = multer({ storage });

// Rotta per il caricamento dell'immagine
app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Immagine caricata con successo');
});

app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(`${__dirname}/uploads/${filename}`);
  });

// Avvio del server
app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
