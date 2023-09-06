import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// ------------------------------------------------------
// ------------------------------------------------------

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

function Menu() {
  const pizzas = pizzaData;

  // const pizzas = []; // pour l'exemple uniquement
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu </h2>
      {numPizzas > 0 ? (
        <>
          <p>
            Authenthic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {/* Généralement, on passe l'objet entier dans un composant plus spécifique (Parent Pizza .map ??), et dans l'enfant, on sort les informations désirées de l'objet (composant Pizza enfant) */}

            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}

            {/* <Pizza
  name="Pizza Spinachi"
  ingredients="Tomato, mozarella, spinach, and ricotta cheese"
  price={10}
  photoName="pizzas/spinaci.jpg"
  />
  <Pizza
  name="Pizza Funghi"
  ingredients="Tomato, mushrooms"
  price={12}
  photoName="pizzas/funghi.jpg"
/> */}
          </ul>
        </>
      ) : (
        <p> We are still working on menu. Please come back later :) </p>
      )}
    </main>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

function Pizza({ pizzaObj }) {
  // console.log(props);

  // if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

function Footer(props) {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (isOpen) alert("We are currently open !");
  // else alert("Sorry, we are closed");

  // Sans Babel, on écrirait comme ça
  // return React.createElement("footer", null, "We're currently open");

  // Réelle façon d'écrire (avec Babel)
  return (
    <footer className="footer">
      {/* {new Date().toLocaleDateString()}. We're currently open */}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We are open from {openHour}:00 until {closeHour}:00. Come visit us, or
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ------------------------------------------------------
// ------------------------------------------------------

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"))
// Penser à checker le fichier package.json pour vérifier la version de React
// Et peut être aussi checker le fait de retirer le /client de l'import
// import ReactDOM from "react-dom";
