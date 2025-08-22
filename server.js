// Import required packages
const express = require("express");
const mongoose = require("mongoose");

// Create express app
const app = express();
app.use(express.json());

// Connect to MongoDB (local or cloud - use MongoDB Atlas URI if available)
mongoose.connect("mongodb://localhost:27017/merndb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Simple schema
const UserSchema = new mongoose.Schema({
    name: String
});
const User = mongoose.model("User", UserSchema);

// Route: Hello World
app.get("/", (req, res) => {
    res.send("Hello World from MERN Backend 👋");
});

// Route: Add a user
app.post("/add", async (req, res) => {
    const newUser = new User({ name: req.body.name });
    await newUser.save();
    res.send("✅ User Added");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
