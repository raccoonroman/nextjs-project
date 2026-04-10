import { useRouter } from 'next/router';
import { EventList } from '../../components/events/event-list';
import { EventsSearch } from '../../components/events/events-search';
import { getAllEvents } from '../../data/dummy-data';

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events}></EventList>
    </>
  );
};

export default AllEventsPage;
