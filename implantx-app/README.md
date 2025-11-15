# 🦜 ImplantX™ - Clinical Prediction Tool

![ImplantX](https://img.shields.io/badge/ImplantX-Clinical%20Prediction-0ea5e9)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/license-MIT-blue)

**ImplantX™** is an interactive clinical prediction tool for dental implants that helps assess success probability based on key risk factors. The application features "Río," an AI-powered assistant that provides personalized explanations in simple language.

> ⚠️ **Important**: This is a demo/educational tool. Results are orientative and **do not replace professional clinical diagnosis**.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Security Considerations](#-security-considerations)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Clinical Assessment
- **Multi-step questionnaire** covering:
  - Basic demographic data (age, gender, name)
  - Smoking habits
  - Bruxism and treatment status
  - Diabetes and metabolic control
  - Periodontal history and hygiene
  - Dental pieces selection (32-tooth grid)

### Risk Calculation
- **ImplantX Score**: Success probability (5-98%)
- **DensityPro™**: Bone density risk assessment
- **Factor Analysis**: Identifies specific risk factors with impact levels
- **Causal Explanations**: Evidence-based rationale for each factor

### AI Assistant - Río 🦜
- **Personalized explanations** powered by ChatGPT (GPT-4o-mini)
- **Simple language** interpretation of results
- **Action plan** with practical, achievable recommendations
- **Empathetic communication** tailored to patient context

### User Experience
- **Responsive design** - works on mobile, tablet, and desktop
- **Progress tracking** with visual progress bar
- **Accessibility features** (ARIA labels, keyboard navigation)
- **Print-friendly** results page

---

## 🛠 Technology Stack

### Frontend
- **HTML5** with semantic markup
- **CSS3** with custom properties and Tailwind utility classes
- **Vanilla JavaScript** (ES6+) - no framework dependencies
- **Tailwind CSS** (CDN) for rapid styling

### Backend
- **Node.js** (v18+)
- **Express.js** - Web server framework
- **OpenAI API** - GPT-4o-mini for Río explanations
- **dotenv** - Environment configuration
- **helmet** - Security headers
- **express-rate-limit** - API rate limiting
- **cors** - Cross-origin resource sharing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

To check your versions:

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/implantx-app.git
cd implantx-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
NODE_ENV=development
PORT=3000
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

> 🔐 **Security Note**: Never commit your `.env` file to version control. It's already in `.gitignore`.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | `development` | Environment mode (`development` or `production`) |
| `PORT` | No | `3000` | Server port number |
| `OPENAI_API_KEY` | **Yes** | - | Your OpenAI API key for Río explanations |
| `ALLOWED_ORIGINS` | No | `*` | Comma-separated list of allowed CORS origins (production only) |

### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **Create new secret key**
5. Copy the key and paste it in your `.env` file
6. Add billing information to your OpenAI account

> 💰 **Cost**: GPT-4o-mini is very affordable (~$0.00015 per request for typical usage)

---

## 🎯 Usage

### Development Mode

Start the server with auto-reload (requires `nodemon`):

```bash
npm run dev
```

### Production Mode

Start the server normally:

```bash
npm start
```

### Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

### Using the Application

1. **Start the questionnaire** - Enter your basic information
2. **Answer each step** - Progress through the risk assessment
3. **Review your data** - Check the summary before calculating
4. **Calculate results** - Get your ImplantX and DensityPro scores
5. **Read factors** - Understand what influences your result
6. **Ask Río** - Get a personalized AI explanation

---

## 📁 Project Structure

```
implantx-app/
├── public/                 # Frontend files (served statically)
│   ├── css/
│   │   └── styles.css     # Custom styles
│   ├── js/
│   │   └── app.js         # Main application logic
│   ├── images/            # Images and assets
│   └── index.html         # Main HTML file
│
├── server/                # Backend files
│   └── index.js          # Express server + API routes
│
├── docs/                 # Documentation (optional)
│
├── .env.example          # Example environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Node.js dependencies and scripts
└── README.md           # This file
```

---

## 📡 API Documentation

### Health Check

**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-15T12:34:56.789Z",
  "environment": "development"
}
```

### Río Explanation

**Endpoint**: `POST /api/rio/explain`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Ana",
  "age": "52",
  "gender": "f",
  "smoking": "no",
  "bruxism": "yes",
  "bruxismTx": "yes",
  "diabetes": "no",
  "diabetesControl": "",
  "lossCause": "periodontitis",
  "gumsBleed": "sometimes",
  "hygienePerDay": "2",
  "selectedTeeth": [14, 15, 16],
  "implantxScore": 82,
  "implantxBand": "Medio",
  "densityScore": 23,
  "densityBand": "Bajo riesgo"
}
```

**Success Response** (200):
```json
{
  "explanation": "Hola Ana, gracias por completar el cuestionario...",
  "timestamp": "2025-11-15T12:34:56.789Z"
}
```

**Error Responses**:

- `400 Bad Request` - Missing required fields
- `429 Too Many Requests` - Rate limit exceeded (max 10 requests per 15 minutes)
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - OpenAI API issue

### Rate Limiting

All `/api/*` endpoints are rate-limited:
- **Window**: 15 minutes
- **Max requests**: 10 per IP
- **Response header**: `X-RateLimit-*`

---

## 🌐 Deployment

### Deploying to Production

1. **Set environment to production**:
   ```env
   NODE_ENV=production
   PORT=3000
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

2. **Build/prepare assets** (if needed)

3. **Start with process manager**:
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start server/index.js --name implantx
   pm2 startup
   pm2 save
   ```

### Recommended Platforms

- **Heroku**: Easy deployment with Git push
- **Railway**: Modern platform with auto-scaling
- **DigitalOcean**: VPS with full control
- **AWS EC2**: Enterprise-grade infrastructure
- **Vercel/Netlify**: Requires serverless adaptation

### Nginx Reverse Proxy (Optional)

If deploying on a VPS with Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 Security Considerations

### Implemented Security Features

- ✅ **Helmet.js** - Security headers (CSP, XSS protection, etc.)
- ✅ **Rate limiting** - Prevents abuse of API endpoints
- ✅ **CORS configuration** - Restricts cross-origin requests
- ✅ **Input validation** - Validates request data
- ✅ **Environment variables** - Secrets not hardcoded
- ✅ **Error handling** - Doesn't leak sensitive information

### Best Practices

1. **Never commit `.env` file** to version control
2. **Use HTTPS in production** (TLS/SSL certificate)
3. **Rotate API keys** regularly
4. **Monitor API usage** in OpenAI dashboard
5. **Set billing limits** in OpenAI to prevent unexpected charges
6. **Keep dependencies updated**: `npm audit` and `npm update`
7. **Use strong CSP headers** in production

### GDPR Compliance

If handling EU patient data:
- Implement consent mechanisms
- Add privacy policy
- Ensure data minimization
- Allow data deletion requests
- Log access and changes

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style

- Use **ES6+** syntax
- Follow **ESLint** rules (if configured)
- Add **comments** for complex logic
- Write **descriptive commit messages**

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 ImplantX Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

For questions, issues, or feature requests:

- **WhatsApp**: [+56 9 3557 2986](https://wa.me/56935572986)
- **Email**: contacto@implantx.ai
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/implantx-app/issues)

---

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT-4o-mini API
- **Tailwind CSS** for the utility-first CSS framework
- **Express.js** community for excellent documentation
- All contributors and testers

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] PDF report generation
- [ ] Multi-language support (English, Portuguese)
- [ ] Email results to patient
- [ ] Enhanced DensityPro questionnaire
- [ ] Admin dashboard for clinics
- [ ] Database integration for result storage
- [ ] Advanced analytics and trends
- [ ] White-label customization for clinics

---

**Made with ❤️ for the dental community**

*ImplantX™ - Empowering informed decisions in implant dentistry*
