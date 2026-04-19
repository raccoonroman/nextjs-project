export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }
    console.log(`New newsletter subscription: ${email}`);
    res.status(201).json({ message: 'Subscription successful!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
