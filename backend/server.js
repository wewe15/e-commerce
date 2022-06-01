const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors  = require('cors');
const { sequelize } = require('./models');

const app = express();
const address = "0.0.0.0:3001";

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
app.use('/uploads', express.static('./uploads'))

app.use(routes);

app.listen(3001, async () => {
    console.log(`starting app on: ${address}`);
    await sequelize.authenticate()
    console.log('Database is connected!!');
});

module.exports = app;