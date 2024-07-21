const express = require('express');
const multer = require('multer');
const path = require('path');
const pdfController = require('./controllers/pdfController');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// API endpoint
app.post('/api/upload', upload.single('pdf'), pdfController.uploadPdf);


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
