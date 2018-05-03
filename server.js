const
  bodyParser = require("body-parser"),
  express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  path = require("path"),

  db = require("./config/keys").mongoURI,
  user = require("./routes/api/user"),
  profile = require("./routes/api/profile"),
  posts = require("./routes/api/posts"),

  port = process.env.PORT || 5000,
  app = express();

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dev environment
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Prod environment
if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}...`));