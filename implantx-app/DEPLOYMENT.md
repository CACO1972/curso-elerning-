# 🚀 ImplantX™ Deployment Guide

This guide covers deploying ImplantX™ to various platforms.

---

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest) ⭐

**Why Railway?**
- ✅ Free tier with 500 hours/month
- ✅ Automatic deployments from GitHub
- ✅ Environment variables UI
- ✅ Custom domains
- ✅ Excellent dashboard

**Deploy Steps:**

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy from GitHub**
   ```
   1. Click "New Project"
   2. Select "Deploy from GitHub repo"
   3. Choose your repository: CACO1972/curso-elerning-
   4. Railway will detect it's a Node.js app
   ```

3. **Configure Environment Variables**
   ```
   In Railway dashboard:
   - Click on your service
   - Go to "Variables" tab
   - Add:
     - NODE_ENV = production
     - OPENAI_API_KEY = your_key_here
     - ALLOWED_ORIGINS = https://your-app.railway.app
   ```

4. **Configure Root Directory**
   ```
   In Settings tab:
   - Root Directory: implantx-app
   - Start Command: npm start
   ```

5. **Deploy!**
   - Railway auto-deploys
   - You'll get a URL like: https://your-app.railway.app

---

### Option 2: Render (Great Free Tier)

**Why Render?**
- ✅ Generous free tier
- ✅ Auto-deploy from GitHub
- ✅ Easy to use
- ✅ Good documentation

**Deploy Steps:**

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   ```
   1. Click "New +" → "Web Service"
   2. Connect your GitHub repo
   3. Configure:
      - Name: implantx-app
      - Root Directory: implantx-app
      - Environment: Node
      - Build Command: npm install
      - Start Command: npm start
   ```

3. **Add Environment Variables**
   ```
   In Environment tab, add:
   - NODE_ENV = production
   - OPENAI_API_KEY = your_key_here
   - ALLOWED_ORIGINS = https://your-app.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Your app will be live!

---

### Option 3: Heroku (Classic Choice)

**Why Heroku?**
- ✅ Well-established platform
- ✅ Free tier available (with credit card)
- ✅ Easy CLI tools
- ✅ Great add-ons ecosystem

**Deploy Steps:**

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku

   # Windows
   # Download from: https://devcenter.heroku.com/articles/heroku-cli

   # Ubuntu
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd implantx-app
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set OPENAI_API_KEY=your_key_here
   heroku config:set ALLOWED_ORIGINS=https://your-app-name.herokuapp.com
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix implantx-app heroku main
   # or if that doesn't work:
   git push heroku `git subtree split --prefix implantx-app main`:main --force
   ```

5. **Open Your App**
   ```bash
   heroku open
   ```

---

### Option 4: Vercel (Requires Serverless Adaptation)

**Note:** Vercel is optimized for serverless/edge functions. The current app would need to be adapted to use Vercel's serverless functions instead of Express.

---

### Option 5: DigitalOcean VPS (Full Control)

**Why DigitalOcean?**
- ✅ Full control over server
- ✅ Can install anything
- ✅ Good for learning
- ✅ Affordable ($5-10/month)

**Deploy Steps:**

1. **Create Droplet**
   ```
   - Go to digitalocean.com
   - Create Ubuntu 22.04 droplet
   - Choose $5/month plan
   - Add SSH key
   ```

2. **SSH into Server**
   ```bash
   ssh root@your_droplet_ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   apt update && apt upgrade -y

   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt install -y nodejs

   # Install PM2 (process manager)
   npm install -g pm2

   # Install Nginx (reverse proxy)
   apt install -y nginx

   # Install Git
   apt install -y git
   ```

4. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/CACO1972/curso-elerning-.git
   cd curso-elerning-/implantx-app
   npm install
   ```

5. **Configure Environment**
   ```bash
   nano .env
   # Add:
   # NODE_ENV=production
   # PORT=3000
   # OPENAI_API_KEY=your_key_here
   # ALLOWED_ORIGINS=https://yourdomain.com
   ```

6. **Start with PM2**
   ```bash
   pm2 start server/index.js --name implantx
   pm2 startup
   pm2 save
   ```

7. **Configure Nginx**
   ```bash
   nano /etc/nginx/sites-available/implantx
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Enable site:
   ```bash
   ln -s /etc/nginx/sites-available/implantx /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

8. **Set Up SSL with Let's Encrypt**
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

9. **Configure Firewall**
   ```bash
   ufw allow 'Nginx Full'
   ufw allow OpenSSH
   ufw enable
   ```

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test all steps of the questionnaire
- [ ] Verify tooth selection works
- [ ] Test the "Calculate Results" button
- [ ] Click "Escuchar a Río" and verify AI responses work
- [ ] Test on mobile device
- [ ] Check browser console for errors
- [ ] Verify environment variables are set correctly
- [ ] Test rate limiting (try making 11 requests in 15 minutes)
- [ ] Check OpenAI usage in dashboard

---

## Monitoring & Maintenance

### Check Logs

**Railway:**
```
Dashboard → Your Service → Deployments → View Logs
```

**Render:**
```
Dashboard → Your Service → Logs tab
```

**Heroku:**
```bash
heroku logs --tail
```

**DigitalOcean:**
```bash
pm2 logs implantx
```

### Monitor OpenAI Usage

- Visit https://platform.openai.com/usage
- Set up billing alerts
- Monitor costs

### Set Up Uptime Monitoring

Free options:
- UptimeRobot: https://uptimerobot.com
- Pingdom: https://www.pingdom.com
- Better Uptime: https://betteruptime.com

---

## Troubleshooting

### Common Issues

**"Application Error" or 500 errors:**
- Check logs for errors
- Verify environment variables are set
- Ensure OPENAI_API_KEY is valid

**"Service Unavailable" for Río:**
- Check OpenAI API key is set
- Verify billing is set up on OpenAI account
- Check API quota hasn't been exceeded

**Port binding errors:**
- Make sure PORT environment variable is set correctly
- Most platforms set PORT automatically

**CORS errors:**
- Add your domain to ALLOWED_ORIGINS
- In production, set specific origins (not *)

---

## Custom Domain Setup

### Railway
1. Go to Settings → Domains
2. Click "Add Domain"
3. Add your domain and update DNS records

### Render
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

### Heroku
```bash
heroku domains:add yourdomain.com
# Follow DNS instructions
```

---

## Scaling Considerations

If your app gets popular:

1. **Upgrade Platform Plan**
   - More memory/CPU
   - Better performance

2. **Implement Caching**
   - Cache ChatGPT responses
   - Use Redis for session storage

3. **Add Database**
   - Store results for analytics
   - Track user sessions

4. **Load Balancing**
   - Deploy to multiple regions
   - Use CDN for static assets

5. **Monitoring**
   - Set up error tracking (Sentry)
   - Performance monitoring (New Relic)

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Heroku Docs: https://devcenter.heroku.com
- DigitalOcean Docs: https://docs.digitalocean.com

**Contact:**
- WhatsApp: +56 9 3557 2986
- Email: contacto@implantx.ai
