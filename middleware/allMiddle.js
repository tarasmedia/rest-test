const checkAuthorisation = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/users/signin');
};

const cookieLogger = (req, res, next) => {
  console.log(req.cookies);
  next();
};

const corsMiddleware = (req, res, next) => {
  const accessList = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:7654',
    'http://yandex.ru',
  ];
  const origin = req.get('origin');
  console.log(origin);
  if (accessList.includes(origin)) { // если в списке есть адрес того, кто обращается к серверу, то делаем для него заголовок
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};

module.exports = { checkAuthorisation, cookieLogger, corsMiddleware };
