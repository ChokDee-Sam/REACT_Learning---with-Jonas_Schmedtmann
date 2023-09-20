import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// APP PRINCIPALE
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    // ATTENTIION : le .push() crée une Mutation, donc interdit en React Immuable
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((element) => element.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
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

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };

    // handleAddItems(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(Number(1));
    // console.log(quantity, description);
    // console.log(items);
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((element) => (
          <Item
            item={element}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={element.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkBox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {` ` + item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
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
