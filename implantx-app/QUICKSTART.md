# 🚀 Quick Start Guide - ImplantX™

Get up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd implantx-app
npm install
```

## Step 2: Set Up Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your OpenAI API key
nano .env  # or use your preferred editor
```

Your `.env` should look like this:
```env
NODE_ENV=development
PORT=3000
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## Step 3: Get OpenAI API Key

1. Visit https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file
5. Set up billing (GPT-4o-mini is very cheap: ~$0.15 per 1000 requests)

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🦜 ImplantX™ Server Running                           ║
║                                                          ║
║   Environment: development                               ║
║   Port: 3000                                            ║
║   URL: http://localhost:3000                            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

## Step 5: Open in Browser

Visit: **http://localhost:3000**

## Testing the Application

1. Fill in the basic data (name, age, gender)
2. Progress through all 7 steps
3. Select some teeth on the grid
4. Click "Calcular resultado"
5. Review your results
6. Click "Escuchar a Río" to get AI explanation

## Development Mode (with auto-reload)

```bash
npm run dev
```

This uses nodemon to automatically restart the server when you make changes.

## Common Issues

### "OPENAI_API_KEY not configured"
- Make sure you created the `.env` file
- Check that your API key is correct
- Ensure there are no extra spaces or quotes

### "Cannot find module 'express'"
- Run `npm install` again
- Make sure you're in the `implantx-app` directory

### "Port 3000 already in use"
- Change the PORT in `.env` to a different number (e.g., 3001)
- Or kill the process using port 3000

### "insufficient_quota" error
- Add billing information to your OpenAI account
- Check your usage limits at https://platform.openai.com/usage

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize the risk calculation logic in `public/js/app.js`
- Modify the styles in `public/css/styles.css`
- Deploy to production (see README.md deployment section)

## Need Help?

- WhatsApp: +56 9 3557 2986
- Email: contacto@implantx.ai

**Happy coding! 🦜**
