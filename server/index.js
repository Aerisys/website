import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import webhookRoutes from './routes/webhooks.js';
import paymentRoutes from './routes/payments.js';
import productRoutes from './routes/products.js';

const app = express();

// Webhook route MUST come before express.json() (needs raw body)
app.use(webhookRoutes);

// JSON parser for all other routes
app.use(express.json());

app.use(paymentRoutes);
app.use(productRoutes);

// Production: serve built frontend
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const distPath = path.resolve(__dirname, '..', 'dist');

    app.use(express.static(distPath));

    // SPA fallback
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API: http://localhost:${port}`);
});
