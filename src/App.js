import React from 'react';
import {Route} from 'react-router-dom';
import Login from './components/Login'
import './App.css';
import '../node_modules/react-dragula/dist/dragula.css';
import Firebase from './stores/FirebaseStore'
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      initialized: false
    }
  }
  componentDidMount () {
    Firebase
      .initialize()
      .then(() => {
        this.setState({initialized: true})
      })
  }
  render () {
    if (!this.state.initialized) { return null; }
    return (
      <div className="App">
        <Login>
          <Route path="/" component={Dashboard} />
        </Login>
      </div>
    );
  }
}

export default App;
