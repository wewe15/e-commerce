const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((_req, res) => {
  res.json("oh you'r lost")
});

module.exports = router;