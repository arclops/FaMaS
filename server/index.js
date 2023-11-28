// Deprecated version, replaced by server.js


// const express = require('express');
// const helmet = require('helmet');
// const app = express();
// const cors = require('cors');
// const { DateTime } = require('luxon');
// const { serverlogger } = require('./utils/serverlogger.js');
// const waitOn = require('wait-on');
// const { exec } = require('child_process');

// // Function to start the Express server
// const startServer = () => {
//   app.use(cors());
//   app.use(express.json());
//   app.use(helmet());

//   app.use('/api/auth', require('./routes/authorization/authlogics'));
//   app.use('/api/forgot', require('./routes/passwordreset/resetlogics'));
//   app.use('/api/admin', require('./routes/admindb/farmermanagement'));

//   app.listen(5000, () => {
//     console.log('Server started on port 5000');
//     serverlogger('Server started', DateTime.now().setZone('Asia/Kolkata').toISO());
//   });
// };

// const checkPostgresStatus = async (time) => {
//   const postgresOptions = {
//     resources: ['tcp:localhost:5432'],
//     delay: 500,
//     interval: 500,
//     timeout: time,
//   };

//   await waitOn(postgresOptions);
// };

// const autopsql = async () => {
//   const shortcutPath = '"F:/PythonSandbox/FaMaS/server/psqlstart.lnk"';
//   const command = `start "" "${shortcutPath}"`;
//   return new Promise((resolve, reject) => {
//     exec(command, (error, _, stderr) => {
//       if (error || stderr) {
//         reject(error || stderr);
//       }
//       resolve();
//     });
//   });
// };

// const promptForManualStart = async () => {
//   console.log('Access denied to autostart PostgreSQL server.');
//   console.log('Please start the PostgreSQL server manually.');
// };

// const init = async () => {
//   try {
//     await checkPostgresStatus(1000);
//     console.log('PostgreSQL server is up and running, starting Express server...');
//     startServer();
//   } catch (error) {
//     console.log('PostgreSQL server is not running.');
//     console.log('Attempting to start PostgreSQL server...');
//     try {
//       await autopsql();
//       console.log('PostgreSQL server start initiated...');
//       await checkPostgresStatus(20000);
//       console.log('Auto Start successful!');
//       console.log('PostgreSQL server is up and running, starting Express server...');
//       startServer();
//     } catch (err) {
//       console.error('AutoStart Failed!');
//       if (err.toString().includes('Access is denied')) {
//         await promptForManualStart();
//         await checkPostgresStatus(300000); // Check again after manual start
//         console.log('PostgreSQL server started manually, proceeding...');
//         startServer();
//       } else {
//         console.error('Unhandled error occurred:', err.message);
//       }
//     }
//   }
// };

// init();