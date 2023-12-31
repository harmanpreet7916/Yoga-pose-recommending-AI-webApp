const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

// Set up middleware for handling CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/images", (req, res) => {
  console.log(req.body);
  const { imageNames } = req.body; //extracting imageNames from body which is named same
  if (!imageNames || imageNames === null || imageNames.length === 0) {
    // res.status(200).json({ name: null, data: null });
    return;
  }

  // the images will store whole array of responses may be will confirm soon
  const images = imageNames.map((imageName) => {
    const imagePath = `./images/${imageName}.jpg`; // finding the images one by one from images folder

    try {
      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" }); //reading image with readFileSync function that will read file syncronoulsy and blocking other code from executin and it take image path as an arugument also 64base is passed as optional  to convet binary to deciamal to send it as response it api as string

      return {
        name: imageName,
        image: imageBase64,
      };
    } catch (error) {
      return {
        name: imageName,
        image: null, // Set data to null if image is not found
        // data: fs.readFileSync(`./images/default.jpg`, { encoding: "base64" }), // Set data to null if image is not found
      };
    }
  });
  res.status(200).json(images);

  
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// working code with encoding
