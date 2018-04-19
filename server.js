const bodyParser = require('body-parser'),
      express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport'),

      db = require('./config/keys').mongoURI,
      user = require('./routes/api/user'),
      profile = require('./routes/api/profile'),
      posts = require('./routes/api/posts'),

      port = process.env.PORT || 5000,
      app = express();

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server listening on port ${port}...`));