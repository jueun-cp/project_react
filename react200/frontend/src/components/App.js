import React, { Component } from 'react';
import { Route } from "react-router-dom";

// css
import '../css/new.css';

// header
import HeaderAdmin from './Header/Header admin';

// footer
import Footer from './Footer/Footer';

// login
import LoginForm from './LoginForm';

import reactProxy from './reactProxy';
import ApiGetJson from './ApiGetJson';
import ApiPostJson from './ApiPostJson';

class App extends Component {
  render () {
    return (
      <div className="App">
        <HeaderAdmin/> 
        <Route exact path='/' component={LoginForm} />
        <Route exact path='/reactProxy' component={reactProxy} />
        <Route exact path='/ApiGetJson' component={ApiGetJson} />
        <Route exact path='/ApiPostJson' component={ApiPostJson} />

        <Footer/>
      </div>
    );
  }
}

export default App;