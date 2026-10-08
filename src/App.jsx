import { useState } from 'react';
import './App.css';

const FULL_NAME = 'Crane Mary Musngi';
const SURNAME = 'MUSNGI';

function calculate(left, right, operator) {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '÷':
      return right === 0 ? null : left / right;
    default:
      return right;
  }
}

function formatResult(value) {
  if (value === null || !Number.isFinite(value)) {
    return 'Error';
  }

  return String(Number(value.toPrecision(12)));
}

function CalcDisplay({ dispValue }) {
  return (
    <div className="Display" role="status" aria-live="polite" aria-label="Calculator display">
      <span>{dispValue}</span>
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, className = '', ariaLabel }) {
  return (
    <button
      type="button"
      className={`button ${className}`}
      onClick={() => onClick(buttonLabel)}
      aria-label={ariaLabel}
    >
      {buttonLabel}
    </button>
  );
}

function App() {
  const [dispValue, setDispValue] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [pendingOperator, setPendingOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const buttonClickHandler = (label) => {
    if (label === 'C') {
      setDispValue('0');
      setStoredValue(null);
      setPendingOperator(null);
      setWaitingForOperand(false);
      return;
    }

    if (/^\d$/.test(label)) {
      setDispValue((current) => {
        if (waitingForOperand || current === 'Error' || !Number.isFinite(Number(current))) {
          return label;
        }

        return current === '0' ? label : current + label;
      });
      setWaitingForOperand(false);
      return;
    }

    if (['÷', '*', '-', '+'].includes(label)) {
      const currentValue = Number(dispValue);
      const value = pendingOperator && !waitingForOperand
        ? calculate(storedValue, currentValue, pendingOperator)
        : (Number.isFinite(currentValue) ? currentValue : 0);

      setDispValue(formatResult(value));
      setStoredValue(value === null || !Number.isFinite(value) ? null : value);
      setPendingOperator(value === null || !Number.isFinite(value) ? null : label);
      setWaitingForOperand(true);
      return;
    }

    if (label === '=' && pendingOperator && !waitingForOperand) {
      const result = calculate(storedValue, Number(dispValue), pendingOperator);
      setDispValue(formatResult(result));
      setStoredValue(null);
      setPendingOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="App">
      <header className="Header">
        <p className="eyebrow">A little math, made personal</p>
        <h1>Calculator of {FULL_NAME} - WMD - 3A</h1>
      </header>
      <main className="calculator" aria-label="Calculator">
        <CalcDisplay dispValue={dispValue} />
        <div className="Keypad">
          {['C', '÷', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '='].map((label) => (
            <CalcButton
              key={label}
              buttonLabel={label}
              onClick={buttonClickHandler}
              className={[
                ['÷', '*', '-', '+'].includes(label) ? 'operator' : '',
                label === 'C' ? 'clear-btn' : '',
                label === '=' ? 'equals-btn' : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>
        <div className="Signature">
          <span className="signature-label">Made by</span>
          <CalcButton
            buttonLabel={SURNAME}
            onClick={() => {
              setDispValue(FULL_NAME);
              setStoredValue(null);
              setPendingOperator(null);
              setWaitingForOperand(true);
            }}
            className="surname-btn"
            ariaLabel={`Show ${FULL_NAME}`}
          />
        </div>
      </main>
      <footer className="Footer">Simple numbers. A little bit of sage.</footer>
    </div>
  );
}

export default App;