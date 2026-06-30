import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");

  const [foundItemName, setFoundItemName] = useState("");
  const [foundLocation, setFoundLocation] = useState("");

  const [foundItems, setFoundItems] = useState([
    { id: 1, item: "Water Bottle", location: "Canteen" },
    { id: 2, item: "Umbrella", location: "Block A" },
  ]);

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

  const addFoundItem = () => {
    if (!foundItemName || !foundLocation) {
      alert("Please fill all fields");
      return;
    }

    const newFoundItem = {
      id: foundItems.length + 1,
      item: foundItemName,
      location: foundLocation,
    };

    setFoundItems([...foundItems, newFoundItem]);

    setFoundItemName("");
    setFoundLocation("");
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

      <br />
      <br />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addItem}>Report Item</button>

      <h2>Lost Items</h2>

      {items.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.item}</h3>
          <p>Location: {item.location}</p>
        </div>
      ))}

    <h2>Report Found Item</h2>

<input
  type="text"
  placeholder="Found Item Name"
  value={foundItemName}
  onChange={(e) => setFoundItemName(e.target.value)}
/>

<br />
<br />

<input
  type="text"
  placeholder="Found Location"
  value={foundLocation}
  onChange={(e) => setFoundLocation(e.target.value)}
/>

<br />
<br />

<button onClick={addFoundItem}>Add Found Item</button>

      <h2>Found Items</h2>

      {foundItems.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.item}</h3>
          <p>Location: {item.location}</p>
        </div>
      ))}
    </div>
  );
}

export default App;