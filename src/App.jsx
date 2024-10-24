import { useState, useEffect } from "react";
import "./tailwind.css";

function Button({ digit, onClick }) {
  const [className, setClassName] = useState(
    "p-2 text-black text-center text-base font-bold font-serif bg-gray-200 border-2 border-gray-400 rounded-lg outline-0 outline-offset-0 cursor-pointer hover:border-gray-600"
  );
  useEffect(
    () => {
      switch (digit) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
          setClassName(
            "p-2 text-sky-700 text-center text-base font-bold font-serif bg-sky-200 border-2 border-sky-400 rounded-lg outline-0 outline-offset-0 cursor-pointer hover:border-sky-600"
          );
          break;
        case "C":
          setClassName(
            "p-2 text-rose-700 text-center text-base font-bold font-serif bg-rose-200 border-2 border-rose-400 rounded-lg outline-0 outline-offset-0 cursor-pointer hover:border-rose-600"
          );
          break;
        default:
          setClassName(
            "p-2 text-black text-center text-base font-bold font-serif bg-gray-200 border-2 border-gray-400 rounded-lg outline-0 outline-offset-0 cursor-pointer hover:border-gray-600"
          );
          break;
      }
    }, []
  );
  return (
    <button className={className} value={digit} onClick={onClick}>
      {digit}
    </button>
  );
}

function Buttons({ onClick }) {
  return (
    <div className="grid grid-cols-4 gap-2">
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

function Result({ text, onChange, onKeyDown }) {
  return (
    <input
      className="p-2 text-sky-700 placeholder:text-sky-400 text-center text-[2rem] font-bold font-serif bg-sky-200 border-2 border-sky-400 rounded-lg outline-0 outline-offset-0 cursor-pointer"
      type="text"
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Type Here"
    />
  );
}

export default function App() {
  // useEffect( () => alert("Enter two numbers"), [] );
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter")
      handleArithmetic();
  }
  return (
    <div className="box-border flex flex-col justify-evenly items-stretch gap-8 px-4 py-12 mx-auto my-8 border-2 border-emerald-400 rounded-3xl bg-emerald-200 max-w-[90%] md:max-w-[40%]">
      <Result
        text={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Buttons onClick={handleClick} />
    </div>
  );
}
