import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { incrementCounter, decrementCounter } from './testActions';
import { openModal } from '../modals/modalActions';

class TestComponent extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptLoaded: false
  }

  handleScriptLoaded = () => {
    this.setState({scriptLoaded: true})
  }

  handleFormSubmit = (event) => {
   event.preventDefault()

   geocodeByAddress(this.state.address)
     .then(results => getLatLng(results[0]))
     .then(latLng => console.log('Success', latLng))
     .catch(error => console.error('Error', error))
 }

  onChange = (address) => this.setState({address})

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    const {incrementCounter, decrementCounter, data, openModal } = this.props;
    return (
      <div>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBYJ0p7OpY2gRXe9z7hjjHcWAR1n8d-4Y8&libraries=places'
          onLoad={this.handleScriptLoaded}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
          <Button onClick={incrementCounter} color='green' content='Increment'/>
          <Button onClick={decrementCounter} color='red' content='Decrement'/>
          <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="Open Modal">
          <br/>
          <br/>
          <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
            <button type="submit">Submit</button>
          </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
  openModal
}

export default connect(mapState)(TestComponent)
