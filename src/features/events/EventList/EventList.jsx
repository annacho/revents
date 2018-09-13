import React, {PropTypes} from 'react';
import EventListItem from './EventListItem';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events, deleteEvent } = this.props;
    return (
      <div>
        {events && events.map((event) => (
          <EventListItem
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
    )
  }
}

EventList.propTypes = {
};
