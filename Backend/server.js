import express from 'express';
import cors from 'cors'; // Importera cors
import shopRouter from '../routes/shop.js';

const port = process.env.PORT || 1811;
const app = express();

app.use(cors()); // Aktivera CORS-policy

app.use('/api', express.json());

app.use('/api/shop', shopRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
