//backend/index.js

const functions = require('firebase-functions');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();

// Configure CORS
const cors = require('cors');
app.use(cors());


const uploadsPath = path.join(__dirname, '../frontend/public/uploads');


// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath); // Specify the destination folder here
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage: storage });

// POST endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).send('File uploaded successfully');
});


// DELETE endpoint for deleting an image
app.delete('/images/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(uploadsPath, fileName);
  console.log('Deleting file:', filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('File deleted successfully');
    }
  });
});


//fetch image from drive
app.get('/images', (req, res) => {
  console.log(uploadsPath)
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const imageDetailsPromises = files.map((file, index) => {
        const filePath = path.join(uploadsPath, file);
        return new Promise((resolve, reject) => {
          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error('Error getting file stats:', err);
              reject(err);
            } else {
              const formattedDate = stats.birthtime.toLocaleString(); 
              resolve({
                serialNumber: index + 1,
                fileName: file,
                imageUrl: `uploads/${file}`,
                uploadDateTime: formattedDate
              });
            }
          });
        });
      });

      Promise.all(imageDetailsPromises)
        .then(imageDetails => {
          res.json(imageDetails);
        })
        .catch(error => {
          res.status(500).send('Internal Server Error');
        });
    }
  });
});

//Fetching the model result
app.get('/compute/:fileName', (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(uploadsPath, fileName);

    // Spawn a child process to run Pred.py with the file path parameter
    const pythonProcess = spawn('python', ['../frontend/public/fdsr.py', filePath], {
      stdio: ['pipe', 'pipe', 'pipe'] // Pipe stderr as well
    });

    // Collect stdout and stderr data
    let stdoutData = '';
    let stderrData = '';

    // Listen for data from stdout
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Listen for data from stderr
    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    // Listen for process exit event
    pythonProcess.on('exit', (code) => {
      if (code === 0) {
        // If the process exits successfully (code 0), log the stdout data
        console.log('Python script output:', stdoutData);

        // Extract JSON data from stdout
        const jsonData = stdoutData.match(/\{.*\}/s);

        if (jsonData) {
          try {
            // Parse the matched JSON data
            const detections = JSON.parse(jsonData[0]);
            console.log(detections);
            res.json({detections});
          } catch (error) {
            console.error('Error parsing JSON:', error);
            console.log('stdoutData:', stdoutData); // Log the stdoutData for inspection
            res.status(500).json({ success: false, error: 'Internal Server Error' });
          }
        } else {
          console.error('No JSON data found in stdout:', stdoutData);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      } else {
        // If the process exits with an error (non-zero code), send an error response including stderr data
        console.error(`Python script execution failed with code ${code}. stderr: ${stderrData}`);
        res.status(500).json({ success: false, error: 'Internal Server Error', stderr: stderrData });
      }
    });
  } catch (error) {
    console.error('Error running Python script:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// Set up Express app as Firebase Function
//exports.api = functions.https.onRequest(app);


//Server port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});