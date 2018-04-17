const mongoose = require('mongoose'),
      express = require('express'),
      port = process.env.PORT || 5000,
      auth = require('./routes/api/auth'),
      profile = require('./routes/api/profile'),
      post = require('./routes/api/post'),
      db = require('./config/keys').mongoURI;
      app = express(),
      
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
  
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/post', post);

app.listen(port, () => console.log(`Server running on port ${port}...`));