const mongoose = require('mongoose'),
      express = require('express'),
      port = process.env.PORT || 5000,
      bodyParser = require('body-parser'),
      user = require('./routes/api/user'),
      profile = require('./routes/api/profile'),
      post = require('./routes/api/post'),
      db = require('./config/keys').mongoURI;
      app = express(),

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', post);

app.listen(port, () => console.log(`Server running on port ${port}...`));