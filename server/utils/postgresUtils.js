const { exec } = require('child_process');
const waitOn = require('wait-on');

const checkPostgresStatus = async (time) => {
  const postgresOptions = {
    resources: ['tcp:localhost:5432'],
    delay: 500,
    interval: 500,
    timeout: time,
  };

  await waitOn(postgresOptions);
};

const autopsql = async () => {
  const shortcutPath = '"F:/PythonSandbox/FaMaS/server/psqlstart.lnk"';
  const command = `start "" "${shortcutPath}"`;
  return new Promise((resolve, reject) => {
    exec(command, (error, _, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
      }
      resolve();
    });
  });
};

const promptForManualStart = async () => {
  console.log('Access denied to autostart PostgreSQL server.');
  console.log('Please start the PostgreSQL server manually.');
};

module.exports = { autopsql, checkPostgresStatus, promptForManualStart };
