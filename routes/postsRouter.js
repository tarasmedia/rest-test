const express = require('express');

const router = express.Router();

const { Tweet } = require('../db/models');
const { checkAuthorisation, corsMiddleware } = require('../middleware/allMiddle');

router.use(corsMiddleware);

router.get('/all', async (req, res) => {
  // find all posts
  const allTweets = await Tweet.findAll(); // TODO: переделать чтобы автор брался из Users
  res.render('index', { allTweets });
});

router.get('/json', async (req, res) => {
  const allTweets = await Tweet.findAll();
  res.json(allTweets);
});

router.get('/', checkAuthorisation, (req, res) => {
  res.render('tweetform');
});

router.post('/', checkAuthorisation, async (req, res) => {
  const { author, text } = req.body;
  console.log(req.body);
  const newTweet = await Tweet.create({ author, text });
  res.redirect('/posts/all');
});

router.delete('/:id', async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    await Tweet.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(555);
  }
});

router.put('/:id', async (req, res) => {
  console.log(req.body);
  try {
    await Tweet.update({ text: req.body.text }, { where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
