import React from 'react';
import { render } from 'react-dom';

import {connect} from 'react-redux';


const axios = require('axios');
const DELAY = 2500;

function mapStateToProps(state)
  {
    return { count: state.count, message: state.message };

  }


class Display extends React.Component {


  //   axios.get("http://numbersapi.com/8")

  //   .then((response) => {
  //     console.log(response);

  //     if (response.status == 200) {
  //       console.log(response.data.results);
  //     }
  //   });

  // console.log("Ended script...");
  // state = {
  //   message: null
  // }

  // sendToStore = (count) => {
  //   this.props.dispatch({type:"UPDATE", newCount: count})
  // }



  async componentDidMount() {
    let response = await axios.get(`http://numbersapi.com/${this.props.count}`);
    this.setState({ message: response.data });


  }

  async componentDidUpdate() {
    if (this.props.count % 3 === 0) {
      let response = await axios.get(`http://numbersapi.com/${this.props.count}`);
      this.setState({ message: response.data });

    }
  }
  



render() {
  return (
    <div>
      <div>Fact: {this.state.message}</div>
      
    </div>

  );
}

}
export default connect(mapStateToProps)(Display);
