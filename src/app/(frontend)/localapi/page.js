import config from '@payload-config';
import { getPayload } from 'payload';

const MyServerComponent = async () => {
  const payload = await getPayload({ config });

  // Fetch data
  const findResult = await payload.find({ collection: 'pages' });

  return (
    <ul>
      {findResult.docs.map((page) => (
        <li key={page.id}>{page.title}</li> // Ensure `page.id` exists
      ))}
    </ul>
  );
};

export default MyServerComponent;