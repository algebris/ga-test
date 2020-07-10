const { google } = require('googleapis');
const { median, get24HoursAgo } = require('./utils');

const viewId = process.env.VIEW_ID;
const api = google.analytics('v3');

module.exports.getUniqueSessions = (start, end, dimensions) => api.data.ga.get({
  ids: `ga:${viewId}`,
  'start-date': start,
  'end-date': end,
  metrics: 'ga:sessions',
  dimensions,
});

module.exports.getUniqueSessionsToday = async () => {
  const result = await this.getUniqueSessions('today', 'today');
  return result.data.rows?.[0][0] || 0;
};

module.exports.getUniqueSessionsYesterday = async () => {
  const result = await this.getUniqueSessions('yesterday', 'yesterday');
  return result.data.rows?.[0][0] || 0;
};

// Considering GA timezone (initially configured in GA app) calculates 24 hours backwards from now
module.exports.getUniqueSessions24Hours = async () => {
  // Criteria must be refined for minutes/seconds on demand. Only hours considered!!!
  const result = await this.getUniqueSessions('yesterday', 'today', ['ga:dateHour']);

  return (result.data.rows || [])
    .reduce((acc, value) => {
      if (Number(value[0]) >= Number(get24HoursAgo)) {
        return acc + Number(value[1]);
      }
      return acc;
    }, 0);
};

module.exports.getUniqueSessionsMedian7Days = async () => {
  const result = await this.getUniqueSessions('7daysAgo', 'yesterday', ['ga:day']);
  const data = (result.data.rows || []).map(([, count]) => parseInt(count, 10));

  return median(data);
};
