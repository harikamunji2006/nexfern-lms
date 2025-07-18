const express = require('express');
const authRouter = require('./auth');
const cors = require('cors');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRouter);

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});