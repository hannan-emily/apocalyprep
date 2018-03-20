import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { TextField } from 'material-ui';

class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then( result => {
      console.log(result.data)
      localStorage.setItem('mernToken', result.data.token)
      this.props.liftToken(result.data)
    }).catch( err => console.log(err) )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Email: <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
        <TextField
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        /><br />
        <input type='submit' value='Log In!' />
        <a href="/auth/google">Sign In wcith Google!</a>
      </form>
    )
  }
}
export default Login;
