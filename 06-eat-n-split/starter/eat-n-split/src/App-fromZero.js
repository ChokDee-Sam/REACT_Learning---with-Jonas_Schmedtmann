import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export default function App() {
  // const friends = initialFriends;
  // console.log(friends);

  // Toggle Bloc : Ajout ami
  const [openAddFriend, setOpenAddFriend] = useState(false);
  function toggleButton() {
    setOpenAddFriend((add) => !add);
    setFriendSelect(null);
  }

  // Ajout d'un nouvel ami
  const [friends, setfriends] = useState(initialFriends);
  function addNewFriend(newFriend) {
    setfriends((friends) => [...friends, newFriend]);
  }

  // Selection d'un ami
  const [friendSelect, setFriendSelect] = useState(null);
  function selectedFriend(el) {
    setFriendSelect((cur) => (cur === el ? null : el));
    setOpenAddFriend(false);
  }

  // Partage de facture en mettant à jour la balance dans la Liste d'ami
  function handleSPlitBill(value) {
    // console.log(el);
    setfriends((listeAmis) =>
      listeAmis.map((ami) =>
        ami.id === friendSelect.id ? { ...ami, balance: ami.balance + value } : ami
      )
    );
    setFriendSelect(null);
  }

  //--------------------------------
  return (
    <div className="app">
      <div className="sidebar">
        <ListUsers
          friends={friends}
          friendSelect={friendSelect}
          onSelect={selectedFriend}
        />

        {openAddFriend ? <FormAddFriend onAddFriend={addNewFriend} /> : null}

        <Button onClick={toggleButton}>
          {openAddFriend ? "Close X" : "Add a New Friend 🚀"}
        </Button>
      </div>
      {friendSelect && (
        <SplitBill friendSelect={friendSelect} onSplitBill={handleSPlitBill} />
      )}
    </div>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function ListUsers({ friends, friendSelect, onSelect }) {
  return (
    <ul>
      {friends.map((element) => (
        <User
          friend={element}
          key={element.id}
          friendSelect={friendSelect}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

// --------------------------

function User({ friend, friendSelect, onSelect }) {
  const isMatched = friend === friendSelect;

  return (
    <li style={isMatched ? { backgroundColor: "#ffe8cc" } : null}>
      <img src={friend.image} alt="Profil" />
      <h3>{friend.name}</h3>
      {/* Condition 1 */}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {/* Condition 2 */}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}
      {/* Condition 3 */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance}
        </p>
      )}
      <Button isMatched={isMatched} onClick={() => onSelect(friend)}>
        {isMatched ? "X" : "Open"}
      </Button>
    </li>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function FormAddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48?u=");

  const id = crypto.randomUUID();
  const newFriendInformation = {
    id: id,
    name: friendName,
    image: `https://i.pravatar.cc/48?u=${id}`,
    balance: 0,
  };

  function addFriendButton(e) {
    if (!friendName || !friendImage) return;
    e.preventDefault();
    onAddFriend(newFriendInformation);
    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48?u=");
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => addFriendButton(e)}>
      <label>👫 FriendName</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(() => e.target.value)}
      ></input>

      <label> 🌄 Image URL</label>
      <input
        type="text"
        value={friendImage}
        onChange={(e) => setFriendImage(() => e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function SplitBill({ friendSelect, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill ? bill - myExpense : "";
  const [whoPay, setWhoPay] = useState("friend");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    onSplitBill(whoPay === "me" ? friendExpense : -myExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>SPLIT A BILL WITH {friendSelect.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🧍 Your expense</label>
      <input
        type="number"
        value={myExpense}
        onChange={(e) => setMyExpense(Number(e.target.value))}
      ></input>

      <label>👫 {friendSelect.name}'s expense</label>
      <input type="number" disabled value={friendExpense}></input>

      <label>🤑 Who is paying the bill ?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="friend">{friendSelect.name}</option>
        <option value="me">Me</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
