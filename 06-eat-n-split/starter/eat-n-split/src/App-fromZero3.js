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

// 11h05 > Depart
// 11h27 > fin du front
// 11h44 > fin de AddFriend
// 11h50 > fin du toggle
// 12h   > blocage manque etape intermédiaire
// 12h17 > fin Select
//12h32   > fin du SPlit Bill sans formule
// 12h36  > fin des inter-toggle ======= 12h54
// 13h04  > fin de la fonction onSplit et essais

// listUser = ul
//user = li > img - h3 - p? <li
// form > label+input x2 + btn
// big form > h2

export default function App() {
  const [friends, setFriends] = useState(initialFriends);

  function addNewFriend(el) {
    setFriends((cur) => [...cur, el]);
    setToggle(false);
  }
  // ---------------------------------
  // ---------------------------------

  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle((tog) => !tog);
    setSelectFriend(null);
  }
  // ---------------------------------
  // ---------------------------------

  const [selectFriend, setSelectFriend] = useState(null);

  function selection(el) {
    setSelectFriend((cur) => (el === cur ? null : el));
    setToggle(false);
  }

  // ---------------------------------
  // ---------------------------------

  function splittingBill(value) {
    // setFriends((allFriends) =>
    //   allFriends.map((friend) =>
    //     friend === selectFriend
    //       ? { ...friend, balance: friend.balance + value }
    //       : friend
    //   )
    // );
    const modif = friends.map((friend) =>
      selectFriend === friend
        ? { ...friend, balance: friend.balance + value }
        : friend
    );
    setFriends(modif);
    setSelectFriend(null);
  }

  //--------------------------------
  return (
    <div className="app">
      <div className="sidebar">
        <ListFriends
          friends={friends}
          selectFriend={selectFriend}
          onSelection={selection}
        />

        {toggle && <AddFriend onAddFriend={addNewFriend} />}

        <Button onClick={handleToggle}>{toggle ? "x" : "Open"} </Button>
      </div>
      {selectFriend && (
        <SplitBill selectFriend={selectFriend} onSplit={splittingBill} />
      )}
    </div>
  );
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function ListFriends({ friends, selectFriend, onSelection }) {
  return (
    <ul>
      {friends.map((el) => (
        <Friend
          key={el.id}
          friend={el}
          selectFriend={selectFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

// --------------------------
function Friend({ friend, selectFriend, onSelection }) {
  const isMatching = friend === selectFriend;

  function handleClick(e) {
    e.preventDefault();
    onSelection(friend);
  }

  return (
    <li style={isMatching ? { backgroundColor: "#ffe8cc" } : null}>
      <img src={friend.image} alt="profil" />
      <h3>{friend.name}</h3>
      {/* Cas 1 */}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {/* Cas 2 */}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}
      {/* Cas 3 */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance}$
        </p>
      )}
      <Button onClick={handleClick}>{isMatching ? "x" : "Select"}</Button>
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

function AddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");

  const id = crypto.randomUUID();
  const newFriend = {
    id,
    name: name,
    image: image + id,
    balance: 0,
  };
  console.log(newFriend);

  function handleClick(e) {
    e.preventDefault();
    if (!name || !image) return;
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=");
  }

  return (
    <form className="form-add-friend" onSubmit={handleClick}>
      <label>👫Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🌄Image URL</label>
      <input
        disabled
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function SplitBill({ selectFriend, onSplit }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill - myExpense;
  const [whoPay, setWhoPay] = useState("friend");

  function handleClick(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    onSplit(whoPay === "me" ? friendExpense : -myExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleClick}>
      <h2>
        SPLIT A BILL WITH {selectFriend?.name ? selectFriend?.name : "A FRIEND"}
      </h2>

      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🧍 My Expense</label>
      <input
        type="number"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      ></input>

      <label>
        👫 {selectFriend?.name ? selectFriend?.name : "Friend"}'s expense
      </label>
      <input type="number" value={friendExpense} disabled></input>

      <label>🤮 Who is paying the bill ?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="me">Me</option>
        <option value="friend">{selectFriend?.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
