/**
 * ImplantX™ Backend Server
 * Handles ChatGPT API integration for Río explanations
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');
const path = require('path');

// ==========================================
// CONFIGURATION
// ==========================================

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ==========================================
// MIDDLEWARE
// ==========================================

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || []
    : '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    error: 'Demasiadas solicitudes. Por favor, intenta nuevamente más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Request logging (development only)
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ==========================================
// ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Río Explanation Endpoint
app.post('/api/rio/explain', async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      smoking,
      bruxism,
      bruxismTx,
      diabetes,
      diabetesControl,
      lossCause,
      gumsBleed,
      hygienePerDay,
      selectedTeeth,
      implantxScore,
      implantxBand,
      densityScore,
      densityBand,
    } = req.body;

    // Validate required fields
    if (!implantxScore || !implantxBand) {
      return res.status(400).json({
        error: 'Faltan datos requeridos para generar la explicación.',
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured');
      return res.status(503).json({
        error: 'El servicio de explicaciones no está configurado. Contacta al administrador.',
      });
    }

    // Build user prompt
    const patientData = {
      name: name || 'Paciente',
      age: age || 'No especificado',
      gender: formatGender(gender),
      smoking: formatSmoking(smoking),
      bruxism: formatBruxism(bruxism, bruxismTx),
      diabetes: formatDiabetes(diabetes, diabetesControl),
      lossCause: formatLossCause(lossCause),
      gumsBleed: formatGumsBleed(gumsBleed),
      hygienePerDay: hygienePerDay || 'No especificado',
      selectedTeethCount: selectedTeeth?.length || 0,
      implantxScore,
      implantxBand,
      densityScore,
      densityBand,
    };

    const userPrompt = buildUserPrompt(patientData);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(),
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const explanation = completion.choices[0]?.message?.content;

    if (!explanation) {
      throw new Error('No se recibió explicación de la API');
    }

    res.json({
      explanation,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in /api/rio/explain:', error);

    // Handle OpenAI specific errors
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({
        error: 'El servicio está temporalmente no disponible. Por favor, intenta más tarde.',
      });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(503).json({
        error: 'Error de configuración del servicio. Contacta al administrador.',
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Ocurrió un error al generar la explicación. Por favor, intenta nuevamente.',
    });
  }
});

// Catch-all route - serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function buildSystemPrompt() {
  return `Eres Río, un asistente clínico conversacional del sistema ImplantX™.

Tu personalidad:
- Cálido, empático y profesional
- Experto en implantología oral
- Te comunicas de forma clara y accesible, sin tecnicismos innecesarios
- Enfocado en educar y empoderar al paciente

Tus responsabilidades:
1. Explicar los resultados del análisis de riesgo en lenguaje simple
2. Identificar los factores más relevantes que afectan el pronóstico
3. Sugerir acciones concretas y realistas que el paciente puede tomar
4. SIEMPRE aclarar que este es un análisis orientativo, no un diagnóstico
5. NUNCA dar garantías absolutas sobre el éxito del tratamiento
6. Recomendar consulta con profesional para evaluación completa

Estructura tu respuesta:
1. Saludo personalizado y contexto general del resultado
2. Explicación clara del puntaje ImplantX y DensityPro
3. Factores específicos que influyen en este caso particular
4. 3-5 acciones concretas que puede tomar el paciente
5. Mensaje de cierre motivador pero realista

Límites importantes:
- No des diagnósticos médicos
- No recomiendes medicamentos específicos
- No prometas resultados garantizados
- Siempre deriva a profesional para decisiones finales`;
}

function buildUserPrompt(data) {
  return `El paciente "${data.name}" completó el cuestionario de riesgo ImplantX™ con los siguientes datos:

DATOS DEMOGRÁFICOS:
- Edad: ${data.age} años
- Género: ${data.gender}

FACTORES DE RIESGO:
- Tabaquismo: ${data.smoking}
- Bruxismo: ${data.bruxism}
- Diabetes: ${data.diabetes}
- Causa de pérdida dental: ${data.lossCause}
- Sangrado gingival: ${data.gumsBleed}
- Higiene oral (cepillados/día): ${data.hygienePerDay}
- Piezas a reemplazar: ${data.selectedTeethCount}

RESULTADOS:
- ImplantX Score: ${data.implantxScore}% (${data.implantxBand})
- DensityPro Score: ${data.densityScore}% (${data.densityBand})

Genera una explicación personalizada, empática y práctica para ${data.name}. Explica:
1. Qué significan estos resultados
2. Qué factores influyen más en su caso específico
3. Qué acciones concretas puede tomar para mejorar su pronóstico

Mantén un tono conversacional y cercano. Máximo 400 palabras.`;
}

function formatGender(g) {
  const map = { f: 'Mujer', m: 'Hombre', o: 'Otro' };
  return map[g] || 'No especificado';
}

function formatSmoking(s) {
  const map = {
    no: 'No fuma',
    '<10': 'Menos de 10 cigarrillos/día',
    '10-20': '10-20 cigarrillos/día',
    '>20': 'Más de 20 cigarrillos/día',
  };
  return map[s] || 'No especificado';
}

function formatBruxism(brux, tx) {
  if (brux === 'yes') {
    return tx === 'yes' ? 'Sí, con tratamiento (férula)' : 'Sí, sin tratamiento';
  }
  return 'No';
}

function formatDiabetes(dm, control) {
  if (dm === 'yes') {
    const controlText =
      control === 'controlled'
        ? 'controlada'
        : control === 'uncontrolled'
        ? 'no controlada'
        : 'control no especificado';
    return `Sí, ${controlText}`;
  }
  return 'No';
}

function formatLossCause(cause) {
  const map = {
    caries: 'Caries',
    periodontitis: 'Enfermedad periodontal',
    trauma: 'Trauma/golpe',
    otra: 'Otra causa',
  };
  return map[cause] || 'No especificado';
}

function formatGumsBleed(bleed) {
  const map = {
    no: 'No sangran',
    sometimes: 'Sangran a veces',
    often: 'Sangran frecuentemente',
  };
  return map[bleed] || 'No especificado';
}

// ==========================================
// ERROR HANDLING
// ==========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🦜 ImplantX™ Server Running                           ║
║                                                          ║
║   Environment: ${NODE_ENV.padEnd(42)}║
║   Port: ${String(PORT).padEnd(48)}║
║   URL: http://localhost:${PORT}                         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);

  if (!process.env.OPENAI_API_KEY) {
    console.warn(`
⚠️  WARNING: OPENAI_API_KEY not configured!
   Río explanations will not work until you set this in .env
    `);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  process.exit(0);
});
