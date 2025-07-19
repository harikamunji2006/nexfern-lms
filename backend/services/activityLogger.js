const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

/**
 * Log an admin activity event.
 * @param {Object} params
 * @param {string} params.activity_type - The type of activity (e.g., 'course_approved').
 * @param {string} [params.user_id] - The user ID associated with the activity (optional).
 * @param {string} params.description - A description of the activity.
 */
async function logAdminActivity({ activity_type, user_id, description }) {
  try {
    await prisma.adminActivities.create({
      data: {
        activity_type,
        user_id,
        description,
        // activity_time will default to now()
      }
    });
  } catch (e) {
    console.error('Failed to log admin activity:', e);
  }
}

module.exports = { logAdminActivity }; 