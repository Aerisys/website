# Deploiement VPS — Aerisys

## Prerequis

- VPS Ubuntu 22.04+ (ou Debian 12+)
- Acces root ou sudo
- Nom de domaine pointe vers l'IP du VPS (A record)

## 1. Installer Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # v22.x
```

## 2. Cloner le projet

```bash
sudo mkdir -p /var/www/aerisys
sudo chown $USER:$USER /var/www/aerisys
git clone <repo-url> /var/www/aerisys
cd /var/www/aerisys
```

## 3. Installer les dependances et build

```bash
npm install
npm run build
```

Le build genere le dossier `dist/` (frontend statique).

## 4. Variables d'environnement

```bash
cp .env.example .env
nano .env
```

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=3001
NODE_ENV=production
```

## 5. Tester le lancement

```bash
node --env-file=.env server/index.js
```

Verifier que `http://<IP>:3001` repond. Ctrl+C pour arreter.

## 6. PM2 — process manager

```bash
sudo npm install -g pm2
```

Creer `ecosystem.config.cjs` a la racine :

```js
module.exports = {
  apps: [{
    name: 'aerisys',
    script: 'server/index.js',
    cwd: '/var/www/aerisys',
    node_args: '--env-file=.env',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

Lancer :

```bash
cd /var/www/aerisys
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # suivre l'instruction affichee pour le demarrage auto
```

Commandes utiles :

```bash
pm2 logs aerisys    # logs en temps reel
pm2 restart aerisys # redemarrer
pm2 status          # etat des process
```

## 7. Nginx — reverse proxy + HTTPS

```bash
sudo apt install -y nginx
```

Creer `/etc/nginx/sites-available/aerisys` :

```nginx
server {
    listen 80;
    server_name ton-domaine.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activer :

```bash
sudo ln -s /etc/nginx/sites-available/aerisys /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 8. HTTPS avec Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ton-domaine.com
```

Certbot modifie la config Nginx automatiquement. Le renouvellement est automatique via timer systemd.

## 9. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 10. Webhook Stripe en production

1. Dashboard Stripe > Developers > Webhooks
2. Add endpoint : `https://ton-domaine.com/api/stripe-webhook`
3. Evenements : `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`, `charge.dispute.created`
4. Copier le Signing secret dans `.env` (`STRIPE_WEBHOOK_SECRET`)
5. `pm2 restart aerisys`

## Mise a jour

```bash
cd /var/www/aerisys
git pull
npm install
npm run build
pm2 restart aerisys
```
