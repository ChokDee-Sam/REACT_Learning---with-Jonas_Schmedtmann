// ------------------------------------------------------
// ------------------------------------------------------
// CodeSandBox : JS file
// CODESANDBOX LINK - Starter - https://codesandbox.io/s/react-challenge-dev-profile-starter-ng0ghj
// CODESANDBOX LINK - Final v1 - https://codesandbox.io/s/react-challenge-dev-profile-final-v1-8szvtk
// ------------------------------------------------------
// ------------------------------------------------------

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// ------------------------------------------------------
// ------------------------------------------------------

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro name="Sam Loy" />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

function Avatar(props) {
  return (
    <img
      className="avatar"
      src="https://avatars.githubusercontent.com/u/113790899?v=4"
      alt={props.name}
    />
  );
}

function Intro(props) {
  return (
    <div>
      <h1> {props.name} </h1>
      <p> 'What Else ?' </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill language="HTML+CSS" emoji=":)" color="orangered" />
      <Skill language="JavaScript" emoji=":)" color="yellow" />
      <Skill language="React" emoji=":)" color="cyan" />
      <Skill language="Web Design" emoji=":)" color="pink" />
      <Skill language="Branding" emoji=":)" color="khaki" />
      <Skill language="Creative Coder" emoji=":)" color="gold" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.language}</span>
      <span>{props.emoji}</span>
    </div>
  );
}

// ------------------------------------------------------
// ------------------------------------------------------

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
