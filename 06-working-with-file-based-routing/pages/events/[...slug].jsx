import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../data/dummy-data';
import { EventList } from '../../components/events/event-list';
import { ResultsTitle } from '../../components/events/results-title';
import { Button } from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = ({ events, date, hasError }) => {
  if (hasError) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  return (
    <>
      <ResultsTitle date={new Date(date.year, date.month - 1)} />
      <EventList events={events} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const slug = params.slug;
  const year = +slug[0];
  const month = +slug[1];

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = getFilteredEvents({ year, month });

  return {
    props: {
      events: filteredEvents,
      date: { year, month },
    },
  };
};

export default FilteredEventsPage;
