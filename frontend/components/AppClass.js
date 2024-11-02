import React from 'react';

// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at (center of the 3x3 grid)

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getXY = () => {
    const x = (this.state.index % 3) + 1;
    const y = Math.floor(this.state.index / 3) + 1;
    return { x, y };
  }

  getXYMessage = () => {
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  }

  reset = () => {
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    const { index } = this.state;
    const { x, y } = this.getXY();
    let newIndex = index;
  
    switch (direction) {
      case 'left':
        if (x > 1) newIndex = index - 1;
        else this.setState({ message: "You can't go left" }); // Set specific message
        break;
      case 'right':
        if (x < 3) newIndex = index + 1;
        else this.setState({ message: "You can't go right" }); // Set specific message
        break;
      case 'up':
        if (y > 1) newIndex = index - 3;
        else this.setState({ message: "You can't go up" }); // Set specific message
        break;
      case 'down':
        if (y < 3) newIndex = index + 3;
        else this.setState({ message: "You can't go down" }); // Set specific message
        break;
      default:
        break;
    }
  
    return newIndex;
  }
  

  move = (evt) => {
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);
  
    if (nextIndex !== this.state.index) {
      this.setState((prevState) => ({
        index: nextIndex,
        steps: prevState.steps + 1,
        message: '', // Clear the message on a valid move
      }));
    }
  }
  

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    const { x, y } = this.getXY();
  
    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          x,
          y,
          steps: this.state.steps,
          email: this.state.email,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        this.setState({ message: data.message, email: '' }); // Clear email after submission
      } else {
        this.setState({ message: data.message || 'Error' });
      }
    } catch (error) {
      this.setState({ message: 'Server error, please try again later.' });
    }
  }
  

  render() {
    const { className } = this.props;
    const { index, steps, message, email } = this.state;

    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
                {idx === index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={email} onChange={this.onChange} />
          <input id="submit" type="submit" />
        </form>
      </div>
    );
  }
}
