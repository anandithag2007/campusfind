const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const lostItems = [
  {
    id: 1,
    item: "Water Bottle",
    location: "Library",
  },
  {
    id: 2,
    item: "Calculator",
    location: "CSE Block",
  },
  {
    id: 3,
    item: "ID Card",
    location: "Cafeteria",
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "CampusFind Backend Running Successfully",
  });
});

app.get("/lost-items", (req, res) => {
  res.json(lostItems);
});

app.post("/lost-items", (req, res) => {
  const newItem = {
    id: lostItems.length + 1,
    item: req.body.item,
    location: req.body.location,
  };

  lostItems.push(newItem);

  res.status(201).json(newItem);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});