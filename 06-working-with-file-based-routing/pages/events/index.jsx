import { useRouter } from 'next/router';
import { EventList } from '../../components/events/event-list';
import { EventsSearch } from '../../components/events/events-search';
import { getAllEvents } from '../../data/dummy-data';

const AllEventsPage = ({ events }) => {
  const router = useRouter();
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

export const getStaticProps = async () => {
  const events = await getAllEvents();
  return {
    props: { events },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default AllEventsPage;
