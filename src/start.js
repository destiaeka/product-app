// start.js → menyalakan server.js
const app = require('./server');

const PORT = process.env.PORT || 3000;
const WELCOME = process.env.WELCOME_MSG || 'Selamat Datang di Product App';

app.listen(PORT, () => {
  console.log(`${WELCOME} - listening on port ${PORT}`);
});
