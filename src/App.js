// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("100");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [output, setOutput] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleFromChange(e) {
    setFrom(e.target.value);
    console.log(e.target.value);
  }

  function handleToChange(e) {
    setTo(e.target.value);
    console.log(e.target.value);
  }

  useEffect(
    function () {
      async function fetchCurrencies() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
        );

        const data = await res.json();
        console.log(data);

        if (from === to) {
          setOutput(input);
          return;
        }

        setOutput(data.rates[to]);
      }

      fetchCurrencies();
    },
    [input, from, to]
  );

  console.log(input, from, to);
  return (
    <div>
      <input value={input} onChange={handleInput} type="number" />
      <select value={from} onChange={handleFromChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleToChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
