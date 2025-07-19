const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const os = require('os');
let disk;
try {
  disk = require('diskusage');
} catch (e) {
  disk = null;
}

// External DB health check (PostgreSQL example)
let pgClient;
try {
  pgClient = require('pg').Client;
} catch (e) {
  pgClient = null;
}

async function checkExternalDbHealth() {
  const externalDbUrl = process.env.EXTERNAL_DB_URL;
  if (!pgClient || !externalDbUrl) return { status: 'unknown', value: 'N/A' };
  const client = new pgClient({ connectionString: externalDbUrl });
  const start = Date.now();
  try {
    await client.connect();
    await client.query('SELECT 1');
    const ms = Date.now() - start;
    await client.end();
    return { status: ms < 200 ? 'healthy' : 'warning', value: `${ms}ms` };
  } catch (e) {
    return { status: 'down', value: 'N/A' };
  }
}

const DB_TOTAL_BYTES = 1 * 1024 * 1024 * 1024; // 1 GB, set this to your plan's limit

let storageCache = { value: null, expires: 0 };

async function getDatabaseStorageUsage() {
  const now = Date.now();
  if (storageCache.value && storageCache.expires > now) {
    return storageCache.value;
  }
  try {
    const [result] = await prisma.$queryRaw`SELECT pg_database_size(current_database()) AS used_bytes`;
    const usedBytes = Number(result.used_bytes);
    const usedGB = (usedBytes / (1024 ** 3)).toFixed(2);
    const totalGB = (DB_TOTAL_BYTES / (1024 ** 3)).toFixed(2);
    const value = `${usedGB} GB out of ${totalGB} GB`;
    // Cache for 5 minutes (300,000 ms)
    storageCache = { value, expires: now + 5 * 60 * 1000 };
    return value;
  } catch (e) {
    console.error('DB Storage Error:', e);
    return 'N/A';
  }
}

async function getDashboardStats() {
  // Calculate revenue as sum of (course price * number of enrollments) for all courses
  const [result] = await prisma.$queryRaw`
    SELECT
      (SELECT COUNT(*) FROM users) AS "totalUsers",
      (SELECT COUNT(*) FROM courses WHERE is_published = TRUE) AS "activeCourses",
      (SELECT COUNT(*) FROM courses WHERE is_published = FALSE) AS "pendingApprovals",
      (
        SELECT COALESCE(SUM(c.price * e.enrollments), 0)
        FROM (
          SELECT course_id, COUNT(*) AS enrollments
          FROM enrollments
          GROUP BY course_id
        ) e
        JOIN courses c ON c.course_id = e.course_id
      ) AS "revenue"
  `;
  return {
    totalUsers: Number(result.totalUsers),
    activeCourses: Number(result.activeCourses),
    pendingApprovals: Number(result.pendingApprovals),
    revenue: Number(result.revenue)
  };
}

async function getSystemHealth() {
  const apiStart = Date.now();
  console.time('systemHealth:total');

  // Server status
  console.time('systemHealth:server');
  const load = os.loadavg()[0];
  const serverStatus = load < 2 ? 'healthy' : 'warning';
  console.timeEnd('systemHealth:server');

  // Database health
  console.time('systemHealth:db');
  const dbStart = Date.now();
  let dbStatus = 'healthy';
  let dbResponseMs = 0;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbResponseMs = Date.now() - dbStart;
    dbStatus = dbResponseMs < 200 ? 'healthy' : 'warning';
  } catch {
    dbStatus = 'down';
    dbResponseMs = -1;
  }
  console.timeEnd('systemHealth:db');

  // Database storage
  console.time('systemHealth:storage');
  const dbStorage = await getDatabaseStorageUsage();
  console.timeEnd('systemHealth:storage');

  // External DB health
  console.time('systemHealth:externalDb');
  const externalDb = await checkExternalDbHealth();
  console.timeEnd('systemHealth:externalDb');

  // API response time
  const apiResponseMs = Date.now() - apiStart;
  const apiStatus = apiResponseMs < 300 ? 'healthy' : 'warning';

  console.timeEnd('systemHealth:total');

  return [
    { label: 'Server Status', status: serverStatus, value: 'Running' },
    { label: 'Database', status: dbStatus, value: dbResponseMs === -1 ? 'N/A' : `${dbResponseMs}ms` },
    { label: 'Storage', status: 'info', value: dbStorage },
    { label: 'External DB', status: externalDb.status, value: externalDb.value },
    { label: 'API Response', status: apiStatus, value: `${apiResponseMs}ms` }
  ];
}

async function getPendingCourses() {
  return await prisma.course.findMany({
    where: { is_published: false },
    orderBy: { created_at: 'desc' },
    select: {
      course_id: true,
      name: true,
      instructor_id: true,
      created_at: true
    }
  });
}

async function getRecentActivity() {
  const activities = await prisma.adminActivities.findMany({
    orderBy: { activity_time: 'desc' },
    take: 10,
    select: {
      activity_id: true,
      activity_type: true,
      description: true,
      activity_time: true
    }
  });
  return activities.map(a => ({
    id: a.activity_id,
    type: a.activity_type,
    message: a.description,
    time: a.activity_time
  }));
}

async function getAverageApiResponseTime(hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);
  const [result] = await prisma.$queryRaw`
    SELECT AVG(response_time_ms) AS avg_ms
    FROM api_response_logs
    WHERE created_at >= ${since}
  `;
  return result.avg_ms ? Math.round(result.avg_ms) : null;
}

module.exports = {
  getDashboardStats,
  getSystemHealth,
  getPendingCourses,
  getRecentActivity,
  getAverageApiResponseTime
}; 