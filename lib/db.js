const Datastore = require('nedb-promise');
const { getNowDays } = require('./utils');

const db = new Datastore({ filename: process.env.DB_FILENAME, autoload: true });

module.exports.save = async (data) => db.update(
  { date: getNowDays },
  { $set: { date: getNowDays, ...data } },
  { upsert: true },
);

module.exports.findAll = async () => db.find({});
