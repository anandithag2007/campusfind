import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [foundSearch, setFoundSearch] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const [foundItemName, setFoundItemName] = useState("");
  const [foundLocation, setFoundLocation] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/lost-items")
      .then((response) => response.json())
      .then((data) => setItems(data));

    fetch("http://localhost:5000/found-items")
      .then((response) => response.json())
      .then((data) => setFoundItems(data));
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

    fetch("http://localhost:5000/found-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: foundItemName,
        location: foundLocation,
      }),
    })
      .then((response) => response.json())
      .then((newItem) => {
        setFoundItems([...foundItems, newItem]);
        setFoundItemName("");
        setFoundLocation("");
      });
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

      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

<br />
<br />

      <h2>Lost Items</h2>

      {items
  .filter((item) =>
    item.item.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => (
    <div className="card lost-card" key={item.id}>
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

      <input
  type="text"
  placeholder="Search found items..."
  value={foundSearch}
  onChange={(e) => setFoundSearch(e.target.value)}
/>

<br />
<br />
      
      <h2>Found Items</h2>

      {foundItems  .filter((item) =>
    item.item.toLowerCase().includes(foundSearch.toLowerCase())
  )
  .map((item) => (
    <div className="card found-card" key={item.id}>
      <h3>{item.item}</h3>
      <p>Location: {item.location}</p>
    </div>
  ))}
    </div>
  );
}

export default App;