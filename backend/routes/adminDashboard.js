const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const dashboardService = require('../services/adminDashboardService');

router.use(authenticateToken);

router.get('/stats', async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/system-health', async (req, res) => {
  try {
    const health = await dashboardService.getSystemHealth();
    res.json(health);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch system health' });
  }
});

router.get('/pending-courses', async (req, res) => {
  try {
    const courses = await dashboardService.getPendingCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending courses' });
  }
});

router.get('/recent-activity', async (req, res) => {
  try {
    const activity = await dashboardService.getRecentActivity();
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent activity' });
  }
});

router.get('/api-average-response', async (req, res) => {
  try {
    const avg = await dashboardService.getAverageApiResponseTime();
    res.json({ averageResponseMs: avg });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch average API response time' });
  }
});

module.exports = router; 