import React, { Component } from 'react';
import axios from 'axios';

class ApiPostJson extends Component {
  componentDidMount = async () => {
      axios.post('/users',{
      }).then(response => {
          console.log('reponse.data.message: '+ response.data.message);     
      })
    }
//     const response = await fetch('/users');
//     const body = await response.json();
//     console.log("body.message : "+body.message)
//   }
  
  render() {
    return (
      <><h1>Call Node Api Post</h1></>
    )
  }
}

export default ApiPostJson;