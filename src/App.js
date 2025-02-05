// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
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
      setIsLoading(false);
    },
    [input, from, to]
  );

  console.log(input, from, to);
  return (
    <div>
      <input
        value={input}
        onChange={handleInput}
        type="number"
        disabled={isLoading}
      />
      <select value={from} onChange={handleFromChange} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleToChange} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {to}
      </p>
    </div>
  );
}
