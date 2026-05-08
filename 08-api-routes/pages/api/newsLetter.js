import { connectDatabase, insertDoc } from '../../helpers/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' });
      return;
    }
    try {
      await insertDoc(client, 'newsletter', { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }

    console.log(`New newsletter subscription: ${email}`);
    res.status(201).json({ message: 'Subscription successful!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
