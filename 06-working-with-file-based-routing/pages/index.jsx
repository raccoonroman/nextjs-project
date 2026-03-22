import { EventList } from '../components/events/event-list';
import { getFeaturedEvents } from '../data/dummy-data';

const HomePage = () => {
  const featuresEvents = getFeaturedEvents();
  return (
    <div>
      <EventList events={featuresEvents} />
    </div>
  );
};

export default HomePage;
