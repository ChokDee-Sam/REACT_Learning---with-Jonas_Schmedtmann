//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Les Imports
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
import { useState } from "react";

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Les Variables
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// L'App
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export default function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
      <StepMessage step={4}>
        <h3>LET'S BUILD IT !!</h3>
      </StepMessage>
      <StepMessage step={5}>
        <h3>LET'S GO !!</h3>
      </StepMessage>
    </div>
  );
}
function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// La fonction STEPS qu'on a appelé dans l'App, qui contient l'ensemble
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function Steps() {
  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Le State Composant
  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  // Les Composants
  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setStep((s) => s + 1);
    }

    // BAD PRACTICE
    // test.name = "Fred";
    // setTest({ name: "Fred" });
  }

  function Button({ textColor, bgColor, onClick, children }) {
    return (
      <button
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈🏻</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉🏻</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
