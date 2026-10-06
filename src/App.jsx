import { useState } from 'react';
import './App.css';

function CalcDisplay({ dispValue }) {
  return (
    <div className="Display">
      <span>{dispValue}</span>
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, className = '' }) {
  return (
    <button className={`button ${className}`} onClick={() => onClick(buttonLabel)}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [dispValue, setDispValue] = useState('0');

  const buttonClickHandler = (label) => {
    if (label === 'C') {
      setDispValue('0');
      return;
    }

    if (dispValue === '0') {
      setDispValue(label);
    } else {
      setDispValue((prev) => prev + label);
    }
  };

  const isOperator = (label) => ['÷', '×', '-', '+', '='].includes(label);

  const buttons = [
    'C', '(', ')', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="App">
      <div className="Header">
        Calculator of Crane Mary Musngi — WMD - 3A
      </div>
      <div className="calculator">
        <CalcDisplay dispValue={dispValue} />
        <div className="Keypad">
          {buttons.map((label) => (
            <CalcButton
              key={label}
              buttonLabel={label}
              onClick={buttonClickHandler}
              className={`
                ${isOperator(label) ? 'operator' : ''} 
                ${label === 'C' ? 'clear-btn' : ''} 
                ${label === '=' ? 'equals-btn' : ''} 
                ${label === '0' ? 'zero-btn' : ''}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;