
import express from 'express';
import helmet from 'helmet';
import {} from 'dotenv/config';
import cors from 'cors';
import winston from 'winston';
import bodyParser from 'body-parser';
import { mainRouter } from './api/routes/route.js';
import responseHelper from './api/helpers/response.helper.js';
import errr from './api/helpers/error.helper.js';
import { loggerService } from './api/service/logging.service.js';

const app = express();

app.use(helmet());

app.use(cors());

app.use('/uploads', express.static('public/uploads'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/route', mainRouter);

app.use(responseHelper);

app.use(errr.handleJoiErrors);

app.use(errr.handleErr);

loggerService();

const port = process.env.PORT;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

