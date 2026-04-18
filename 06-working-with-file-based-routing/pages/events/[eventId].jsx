import Head from 'next/head';
import { getAllEvents, getEventById } from '../../data/dummy-data';
import { EventSummary } from '../../components/event-detail/event-summary';
import { EventLogistics } from '../../components/event-detail/event-logistics';
import { EventContent } from '../../components/event-detail/event-content';
import EventAlert from '../../components/ui/error-alert';

const EventDetailsPage = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: { event },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();
  return {
    paths: events.map((event) => ({ params: { eventId: event.id } })),
    fallback: 'blocking',
  };
};

export default EventDetailsPage;
