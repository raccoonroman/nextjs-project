import { connectDatabase, insertDoc } from '../../helpers/db-util';

export default async function handler(req, res) {
  const { eventId } = req.query;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database' });
    return;
  }
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }
    const newComment = { email, name, text, eventId };
    try {
      const result = await insertDoc(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
    }
  } else if (req.method === 'GET') {
    try {
      const db = client.db('nextjs');
      const comments = await db
        .collection('comments')
        .find({ eventId })
        .sort({ _id: -1 })
        .toArray();
      console.log(`Fetching comments for event: ${eventId}`);
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: 'Fetching comments failed' });
    }
  }
  client.close();
}
