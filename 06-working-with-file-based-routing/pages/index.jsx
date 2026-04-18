import Head from 'next/head';

import { EventList } from '../components/events/event-list';
import { getFeaturedEvents } from '../data/dummy-data';

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
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
