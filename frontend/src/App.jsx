import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/lost-items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="container">
      <h1>CampusFind</h1>
      <h2>Lost Items</h2>

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