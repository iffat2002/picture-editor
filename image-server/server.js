const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const path = require('path'); // Import the 'path' module
const PORT = 3001;

// Enable CORS
app.use(cors());


// Generate a random token
const token = Math.random().toString(36).substr(2);

app.use(express.json({ limit: '10mb' })); // To handle large image data

app.post('/api/save-image', (req, res) => {
  const { image } = req.body;
  
  // Strip off the data: URL prefix to get just the base64-encoded bytes
  const base64Data = image.replace(/^data:image\/png;base64,/, '');

  const imagePath = path.join(__dirname, 'saved-images', `image-${Date.now()}.png`);
  
  fs.writeFile(imagePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).json({ error: 'Failed to save image' });
    }
    res.status(200).json({ message: 'Image saved successfully!' });
  });
});

// Serve saved images statically
app.use('/saved-images', express.static(path.join(__dirname, 'saved-images')));




// Mock data for categories with image URLs
const categories = [
  {
    id: 1,
    name: "Pets",
    img: "https://i.pinimg.com/236x/c2/6e/e4/c26ee41e4c5778e84aa835aef082f8c4.jpg",
  },
  {
    id: 2,
    name: "Pets",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmi_-UScGv_Wt0l9Zw1FAW83g4SgAgEbSZ-0HIiFC_OQ&s",
  },
  {
        id: 3,
        name: "Pets",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTveerLsNLxVPCL02lJzaYF2ishRBrh0sDtceZ7pefS0w&s",
      },
      {
        id: 4,
        name: "Cars",
        img: "https://img.freepik.com/premium-photo/pixel-art-car-traveling-down-mountain-road-sunset_899449-275975.jpg",
      },
      {
        id: 5,
        name: "Cars",
        img: "https://wallpapers.com/images/featured/car-anime-n9y7wos0kv3fchgl.jpg",
      },
      {
        id: 6,
        name: "Cars",
        img: "https://thenewswheel.com/wp-content/uploads/2016/11/Initial-D-Toyota-AE86-popular-cars-from-Japanese-anime-steet-racing--760x418.jpg",
      },
      {
        id: 7,
        name: "Universe",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1a0txd0iZz9RNZbjofPUyWxKw9x8sHS8Kh8dmM3iMgw&s",
      },
      {
        id: 8,
        name: "Universe",
        img: "https://i.pinimg.com/474x/33/f7/de/33f7de05d44754d0e0158c00744385d4.jpg",
      },
      {
        id: 9,
        name: "Universe",
        img: "https://cdn.wallpapersafari.com/63/0/RMaSVE.jpg",
      },
];

// Endpoint to get categories
app.get("/categories", (req, res) => {
  res.json(categories);
});

// Middleware to set CORS headers for images
app.use("/images", express.static("images"), cors({
  origin: "*", // Allow requests from any origin
  methods: "GET", // Allow only GET requests
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
