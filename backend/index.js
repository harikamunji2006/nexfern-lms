const express = require('express');
const authRouter = require('./auth');
const cors = require('cors');
const authenticateToken = require('./middleware/authenticateToken');
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to log API response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', async () => {
    const ms = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${ms}ms`);
    try {
      await prisma.apiResponseLog.create({
        data: {
          path: req.originalUrl,
          method: req.method,
          response_time_ms: ms,
        }
      });
    } catch (e) { console.error('API Response Log Error:', e); }
  });
  next();
});

app.use('/api', authRouter);

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const adminDashboardRoutes = require('./routes/adminDashboard');
app.use('/admin/dashboard', adminDashboardRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});