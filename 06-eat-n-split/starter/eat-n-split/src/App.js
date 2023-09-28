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

// listUser = ul
//user = li > img - h3 - p? <li

// form > label+input x2 + btn
// big form > h2

export default function App() {
  // Listing Friend
  const [friends, setFriends] = useState(initialFriends);

  // Add Friend
  function addNewFriend(newFriend) {
    setFriends((cur) => [...cur, newFriend]);
    setToggle(false);
  }

  // Selected Friend
  const [selectedFriend, setSelectedFriend] = useState(null);
  function choiceFriend(el) {
    setSelectedFriend((cur) => (el === cur ? null : el));
    setToggle(false);
  }

  // Toggle Button
  const [toggle, setToggle] = useState(false);
  function toggleButton() {
    setToggle((t) => !t);
    setSelectedFriend(null);
  }

  // Split Bill
  function splitBill(value) {
    setFriends((lesAmis) =>
      lesAmis.map((ami) =>
        ami === selectedFriend ? { ...ami, balance: ami.balance + value } : ami
      )
    );
  }

  //--------------------------------

  return (
    <div className="app">
      <div className="sidebar">
        <ListUsers
          friends={friends}
          selectedFriend={selectedFriend}
          onSelected={choiceFriend}
        />

        {toggle && <BlocAddFriend onAddFriend={addNewFriend} />}

        <Button onClick={toggleButton}>{toggle ? "X" : "Open"}</Button>
      </div>

      {selectedFriend && (
        <BlocBill selectedFriend={selectedFriend} splitBill={splitBill} />
      )}
    </div>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function ListUsers({ friends, selectedFriend, onSelected }) {
  return (
    <ul>
      {friends.map((element) => (
        <User
          friend={element}
          key={element.id}
          selectedFriend={selectedFriend}
          onSelected={onSelected}
        />
      ))}
    </ul>
  );
}

// --------------------------

function User({ friend, selectedFriend, onSelected }) {
  const match = selectedFriend === friend;
  function handleChoice() {
    onSelected(friend);
  }

  //
  return (
    <li style={match ? { backgroundColor: "#ffe8cc" } : null}>
      <img src={friend.image} alt="profil" />

      <h3>{friend.name}</h3>

      {/* Cas 1 */}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {/* Cas 2 */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance}$
        </p>
      )}
      {/* Cas 3 */}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {friend.balance}$
        </p>
      )}

      <Button onClick={handleChoice}>{match ? "x" : "Select"}</Button>
    </li>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function BlocAddFriend({ onAddFriend }) {
  const [nameFriend, setNameFriend] = useState("");
  const [imageFriend, setImageFriend] = useState("https://i.pravatar.cc/48?u=");

  const id = crypto.randomUUID();
  const addFriendObject = {
    id: id,
    name: nameFriend,
    image: `https://i.pravatar.cc/48?u=${id}`,
    balance: 0,
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!nameFriend || !imageFriend) return;

    onAddFriend(addFriendObject);
    setNameFriend("");
    setImageFriend("https://i.pravatar.cc/48?u=");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> 👫Friend Name</label>
      <input
        value={nameFriend}
        onChange={(e) => setNameFriend(e.target.value)}
      ></input>

      <label> 🌄 Image URL</label>
      <input
        disabled
        value={imageFriend}
        onChange={(e) => setImageFriend(e.target.value)}
      ></input>

      <Button>Add a new friend</Button>
    </form>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function BlocBill({ selectedFriend, splitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill - myExpense;
  const [whoPay, setWhoPay] = useState("friend");

  function handleClick(e) {
    e.preventDefault();
    splitBill(whoPay === "user" ? friendExpense : -myExpense);
  }

  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {selectedFriend?.name}</h2>

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
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      ></input>

      <label>👫 {selectedFriend?.name}' expense</label>
      <input disabled value={friendExpense}></input>

      <label>🤑 Who is paying the bill ?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="friend">{selectedFriend?.name}</option>
        <option value="user">Me</option>
      </select>
      <Button onClick={handleClick}>Split Bill</Button>
    </form>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
