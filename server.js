const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

app.use('/uploads', express.static('public/uploads'));

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/route', require('./api/routes/route'));

app.use(require('./api/helpers/response.helper'));

app.use(require('./api/helpers/error.helper').handleJoiErrors);

app.use(require('./api/helpers/error.helper').handleErr);

const portNumber = 3001;

const winston = require('winston');
require('./api/service/logging.service')();

const port = process.env.PORT || portNumber;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

