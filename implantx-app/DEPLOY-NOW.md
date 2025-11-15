# 🚀 Deploy ImplantX™ NOW - Step by Step

Choose your preferred platform and follow the steps below.

---

## 🌟 Option 1: Railway (RECOMMENDED - Easiest!)

**Time: 3-5 minutes** | **Cost: FREE**

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

### Step 2: Deploy Your App
1. Click "**New Project**"
2. Select "**Deploy from GitHub repo**"
3. Choose repository: `CACO1972/curso-elerning-`
4. Railway will detect it's a Node.js app automatically

### Step 3: Configure Root Directory
1. Click on your service (should say "implantx-app" or similar)
2. Go to "**Settings**" tab
3. Find "**Root Directory**"
4. Enter: `implantx-app`
5. Click "**Update**"

### Step 4: Add Environment Variables
1. Go to "**Variables**" tab
2. Click "**+ New Variable**"
3. Add these variables:

```
NODE_ENV = production
OPENAI_API_KEY = your_openai_key_here
```

**To get OpenAI key:**
- Go to https://platform.openai.com/api-keys
- Click "Create new secret key"
- Copy and paste it

### Step 5: Deploy!
1. Railway will automatically deploy
2. Wait 2-3 minutes
3. Click "**Settings**" → "**Networking**" → "**Generate Domain**"
4. You'll get a URL like: `https://implantx-app-production.up.railway.app`

### Step 6: Test Your App
1. Click the URL
2. Go through the questionnaire
3. Test "Escuchar a Río" button

**✅ DONE! Your app is live!**

---

## 🎨 Option 2: Render (Also Easy & Free)

**Time: 4-6 minutes** | **Cost: FREE**

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub

### Step 2: Create Web Service
1. Click "**New +**" → "**Web Service**"
2. Click "**Connect GitHub**" (if not already connected)
3. Find and select: `CACO1972/curso-elerning-`

### Step 3: Configure Service
Fill in these settings:

```
Name: implantx-app
Root Directory: implantx-app
Environment: Node
Region: Oregon (or closest to you)
Branch: claude/implantx-clinical-prediction-01PfvUJq6JfbugbyBykNiJ8f
Build Command: npm install
Start Command: npm start
```

Select: **Free** plan

### Step 4: Add Environment Variables
Scroll down to "**Environment Variables**"

Click "**Add Environment Variable**" twice and add:

```
Key: NODE_ENV
Value: production

Key: OPENAI_API_KEY
Value: [your OpenAI API key]
```

### Step 5: Deploy
1. Click "**Create Web Service**"
2. Wait 3-5 minutes for build to complete
3. You'll get a URL like: `https://implantx-app.onrender.com`

### Step 6: Test
Visit your URL and test the app!

**✅ DONE!**

---

## 💻 Option 3: Heroku (Classic)

**Time: 5-8 minutes** | **Cost: FREE with credit card**

### Prerequisites
Install Heroku CLI:

**macOS:**
```bash
brew tap heroku/brew && brew install heroku
```

**Windows:**
Download from: https://devcenter.heroku.com/articles/heroku-cli

**Linux:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 1: Login
```bash
heroku login
```

### Step 2: Create App
```bash
cd implantx-app
heroku create your-unique-app-name
```

### Step 3: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set OPENAI_API_KEY=your_key_here
```

### Step 4: Deploy
```bash
# From the repository root (curso-elerning-)
cd ..
git push heroku `git subtree split --prefix implantx-app HEAD`:main --force
```

### Step 5: Open App
```bash
heroku open
```

**✅ DONE!**

---

## 🔧 Troubleshooting

### "Application Error"
**Check logs:**
- Railway: Dashboard → Deployments → Logs
- Render: Dashboard → Logs tab
- Heroku: `heroku logs --tail`

### "Río not working"
**Most common causes:**
1. OpenAI API key not set or invalid
2. No billing set up on OpenAI account
3. API quota exceeded

**Fix:**
- Verify key in platform dashboard (Variables/Environment section)
- Check https://platform.openai.com/account/billing
- Add payment method to OpenAI

### "Cannot find module"
**Solution:**
- Make sure `Root Directory` is set to `implantx-app`
- Check build logs to ensure `npm install` ran successfully

### CORS Errors
**Fix:**
Add your domain to `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS=https://your-app.railway.app
```

---

## 📱 After Deployment

### Set Up Custom Domain (Optional)

**Railway:**
1. Settings → Domains → Add Domain
2. Follow DNS instructions

**Render:**
1. Settings → Custom Domains
2. Add your domain
3. Update DNS records

**Heroku:**
```bash
heroku domains:add yourdomain.com
```

### Monitor Your App

**Free monitoring tools:**
- UptimeRobot: https://uptimerobot.com
- Better Uptime: https://betteruptime.com

**Monitor OpenAI usage:**
- https://platform.openai.com/usage
- Set up billing alerts

---

## 💰 Costs

### Platform Costs
- **Railway**: FREE (500 hours/month)
- **Render**: FREE (limited resources)
- **Heroku**: FREE (requires credit card)

### OpenAI Costs (GPT-4o-mini)
- ~$0.00015 per explanation
- 100 explanations ≈ $0.015
- 1,000 explanations ≈ $0.15

**Very affordable!**

---

## ✅ Deployment Checklist

After deploying, verify:

- [ ] App loads successfully
- [ ] Can navigate through all 7 steps
- [ ] Tooth selection works
- [ ] "Calcular resultado" button works
- [ ] Results display correctly
- [ ] "Escuchar a Río" generates AI response
- [ ] Mobile view works properly
- [ ] No console errors in browser
- [ ] Environment variables are set
- [ ] Custom domain configured (if desired)

---

## 🆘 Need Help?

**Contact:**
- WhatsApp: +56 9 3557 2986
- Email: contacto@implantx.ai

**Documentation:**
- Full deployment guide: See `DEPLOYMENT.md`
- Quick start: See `QUICKSTART.md`
- README: See `README.md`

---

**🎉 Ready to deploy? Pick an option above and get started!**

The easiest is Railway - it takes just 3-5 minutes and it's completely free!
