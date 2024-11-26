import { getRef } from '../controllers/ref.controller';
import app from './payment.routes';

app.post('/getref', getRef);

export default app;
