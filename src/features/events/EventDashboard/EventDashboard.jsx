import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

class EventDashboard extends React.Component {
  state = {
    isOpen: false,
    selectedEvent: null
  }

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const { events } = this.props;
    if (!isLoaded(events) || isEmpty(events)) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
        <EventActivity/>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = (state) => ({
  events: state.firestore.ordered.events
})

const actions = {
  deleteEvent
}

export default connect(mapState, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard)
);
