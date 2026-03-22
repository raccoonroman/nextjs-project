import { EventItem } from './event-item';

import classes from './event-list.module.css';

export const EventList = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};
