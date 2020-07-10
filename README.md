# Test work

## Installation

You need to install NodeJS > 14. I use some latest features.
If you use various versions of Node everyday it's better to install similar packages like:

```
https://www.npmjs.com/package/n
https://github.com/nvm-sh/nvm
```

Then you have to fetch repository and build node_modules tree:

```
# git clone https://github.com/algebris/ga-test.git
# cd ga-test
# npm install
```

## Configure

This module is well tested with real GA credentials, so for testing on real data, please
get JSON key file from Google. Then you must to create .env file in app directory.

Example of .env
```
VIEW_ID = 223528146
GOOGLE_APPLICATION_CREDENTIALS = ./auth.json
GA_TZ = 3
DB_FILENAME = ga-test.db
```

*GOOGLE_APPLICATION_CREDENTIALS* - the variable configured for this JSON file name. I just renamed it to something more usefull *auth.json*

*VIEW_ID* – the view must be configured in https://analytics.google.com/analytics/web and copy/pasted in this variable.

*GA_TZ* - when you create a new GA application, you need to set the time-zone and copy/paste into this variable. It's necessary for proper calculation
date/time .

*DB_FILENAME* - filename which automatically creating in app directory. Need for support NeDB queries.

## Launch

The script is about to launch the index.js file in app directory, execute the queries, print them and exit. If everything goes well DB file taken from 
DB_FILENAME should be automatically created in the app directory. It has a readable text format and is suitable for reading as is.

Example of script output:
```
➜  ga-test git:(master) ✗ npm start

> ga-test@1.0.0 start /Users/algebris/Sites/ga-test
> node index.js

info: Applying UTC 3 time diff. Now it's (2020071014) GA APP time
info: Unique sessions for 24 last hours: 9
info: Yesterday is 1500% more than today.
info: Median number of visitors is 0 for past 7 days
info: Results are saved to Db.
```

## Info

I would appreciate any feedback at algebris@gmail.com.
If you want to test it with a live JSON key, just drop me a message, 
and I will send you an example JSON key file (Read-only)

Cheers.

* Telegram: @algebris
* Skype: algebris
* Phone: +7(913)920-41-51
