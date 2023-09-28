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

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show); // toggle du bloc d'ajout
  }

  function handleAddFriend(element) {
    setFriends((cur) => [...cur, element]); // Update de la liste
    setShowAddFriend(false); // referme le bloc d'ajout
  }

  function handleSelection(element) {
    setSelectedFriend((cur) => (cur?.id === element.id ? null : element));
    setShowAddFriend(false); // referme le bloc d'ajout
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((lesAmis) =>
      lesAmis.map((unAmi) =>
        unAmi.id === selectedFriend.id
          ? { ...unAmi, balance: unAmi.balance + value }
          : unAmi
      )
    );
    setSelectedFriend(null);
  }
  //--------------------------------
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <>
      <ul>
        {friends.map((element) => (
          <Friend
            key={element.id}
            friend={element}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
            // num={index}
          />
        ))}
      </ul>
    </>
  );
}
// --------------------------
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend?.id;

  return (
    <li className={isSelected ? "selected" : null}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {/* Condition 1 */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {/* Condition 2 */}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe {Math.abs(friend.balance)}$
        </p>
      )}

      {/* Condition 3 */}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

      {/* <Button isSelected={isSelected} onClick={() => onSelection(friend)}> */}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "CLOSE X " : "Selected"}
      </Button>
    </li>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// function Button({ children, onClick, isSelected }) {
function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="button"
      // style={isSelected ? { backgroundColor: "white" } : null}
    >
      {children}
    </button>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    // Annule le refresh global
    e.preventDefault();
    // En cas de champ vide
    if (!name || !image) return;

    // Les infos de l'input
    const id = crypto.randomUUID();
    const newFriend = {
      // id: Math.floor(Math.random() * 101),
      id: id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    // L'ajout des inputs
    onAddFriend(newFriend);
    // Une reset des inputs
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> 👫 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(() => e.target.value)}
      />

      <label> 🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(() => e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWoIsPaying] = useState("friend");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    console.log(selectedFriend);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>

      <label> 💰 Bill Value</label>
      <input
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        type="number"
      />

      <label> 🧍 Your paidByUser</label>
      <input
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
        type="number"
      />

      <label> 👫 {selectedFriend.name}'s paidByUser</label>
      <input disabled value={paidByFriend} type="number" />

      <label> 🤑 Who is paying the bill ?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
