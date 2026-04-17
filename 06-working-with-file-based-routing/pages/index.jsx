import { EventList } from '../components/events/event-list';
import { getFeaturedEvents } from '../data/dummy-data';

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { featuredEvents },
    revalidate: 1800, // Revalidate every 30 minutes
  };
};

export default HomePage;
