require('dotenv/config');
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { create as venom, Whatsapp} from 'venom-bot';

import path  from 'path';

const app = express();
app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(routes);

export let client: Whatsapp | any;

app.use('/images', express.static(path.resolve(__dirname, '..', 'images')))
app.use('/pdfs', express.static(path.resolve(__dirname, '..', 'pdfs')))

app.listen(3000);