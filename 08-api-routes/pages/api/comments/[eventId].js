export default function handler(req, res) {
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
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
  } else if (req.method === 'GET') {
    const dummyComments = [
      {
        id: 'c1',
        name: 'Test User',
        text: 'This is a test comment',
      },
    ];
    const { eventId } = req.query;
    console.log(`Fetching comments for event: ${eventId}`);
    res.status(200).json({ comments: dummyComments });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
