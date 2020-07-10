const fs = require('fs');
const { google } = require('googleapis');
const logger = require('./logger');

if (!fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
  logger.error('Can\'t find Google auth key file!');
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: './auth.json',
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

google.options({ auth });
