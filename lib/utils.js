const moment = require('moment');

module.exports.percentageIncrease = (n1, n2) => Math.round(((n2 - n1) / n1) * 100);

module.exports.median = (numbers) => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

module.exports.getNow = moment().utcOffset(Number(process.env.GA_TZ)).format('YYYYMMDDHH');
module.exports.getNowDays = moment().utcOffset(Number(process.env.GA_TZ)).format('YYYYMMDD');
module.exports.get24HoursAgo = moment().utcOffset(Number(process.env.GA_TZ)).subtract(24, 'hours').format('YYYYMMDDHH');
