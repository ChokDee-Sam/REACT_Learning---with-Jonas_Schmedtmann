// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("EUR");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      setIsLoading(true);
      const controller = new AbortController();

      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        // console.log(data);
        // console.log(rates);

        setResult(data.rates[currencyTo]);
        setIsLoading(false);

        // if (amount > 0) {
        //   setResult(
        //     currencyFrom === currencyTo ? null : data.rates[currencyTo]
        // );
        // }
      }
      if (currencyFrom === currencyTo) return setResult(amount);
      convert();

      return function () {
        controller.abort();
      };
    },
    [amount, currencyFrom, currencyTo]
  );

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={currencyFrom}
        onChange={(e) => setCurrencyFrom(e.target.value)}
      >
        <option value="CAD">CAD</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
      </select>

      <select
        value={currencyTo}
        onChange={(e) => setCurrencyTo(e.target.value)}
      >
        <option value="USD" selected>
          USD
        </option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {/* Quand il y a le montant, mais que les 2 devises sont les mêmes */}
        {currencyFrom === currencyTo && amount.length > 0 && (
          <span> Veuillez choisir 2 devises différentes </span>
        )}

        {/* Quand il manque le montant, et que les devises sont les mêmes */}
        {currencyFrom === currencyTo &&
          result === "" &&
          amount.length === 0 && (
            <span>
              Veuillez entrer un montant, et choisir 2 devises différentes.
            </span>
          )}

        {/* Quand il manque le montant, et qu'il y a 2 devises différentes*/}
        {currencyFrom !== currencyTo && amount === "" && (
          <span>
            <span> Veuillez entrer un montant. </span>
          </span>
        )}

        {/* Quand tout est OK */}
        {currencyFrom !== currencyTo && amount !== "" && (
          <span>
            {amount} {currencyFrom} ={" "}
            {isLoading ? "..." : `${result}  ${currencyTo}`}
          </span>
        )}
      </p>
    </div>
  );
}
