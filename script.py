# Crear un plan detallado del curso con timeline y contenidos específicos
import pandas as pd

# Estructura detallada del curso
curso_estructura = {
    'Módulo': [
        'Módulo 1', 'Módulo 1', 'Módulo 1', 'Módulo 1',
        'Módulo 2', 'Módulo 2', 'Módulo 2', 'Módulo 2',
        'Módulo 3', 'Módulo 3', 'Módulo 3', 'Módulo 3',
        'Módulo 4', 'Módulo 4', 'Módulo 4', 'Módulo 4',
        'Módulo 5', 'Módulo 5', 'Módulo 5', 'Módulo 5',
        'Módulo 6', 'Módulo 6', 'Módulo 6', 'Módulo 6',
        'Módulo 7', 'Módulo 7', 'Módulo 7', 'Módulo 7',
        'Módulo 8', 'Módulo 8', 'Módulo 8', 'Módulo 8'
    ],
    'Título_Módulo': [
        'Fundamentos de IA para Dentistas', 'Fundamentos de IA para Dentistas', 'Fundamentos de IA para Dentistas', 'Fundamentos de IA para Dentistas',
        'Chatbots para Consultorios', 'Chatbots para Consultorios', 'Chatbots para Consultorios', 'Chatbots para Consultorios',
        'IA en Diagnóstico por Imágenes', 'IA en Diagnóstico por Imágenes', 'IA en Diagnóstico por Imágenes', 'IA en Diagnóstico por Imágenes',
        'Predicción de Tratamientos', 'Predicción de Tratamientos', 'Predicción de Tratamientos', 'Predicción de Tratamientos',
        'Automatización Administrativa', 'Automatización Administrativa', 'Automatización Administrativa', 'Automatización Administrativa',
        'IA en Comunicación con Pacientes', 'IA en Comunicación con Pacientes', 'IA en Comunicación con Pacientes', 'IA en Comunicación con Pacientes',
        'Herramientas Prácticas No-Code', 'Herramientas Prácticas No-Code', 'Herramientas Prácticas No-Code', 'Herramientas Prácticas No-Code',
        'Implementación y Casos Reales', 'Implementación y Casos Reales', 'Implementación y Casos Reales', 'Implementación y Casos Reales'
    ],
    'Lección': [
        'Lección 1.1', 'Lección 1.2', 'Lección 1.3', 'Lección 1.4',
        'Lección 2.1', 'Lección 2.2', 'Lección 2.3', 'Lección 2.4',
        'Lección 3.1', 'Lección 3.2', 'Lección 3.3', 'Lección 3.4',
        'Lección 4.1', 'Lección 4.2', 'Lección 4.3', 'Lección 4.4',
        'Lección 5.1', 'Lección 5.2', 'Lección 5.3', 'Lección 5.4',
        'Lección 6.1', 'Lección 6.2', 'Lección 6.3', 'Lección 6.4',
        'Lección 7.1', 'Lección 7.2', 'Lección 7.3', 'Lección 7.4',
        'Lección 8.1', 'Lección 8.2', 'Lección 8.3', 'Lección 8.4'
    ],
    'Título_Lección': [
        '¿Qué es la IA realmente? Desmitificando conceptos', 'Aplicaciones actuales de IA en odontología global', 'Mitos vs realidad: Lo que sí funciona hoy', 'Primeros pasos: IA sin programar',
        'Configuración de tu primer chatbot dental', 'Respuestas automáticas inteligentes', 'Integración con WhatsApp Business', 'Casos de éxito: Consultorios que ya lo usan',
        'Detección automática de caries en radiografías', 'Análisis de imágenes intraorales con IA', 'Herramientas gratuitas para diagnóstico', 'Taller práctico: Analizando casos reales',
        'Introducción a modelos predictivos dentales', 'IA para predicción de éxito en implantes', 'Planificación ortodóncica inteligente', 'Cirugía guiada por IA',
        'Gestión inteligente de citas y recordatorios', 'Facturación automática y códigos de tratamiento', 'Seguimiento automatizado de pacientes', 'Reportes y analytics para toma de decisiones',
        'Educación personalizada del paciente', 'Recordatorios inteligentes y oportunos', 'Encuestas de satisfacción automatizadas', 'Marketing dirigido basado en IA',
        'ChatGPT para crear contenido dental', 'Plataformas no-code accesibles', 'Implementación paso a paso', 'Configuración y personalización básica',
        'Desarrollando tu plan de implementación', 'Calculando ROI y beneficios esperados', 'Casos de éxito: Antes y después', 'Tu roadmap personal: Próximos pasos'
    ],
    'Duración_Minutos': [
        15, 20, 18, 22,
        25, 30, 28, 20,
        20, 25, 15, 35,
        18, 30, 25, 27,
        20, 25, 22, 18,
        22, 20, 18, 25,
        30, 25, 35, 20,
        25, 20, 30, 15
    ],
    'Tipo_Contenido': [
        'Teoría + Ejemplos', 'Casos de Estudio', 'Análisis Crítico', 'Ejercicio Práctico',
        'Tutorial Paso a Paso', 'Ejercicio Práctico', 'Integración Técnica', 'Casos de Éxito',
        'Demo + Tutorial', 'Ejercicio Práctico', 'Comparativa Herramientas', 'Taller Práctico',
        'Conceptos + Ejemplos', 'Casos Clínicos Reales', 'Software Especializado', 'Planificación Quirúrgica',
        'Configuración Práctica', 'Automatización', 'Flujos de Trabajo', 'Análisis de Datos',
        'Personalización', 'Automatización', 'Feedback Loop', 'Estrategias de Marketing',
        'Herramientas Prácticas', 'Comparativa Plataformas', 'Implementación Real', 'Personalización',
        'Planificación Estratégica', 'Análisis Financiero', 'Testimonios', 'Plan de Acción'
    ],
    'Recursos_Incluidos': [
        'Infografía IA Dental, Checklist conceptos', 'Template análisis casos, Base datos ejemplos', 'Guía mitos vs realidad, Evaluación conocimientos', 'Plantillas configuración, Lista herramientas',
        'Template configuración chatbot, Scripts conversación', 'Banco respuestas automáticas, Ejemplos personalizados', 'Guía integración WhatsApp, APIs conexión', 'Videos testimoniales, Templates éxito',
        'Software gratuito análisis, Casos radiográficos ejemplo', 'App móvil diagnóstico, Template reportes', 'Lista herramientas gratis, Comparativa funcionalidades', 'Casos clínicos reales, Plantillas análisis',
        'Introducción modelos predictivos, Calculadoras riesgo', 'Software predicción implantes, Casos clínicos', 'Planificadores ortodóncicos, Simuladores', 'Guías cirugía digital, Casos complejos',
        'Configuradores citas automáticas, Templates recordatorios', 'Sistemas facturación IA, Códigos automatizados', 'CRM automatizado, Flujos seguimiento', 'Dashboards analytics, Templates reportes',
        'Generadores contenido educativo, Plantillas paciente', 'Sistemas recordatorios inteligentes, Calendarios automáticos', 'Plataformas encuestas IA, Templates satisfacción', 'Herramientas marketing IA, Casos segmentación',
        'Prompts ChatGPT dentales, Templates contenido', 'Lista plataformas no-code, Comparativas precios', 'Guías implementación paso a paso, Checklists', 'Configuradores personalizados, Templates setup',
        'Template plan implementación, Cronogramas', 'Calculadora ROI dental, Métricas éxito', 'Videos testimoniales, Estudios casos', 'Plan acción personalizado, Recursos continuos'
    ]
}

# Crear DataFrame
df_curso = pd.DataFrame(curso_estructura)

# Calcular estadísticas del curso
total_lecciones = len(df_curso)
duracion_total_horas = df_curso['Duración_Minutos'].sum() / 60
duracion_promedio = df_curso['Duración_Minutos'].mean()

print("=== CURSO: APLICACIONES PRÁCTICAS DE IA EN ODONTOLOGÍA ===")
print(f"Total de lecciones: {total_lecciones}")
print(f"Duración total: {duracion_total_horas:.1f} horas")
print(f"Duración promedio por lección: {duracion_promedio:.1f} minutos")
print(f"Módulos: 8 módulos temáticos")
print("\n" + "="*60 + "\n")

# Mostrar resumen por módulos
print("RESUMEN POR MÓDULOS:")
print("="*60)
modulo_summary = df_curso.groupby('Título_Módulo').agg({
    'Duración_Minutos': ['count', 'sum', 'mean']
}).round(1)

modulo_summary.columns = ['Lecciones', 'Duración_Total_Min', 'Duración_Promedio_Min']
modulo_summary['Duración_Horas'] = (modulo_summary['Duración_Total_Min'] / 60).round(1)

for idx, (modulo, data) in enumerate(modulo_summary.iterrows(), 1):
    print(f"Módulo {idx}: {modulo}")
    print(f"  - Lecciones: {int(data['Lecciones'])}")
    print(f"  - Duración: {data['Duración_Horas']} horas ({int(data['Duración_Total_Min'])} min)")
    print(f"  - Promedio por lección: {data['Duración_Promedio_Min']:.1f} min")
    print()

# Guardar el curso completo en CSV
df_curso.to_csv('curso_ia_odontologia_completo.csv', index=False, encoding='utf-8')
print("Archivo 'curso_ia_odontologia_completo.csv' guardado exitosamente.")