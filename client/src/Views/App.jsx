import React, { Component } from 'react';
import axios from 'axios'
import Clipboard from 'clipboard'

import './App.css';

import {
  Nav, Header, URLPrev, Aside, Loader, Error
} from '../Widgets/index'

class App extends Component {

  state = {
    responses: [],
    phone: "",
    country: "",
    errors: "",
    status: {
      statusText: "",
      statusCode: null
    },
    isLoading: false,
    copied: false,
    copiedUrl: false

  }
  componentDidMount () {
    const clipboard = new Clipboard('.clip-code')
    const clipboard2 = new Clipboard('.clip')

    clipboard2.on('success', (e) => {
      this.setState({ copiedUrl: true })
      e.clearSelection();
    });

    clipboard.on('success', (e) => {
      this.setState({ copied: true })
      e.clearSelection()
    })
  }

  componentWillUnmount () {
    this.setState({ copied: false })
  }

  onSubmit = (event) => {
    const { phone, country } = this.state
    event.preventDefault()
    this.setStatus("", null, true)


    axios.get(`https://phone-validator.herokuapp.com/api?phone=${phone}&country=${country}`)
      .then(res => {
        if (res.statusText === "OK") {
          this.setResponse(res.data)
          this.setStatus(res.statusText, res.status, false)
        } else {
          this.setResponse(res.data)
        }
      }).catch(err => {
        this.setStatus("Bad request", 400, false)
        console.error(err)
        this.setState({ errors: err })
      })

  }

  setResponse = (response) => {
    const { responses } = this.state
    responses.push(response)
    this.setState((previousState) => {
      Object.assign(previousState, responses)
    })
  }

  setStatus = (statusText, statusCode, isLoading) => {
    this.setState({
      isLoading: isLoading,
      status: {
        statusText: statusText,
        statusCode: statusCode
      }
    })
  }

  onPhoneChange = (event) => {
    this.setState({ phone: event.target.value })
  }

  onCountryChange = (event) => {
    this.setState({ country: event.target.value.toUpperCase() })
  }



  render () {
    const { responses, phone, country, copied, copiedUrl, isLoading, status } = this.state
    return (
      <div id="wrapper">
        <div className="row">
          <div className="col col-5">
            <Header>
              <h2>Phone Validator</h2>
            </Header>
          </div>
        </div>
        <div className="row">
          <div className="col col-3 pane">

            <Nav>
              <span>
                Queries
                  <span className="info">{responses === null ? 0 : responses.length}</span>
              </span>
            </Nav>
            <div className="label">
              <span>URL Preview</span>
            </div>
            <URLPrev country={country} phone={phone} copiedUrl={copiedUrl} />

            <div className="col content-header">
              <form className="form-inline">
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" placeholder="Phone" value={phone} onChange={this.onPhoneChange} />
                <label htmlFor="phone">Country</label>
                <input type="text" placeholder="Country, like UG for Uganda" name="country" value={country} onChange={this.onCountryChange} />
                <button className="submit-btn" onClick={this.onSubmit}>Send</button>
              </form>
            </div>

          </div>
          <div className="col col-3 pane pane-preview" id="side-prev">
            {
              responses.length ? (<button className="clip-code" data-clipboard-target="aside">{copied ? "success!" : <i className="fa fa-clipboard" aria-hidden="true"></i>}</button>) : ""
            }
            {status.statusCode === 400 ?
              <Error errObj={status} /> : ""

            }

            {isLoading ? (<Loader text="Loading ..." />) :
              <Aside responses={responses} id="aside" />
            }
          </div>
        </div>
      </div>)
  }
}

export default App;
