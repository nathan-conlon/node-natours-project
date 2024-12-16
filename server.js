const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION - SHUTTING DOWN.');
  // Process.exit = 0 = success; 1 = uncaught exception
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// NOT A GOOD PRACTICE TO RELY SOLELY ON THE FOLLOWING TWO; ERRORS SHOULD BE HANDLED RIGHT WHERE THEY OCCUR; BUT THE FOLLOWING TWO CAN BE THOUGHT OF AS A SAFETY NET

// Globally listen for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION - SHUTTING DOWN.');
  // Run server.close first as this enables pending requests to be executed before shutting app down
  server.close(() => {
    // Process.exit = 0 = success; 1 = uncaught exception
    process.exit(1);
  });
});
