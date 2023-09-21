import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// APP PRINCIPALE
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export default function App() {
  const [items, setItems] = useState([]);

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

  function handleClearList() {
    if (items.length >= 1) {
      let confirmed = window.confirm(
        "Are you sure you want to delete all items ?"
      );
      if (confirmed) setItems([]);
    } else {
      window.confirm("Empty list !! ");
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  if (sortBy === "quantity")
    sortedItems = items.slice().sort((a, b) => a.quantity - b.quantity);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((element) => (
          <Item
            item={element}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={element.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="quantity">Sort by quantity</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
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

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((el) => el.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You got everything ! Ready to go ✈`
          : `👜 You have ${numItems} ${
              items.length > 1 ? "items" : "item"
            } on your
        list, and you already packed ${numPacked} (${percentage}%) `}
      </em>
    </footer>
  );
}
