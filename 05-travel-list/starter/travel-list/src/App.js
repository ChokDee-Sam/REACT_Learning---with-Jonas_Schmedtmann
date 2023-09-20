import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// APP PRINCIPALE
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ENTÊTE
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function Logo() {
  return <h1>🏝️ Far Way 🧳</h1>;
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// FORM
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    console.log(newItem);

    setDescription("");
    setQuantity(Number(1));
    // console.log(quantity, description);

    // initialItems.push(newItem);
    // console.log(initialItems);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="item..."
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// LISTE ET COMPO ITEM
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((element) => (
          <Item item={element} key={element.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        <input type="checkBox"></input>
        {` ` + item.quantity}
        {` ` + item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// FOOTER
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
