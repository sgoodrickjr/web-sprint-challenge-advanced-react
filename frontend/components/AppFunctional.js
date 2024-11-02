import React, { useState } from 'react';

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at (center of the 3x3 grid)

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    const { x, y } = getXY(); // Get current coordinates based on index
    let newIndex = index;
  
    switch (direction) {
      case 'left':
        if (x > 1) newIndex = index - 1;
        else setMessage("You can't go left"); // Set specific message
        break;
      case 'right':
        if (x < 3) newIndex = index + 1;
        else setMessage("You can't go right"); // Set specific message
        break;
      case 'up':
        if (y > 1) newIndex = index - 3;
        else setMessage("You can't go up"); // Set specific message
        break;
      case 'down':
        if (y < 3) newIndex = index + 3;
        else setMessage("You can't go down"); // Set specific message
        break;
      default:
        break;
    }
  
    return newIndex;
  }
  


  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
  
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage(''); // Clear the message on a valid move
    }
  }
  
  function onChange(evt) {
    setEmail(evt.target.value);
  }

  async function onSubmit(evt) {
    evt.preventDefault();
    const { x, y } = getXY();
  
    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x, y, steps, email }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
        setEmail(''); // Clear the email input after successful submission
      } else {
        setMessage(data.message || 'Error');
      }
    } catch (error) {
      setMessage('Server error, please try again later.');
    }
  }
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`} role="gridcell">
  {idx === index ? 'B' : null}
</div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange} />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
