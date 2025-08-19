require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // <-- add

const app = express();
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Route is working');
});

app.use('/api', require('./routes/checkHealth'));
app.use('/api', require('./routes/users/getUsers'));
app.use('/api', require('./routes/users/addUser'));
app.use('/api', require('./controller/emailController'));
app.use('/api', require('./routes/properties/getData'));
app.use('/api', require('./routes/properties/getDetails'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server Started`);
});
