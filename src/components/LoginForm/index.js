import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errMsg: ''}

  onSuccessLogin = jwtToken => {
    // console.log('success login')
    this.setState({showErrorMsg: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = msg => {
    // console.log('failure login')
    this.setState({showErrorMsg: true, errMsg: msg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    // console.log(data.jwt_token)
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="form-container">
        <form onSubmit={this.onSubmitForm} className="form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <label htmlFor="username" className="form-label">
            USERNAME
          </label>
          <input
            onChange={this.onChangeUsername}
            className="form-input"
            id="username"
            type="text"
            value={username}
            placeholder="Username"
          />
          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            onChange={this.onChangePassword}
            className="form-input"
            id="password"
            type="password"
            value={password}
            placeholder="Password"
          />
          <button type="submit" className="form-btn">
            Login
          </button>
          {showErrorMsg && <p className="err-msg">*{errMsg}</p>}
          <p className="creditionals">
            Valid username : rahul <br /> Valid password : rahul@2021
          </p>
        </form>
      </div>
    )
  }
}

export default LoginForm
