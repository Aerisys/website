import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { connectDB } from './lib/mongoose.js';
import webhookRoutes from './routes/webhooks.js';
import paymentRoutes from './routes/payments.js';
import productRoutes from './routes/products.js';
import adminAuthRoutes from './routes/admin/auth.js';
import adminProductRoutes from './routes/admin/products.js';
import adminOrderRoutes from './routes/admin/orders.js';
import adminCategoryRoutes from './routes/admin/categories.js';

const app = express();

// Webhook route MUST come before express.json() (needs raw body)
app.use(webhookRoutes);

// JSON parser for all other routes
app.use(express.json());

app.use(paymentRoutes);
app.use(productRoutes);
app.use(adminAuthRoutes);
app.use(adminProductRoutes);
app.use(adminOrderRoutes);
app.use(adminCategoryRoutes);

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

await connectDB();
app.listen(port, () => {
    console.log(`API: http://localhost:${port}`);
});
