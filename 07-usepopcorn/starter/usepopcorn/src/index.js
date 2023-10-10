// import { useState } from "react";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";

// -------------------------------------------------

// function Test() {
//   const [movieRating, setMovieRating] = useState(4);

//   return (
//     <div>
//       <StarRating color="blue" maxRating={6} onSetRating={setMovieRating} />
//       <p>This movie was rated {movieRating} stars.</p>
//     </div>
//   );
// }

// -------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // <StarRating />
  // <StarRating
  //   maxRating={5}
  //   defaultRating={4}
  //   messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
  // />
  // <StarRating maxRating={20} size={24} color="red" className="test" />
  // <Test />
  // </React.StrictMode>
);
