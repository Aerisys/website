import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async(req) => {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({error: 'Method not allowed'}), {
            status: 405,
            headers: {'Content-Type': 'application/json'}
        });
    }

    try {
        const {
            amount,
            currency = 'eur',
            customerName,
            customerEmail
        } = await req.json();

        // Validation côté serveur — ne jamais faire confiance au client
        if (!amount || typeof amount !== 'number' || !Number.isInteger(amount) || amount < 50) {
            return new Response(JSON.stringify({error: 'Montant invalide (minimum 50 centimes)'}), {
                status: 400,
                headers: {'Content-Type': 'application/json'}
            });
        }

        if (amount > 99999999) {
            return new Response(JSON.stringify({error: 'Montant trop élevé'}), {
                status: 400,
                headers: {'Content-Type': 'application/json'}
            });
        }

        const allowedCurrencies = [
            'eur',
            'usd',
            'gbp'
        ];
        if (!allowedCurrencies.includes(currency)) {
            return new Response(JSON.stringify({error: 'Devise non supportée'}), {
                status: 400,
                headers: {'Content-Type': 'application/json'}
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency,
            automatic_payment_methods: {enabled: true}, ...(customerEmail && {receipt_email: customerEmail}),
            metadata: {
                ...(customerName && {customer_name: customerName}), ...(customerEmail && {customer_email: customerEmail})
            }
        });

        return new Response(JSON.stringify({clientSecret: paymentIntent.client_secret}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        console.error('Stripe error:', error.message);
        return new Response(JSON.stringify({error: 'Erreur lors de la création du paiement'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}
