const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors  = require('cors');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT|| "3001";

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
app.use('/uploads', express.static('./uploads'))

app.use(routes);

app.listen(port, async () => {
    console.log(`starting app on: ${port}`);
    await sequelize.authenticate()
    console.log('Database is connected!!');
});

module.exports = app;