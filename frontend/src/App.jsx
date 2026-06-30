import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/lost-items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = () => {
  if (!itemName || !location) {
    alert("Please fill all fields");
    return;
  }

  const newItem = {
    id: items.length + 1,
    item: itemName,
    location: location,
  };

  setItems([...items, newItem]);

  setItemName("");
  setLocation("");
};

  return (
    <div className="container">
      <h1>CampusFind</h1>
      <h2>Report Lost Item</h2>

<input
  type="text"
  placeholder="Item Name"
  value={itemName}
  onChange={(e) => setItemName(e.target.value)}
/>

<br /><br />

<input
  type="text"
  placeholder="Location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

<br /><br />

<button onClick={addItem}>Report Item</button>      <h2>Lost Items</h2>

      {items.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.item}</h3>
          <p>Location: {item.location}</p>
        </div>
      ))}
    </div>
  );
}

export default App;