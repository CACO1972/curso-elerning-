# Crear herramientas y recursos específicos para implementación
import pandas as pd

# Lista de herramientas AI gratuitas y de pago para dentistas
herramientas_ai = {
    'Categoría': [
        'Chatbots', 'Chatbots', 'Chatbots', 'Chatbots',
        'Diagnóstico por Imágenes', 'Diagnóstico por Imágenes', 'Diagnóstico por Imágenes', 'Diagnóstico por Imágenes',
        'Gestión de Práctica', 'Gestión de Práctica', 'Gestión de Práctica', 'Gestión de Práctica',
        'Comunicación Pacientes', 'Comunicación Pacientes', 'Comunicación Pacientes', 'Comunicación Pacientes',
        'Predicción/Planificación', 'Predicción/Planificación', 'Predicción/Planificación', 'Predicción/Planificación'
    ],
    'Herramienta': [
        'ChatGPT + Zapier', 'Botpress', 'Chatfuel', 'ManyChat',
        'VideaHealth', 'Overjet', 'Diagnocat', 'Pearl AI',
        'Denti.AI', 'Denota.AI', 'Oryx Dental', 'Henry Schein One AI',
        'Arini AI', 'Quriobot', 'Teero', 'DentalMonitoring',
        'Implantif.AI', 'Planmeca AI', 'PreVu Dental', 'CITYPRO (personalizado)'
    ],
    'Precio': [
        'Gratis + $20/mes', '$50/mes', 'Gratis + $15/mes', '$15/mes',
        'Consultar', 'Consultar', 'Consultar', 'Consultar',
        'Desde $99/mes', 'Desde $29/mes', 'Consultar', 'Consultar',
        'Desde $200/mes', 'Desde $39/mes', 'Consultar', 'Consultar',
        'Consultar', 'Incluido en software', 'Desde $49/mes', 'Desarrollo personalizado'
    ],
    'Dificultad_Implementación': [
        'Fácil', 'Media', 'Fácil', 'Fácil',
        'Media', 'Media', 'Media', 'Media',
        'Media', 'Fácil', 'Alta', 'Alta',
        'Media', 'Fácil', 'Media', 'Alta',
        'Media', 'Alta', 'Fácil', 'Alta'
    ],
    'Tiempo_Setup': [
        '2-4 horas', '1-2 días', '2-4 horas', '2-4 horas',
        '1-2 semanas', '1-2 semanas', '1-2 semanas', '1-2 semanas',
        '3-5 días', '1-2 horas', '2-4 semanas', '2-4 semanas',
        '1 semana', '2-4 horas', '1 semana', '2-4 semanas',
        '1 semana', 'Incluido', '2-4 horas', '2-6 meses'
    ],
    'Mejor_Para': [
        'Consultorios pequeños', 'Consultorios medianos', 'Inicio rápido', 'Marketing dental',
        'Diagnóstico avanzado', 'Análisis radiográfico', 'Detección temprana', 'Educación paciente',
        'Documentación clínica', 'Notas rápidas', 'Gestión completa', 'Práctica empresarial',
        'Recepción virtual', 'Web básica', 'Comunicación integral', 'Ortodoncia',
        'Identificación implantes', 'Planificación quirúrgica', 'Simulaciones estéticas', 'Apps predictivas personalizadas'
    ]
}

df_herramientas = pd.DataFrame(herramientas_ai)

print("=== HERRAMIENTAS DE IA PARA CONSULTORIOS DENTALES ===")
print("="*60)

# Mostrar por categoría
for categoria in df_herramientas['Categoría'].unique():
    print(f"\n{categoria.upper()}:")
    print("-" * 40)
    cat_data = df_herramientas[df_herramientas['Categoría'] == categoria]
    
    for _, row in cat_data.iterrows():
        print(f"✓ {row['Herramienta']}")
        print(f"  Precio: {row['Precio']}")
        print(f"  Dificultad: {row['Dificultad_Implementación']}")
        print(f"  Setup: {row['Tiempo_Setup']}")
        print(f"  Ideal para: {row['Mejor_Para']}")
        print()

# Crear plan de implementación por fases
fases_implementacion = {
    'Fase': [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4],
    'Nombre_Fase': [
        'Fundamentos y Comunicación', 'Fundamentos y Comunicación', 'Fundamentos y Comunicación',
        'Automatización Básica', 'Automatización Básica', 'Automatización Básica',
        'Diagnóstico Asistido', 'Diagnóstico Asistido', 'Diagnóstico Asistido',
        'Predicción Avanzada', 'Predicción Avanzada', 'Predicción Avanzada'
    ],
    'Acción': [
        'Configurar ChatGPT para consultas básicas', 
        'Implementar chatbot web simple',
        'Capacitar equipo en IA básica',
        'Automatizar recordatorios de citas',
        'Digitalizar formularios pacientes',
        'Configurar respuestas automáticas WhatsApp',
        'Integrar análisis básico de radiografías',
        'Implementar educación automática pacientes',
        'Configurar seguimiento post-tratamiento',
        'Integrar predicción de tratamientos',
        'Implementar planificación quirúrgica IA',
        'Desarrollar métricas y analytics avanzados'
    ],
    'Duración_Semanas': [1, 2, 1, 2, 1, 2, 3, 2, 2, 4, 4, 3],
    'Costo_Estimado_USD': [50, 200, 0, 300, 100, 150, 1500, 500, 300, 2000, 3000, 1000],
    'ROI_Esperado_Mensual': [200, 500, 0, 800, 300, 400, 2000, 1000, 600, 3000, 5000, 2000]
}

df_fases = pd.DataFrame(fases_implementacion)

print("\n" + "="*60)
print("PLAN DE IMPLEMENTACIÓN POR FASES")
print("="*60)

for fase in df_fases['Fase'].unique():
    fase_data = df_fases[df_fases['Fase'] == fase]
    nombre_fase = fase_data.iloc[0]['Nombre_Fase']
    
    print(f"\nFASE {fase}: {nombre_fase}")
    print("-" * 50)
    
    total_tiempo = fase_data['Duración_Semanas'].sum()
    total_costo = fase_data['Costo_Estimado_USD'].sum()
    total_roi = fase_data['ROI_Esperado_Mensual'].sum()
    
    print(f"Duración total: {total_tiempo} semanas")
    print(f"Inversión total: ${total_costo:,} USD")
    print(f"ROI esperado mensual: ${total_roi:,} USD")
    print(f"Payback period: {total_costo/total_roi:.1f} meses")
    print("\nAcciones:")
    
    for _, row in fase_data.iterrows():
        print(f"• {row['Acción']}")
        print(f"  ⏱️ {row['Duración_Semanas']} semanas | 💰 ${row['Costo_Estimado_USD']} | 📈 +${row['ROI_Esperado_Mensual']}/mes")

# Guardar archivos
df_herramientas.to_csv('herramientas_ia_dental.csv', index=False, encoding='utf-8')
df_fases.to_csv('plan_implementacion_fases.csv', index=False, encoding='utf-8')

print(f"\n\nArchivos guardados:")
print("• herramientas_ia_dental.csv")
print("• plan_implementacion_fases.csv")