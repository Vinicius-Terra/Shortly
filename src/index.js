import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/usersRouter.js';
import urlsRouter from './routes/urlsRouter.js';
import rankRouter from './routes/rankRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRouter);
app.use(urlsRouter);
app.use(rankRouter);

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
