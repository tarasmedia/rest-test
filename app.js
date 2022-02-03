const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const postsRouter = require('./routes/postsRouter');
const userRouter = require('./routes/userRouter');
const { cookieLogger } = require('./middleware/allMiddle');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cookieLogger);

app.use(session({
  store: new FileStore(),
  secret: 'rtyujnku7i8yjiuhrgfg',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'authorisation',
}));

app.use((req, res, next) => {
  res.locals.username = req.session?.user; // optional chaining operator
  next();
});

app.get('/', (req, res) => {
  res.redirect('/posts/all');
});

app.use('/posts', postsRouter);
app.use('/users', userRouter);

app.listen(3210);
