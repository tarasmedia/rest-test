const express = require('express');
const sha256 = require('sha256');

const router = express.Router();

const { User } = require('../db/models');

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { username, email } = req.body;
  const newUser = await User.create({ username, email, password: sha256(req.body.password) });
  // console.log(newUser);
  // создается сессия
  req.session.user = newUser.username;
  req.session.userid = newUser.id;
  res.redirect('/users/profile');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (user.password === sha256(req.body.password)) {
      // создается сессия
      req.session.user = user.username;
      req.session.userid = user.id;
      res.redirect('/users/profile');
    } else {
      res.send(`invalid pass, valid is ${user.password}`); // ??
    }
  } else {
    res.send('no way');
  }
});

router.get('/profile', async (req, res) => { // TODO: req.params.id
  const me = await User.findByPk(req.session.userid);
  res.render('profile', { me });
});

router.get('/logout', (req, res) => {
  // разрушается сессия
  req.session.destroy();
  res.clearCookie('authorisation');
  res.redirect('/');
});

module.exports = router;
