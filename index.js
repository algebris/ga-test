require('dotenv').config();
require('./lib/auth');

const logger = require('./lib/logger');
const gapi = require('./lib/google-api');
const { percentageIncrease, getNow } = require('./lib/utils');
const { save } = require('./lib/db');

const timezone = Number(process.env.GA_TZ);
if (timezone || timezone === 0) {
  process.env.GA_TZ = timezone;
}

async function getStat() {
  logger.info(`Applying UTC ${process.env.GA_TZ} time diff. Now it's (${getNow}) GA APP time`);
  // Display stat for last 24 hours
  const last24 = await gapi.getUniqueSessions24Hours();
  logger.info(`Unique sessions for 24 last hours: ${last24}`);

  // Calculate the precentage difference between yesterday & today
  const yesterday = await gapi.getUniqueSessionsYesterday();
  const today = await gapi.getUniqueSessionsToday();
  let tyDiff = null;

  if (yesterday === today) {
    logger.info(`There were ${today} visitors today, like yesterday.`);
  } else

  if (yesterday > today) {
    if (today === 0) {
      logger.info(`There was no visitors today. But yesterday there were ${yesterday} visitors.`);
    } else {
      tyDiff = percentageIncrease(today, yesterday);
      logger.info(`Yesterday is ${tyDiff}% more than today.`);
    }
  } else

  if (today > yesterday) {
    if (yesterday === 0) {
      logger.info(`There was no visitors yesterday. But today there were already ${today} visitors.`);
    } else {
      tyDiff = percentageIncrease(yesterday, today);
      logger.info(`Today is ${tyDiff}% more than yesterday.`);
    }
  }

  // Calculate median for past 7 days
  const median7days = await gapi.getUniqueSessionsMedian7Days();
  logger.info(`Median number of visitors is ${median7days} for past 7 days`);

  return {
    last24, today, yesterday, tyDiff, median7days,
  };
}

getStat()
  .then(async (data) => {
    await save(data);
    logger.info('Results are saved to Db.');
  })
  .catch((err) => logger.error(err.message));
