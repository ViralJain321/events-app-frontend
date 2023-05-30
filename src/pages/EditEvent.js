import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';
import { Suspense } from 'react';

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');

  return <Suspense fallback={<p>Loading...</p>}>
    <EventForm method="patch" event={data.event} />
  </Suspense>;
}

export default EditEventPage;
