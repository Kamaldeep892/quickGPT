import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import dns from 'dns';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';

dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express();

await connectDB();

//Stripe Webhooks
app.post('/api/stripe', express.raw({type: 'application/json'}),stripeWebhooks)

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('server is running'));
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit',creditRouter)

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});