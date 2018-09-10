import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';

class EventForm extends React.Component {
  state = {
    event: Object.assign({}, this.props.event)
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
    const newEvent = {
      ...this.state.event,
      id: cuid(),
      hostPhotoURL: '/assets/user.png'
    }

    this.props.createEvent(newEvent)
    this.props.history.push('/events')
    }
  }

  onInputChange = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value
    this.setState({
      event: {
        event: newEvent
      }
    })
  }

  render() {
    const {handleUpdateEvent} = this.props;
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
      <Segment>
         <Form onSubmit={this.onFormSubmit}>
           <Form.Field>
             <label>Event Title</label>
             <input name='title' onChange={this.onInputChange} value={event.title} placeholder="First Name" />
           </Form.Field>
           <Form.Field>
             <label>Event Date</label>
           <input name='date' onChange={this.onInputChange} value={event.date} type="date" placeholder="Event Date" />
           </Form.Field>
           <Form.Field>
             <label>City</label>
           <input name='city' onChange={this.onInputChange} value={event.city} placeholder="City event is taking place" />
           </Form.Field>
           <Form.Field>
             <label>Venue</label>
           <input name='venue' onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event" />
           </Form.Field>
           <Form.Field>
             <label>Hosted By</label>
           <input name='hostedBy' onChange={this.onInputChange} value={event.hostedBy} placeholder="Enter the name of person hosting" />
           </Form.Field>
           <Button
            onClick={handleUpdateEvent}
            positive
            type="submit">
            Submit
           </Button>
           <Button
            onClick={this.props.history.goBack}
            type="button"
           >
            Cancel
           </Button>
         </Form>
       </Segment>
    );
  }
}

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
}

const action = {
  createEvent,
  updateEvent
}

export default connect(mapState, actions)(EventForm);