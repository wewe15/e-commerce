const router = require('express').Router();
const userRoutes = require('./user');
const categoryRoutes = require('./category')

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes)

module.exports = router;