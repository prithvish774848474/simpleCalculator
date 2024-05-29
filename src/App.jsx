import { useState, useEffect } from "react";
import "./App.css";

function Button({ digit, onClick }) {
  let className = "stylingButton";
  switch (digit) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      className = "stylingButton arithmetic";
      break;
    case 'C':
      className = "stylingButton clear";
      break;
    default:
      className = "stylingButton";
      break;
  }
  return (
    <button className={className} value={digit} onClick={onClick}>
      {digit}
    </button>
  );
}

function Buttons({ onClick }) {
  return (
    <div className="buttonContainer">
      <Button digit={'7'} onClick={onClick}></Button>
      <Button digit={'8'} onClick={onClick}></Button>
      <Button digit={'9'} onClick={onClick}></Button>
      <Button digit={'+'} onClick={onClick}></Button>
      <Button digit={'4'} onClick={onClick}></Button>
      <Button digit={'5'} onClick={onClick}></Button>
      <Button digit={'6'} onClick={onClick}></Button>
      <Button digit={'-'} onClick={onClick}></Button>
      <Button digit={'1'} onClick={onClick}></Button>
      <Button digit={'2'} onClick={onClick}></Button>
      <Button digit={'3'} onClick={onClick}></Button>
      <Button digit={'*'} onClick={onClick}></Button>
      <Button digit={'C'} onClick={onClick}></Button>
      <Button digit={'0'} onClick={onClick}></Button>
      <Button digit={'='} onClick={onClick}></Button>
      <Button digit={'/'} onClick={onClick}></Button>
    </div>
  );
}

function Result({ text }) {
  return <input className="stylingResult" type="text" disabled={true} value={text} />;
}

export default function App() {
  useEffect( () => alert("Enter two numbers"), [] );
  const [text, setText] = useState('');
  const handleArithmetic = () => {
    const array = text.split(' ');
    let firstNumber = Number(array[0]), secondNumber = Number(array[2]);
    switch (array[1]) {
      case '+':
        setText((firstNumber + secondNumber).toString());
        break;
      case '-':
        setText((firstNumber - secondNumber).toString());
        break;
      case '*':
        setText((firstNumber * secondNumber).toString());
        break;
      case '/':
        if ((firstNumber / secondNumber) !== Math.floor(firstNumber / secondNumber))
          setText((firstNumber / secondNumber).toFixed(5).toString());
        else
          setText((firstNumber / secondNumber).toString());
        break;
      default:
        setText("Error"); break;
    }
  }
  const handleClick = (e) => {
    switch (e.target.value) {
      case 'C':
        setText(''); break;
      case '=':
        handleArithmetic();
        break;
      default:
        setText(text => {
          switch (e.target.value) {
            case '+':
            case '-':
            case '*':
            case '/':
              return text + ' ' + e.target.value + ' ';
            default:
              return text + e.target.value;
          }
        });
        break;
    }
  };
  return (
    <div className="calculatorShell">
      <Result text={text} />
      <Buttons onClick={handleClick} />
    </div>
  );
}