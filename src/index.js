import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';

import { Provider } from 'react-redux';

import Display from './display';
// import Button from './button';

const axios = require('axios');
const DELAY = 1000;


const initialState = { count: 0 }


class App extends React.Component {
  constructor(props) {
    super(props)
    {
      this.state = { count: 0 };

    }
    this.timerId = setInterval(this.setCount, 1000)
  }
  // state = {
  //   count: 0,
  //   pause: true
  // }
  sendToStore = (count) => {
    this.props.dispatch({ type: "UPDATE", newCount: count })
  }
  reducer(state = initialState, action) {
    let newState = {}

    switch (action.type) {
      case "UPDATE":
        newState = { ...state, count: action.newCount };
        break
      default: newState = { ...state };
    }

  }

  store = createStore(this.reducer);


  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({ count: this.state.count + 1 });
  //   }, DELAY);
  // }



  componentDidMount() {
    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, DELAY);
  }

  reset = () => {

    this.setState({ count: 0 });
  }


  pause = () => {
    clearInterval(this.timerId)


  }

  unpause = () => {
    this.timerId = setInterval(this.setCount, 1000)
  }


  render() {
    return (
      <Provider store={this.store}>
        <div>
          <p> Current Count: {this.state.count}</p>
          <span><Display
            count={this.state.count} /></span>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.pause}> Pause </button>

        </div>
      </Provider>
    )
  }




}
// {
//   state = {
//     number: 0
//   }
//   axios.get(`http://numbersapi.com/${this.state.number}`)
//   .then( (response ) =>
//   {
//     console.log( response );

//     if( response.status == 200 )
//     {
//       console.log( response.data.results );
//     }
//   } );

//   console.log( "Ended script..." );

// }

render(<App />, document.getElementById("root"))