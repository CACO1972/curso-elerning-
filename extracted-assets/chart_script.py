import plotly.graph_objects as go
import plotly.express as px
import numpy as np
import pandas as pd

# Course data
course_data = {
    "course_title": "Aplicaciones Prácticas de IA en Odontología",
    "modules": [
        {"module": "Módulo 1: Fundamentos de IA para Dentistas", "subtopics": ["¿Qué es la IA realmente?", "Aplicaciones actuales en odontología", "Mitos vs realidad", "Primeros pasos sin código"]},
        {"module": "Módulo 2: Chatbots para Consultorios", "subtopics": ["Configuración básica", "Respuestas automáticas", "Integración WhatsApp", "Cases de éxito"]},
        {"module": "Módulo 3: IA en Diagnóstico por Imágenes", "subtopics": ["Detección de caries", "Análisis de radiografías", "Herramientas gratuitas", "Casos prácticos"]},
        {"module": "Módulo 4: Predicción de Tratamientos", "subtopics": ["Modelos predictivos", "Implantes dentales", "Ortodoncia", "Planificación quirúrgica"]},
        {"module": "Módulo 5: Automatización Administrativa", "subtopics": ["Gestión de citas", "Facturación inteligente", "Seguimiento pacientes", "Reportes automáticos"]},
        {"module": "Módulo 6: IA en Comunicación con Pacientes", "subtopics": ["Educación personalizada", "Recordatorios inteligentes", "Encuestas automatizadas", "Marketing dirigido"]},
        {"module": "Módulo 7: Herramientas Prácticas No-Code", "subtopics": ["ChatGPT para dentistas", "Plataformas accesibles", "Implementación paso a paso", "Configuración básica"]},
        {"module": "Módulo 8: Implementación y Casos Reales", "subtopics": ["Plan de implementación", "ROI y beneficios", "Casos de éxito", "Próximos pasos"]}
    ]
}

# Brand colors
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F', '#D2BA4C', '#B4413C', '#964325', '#944454']

# Content type icons
def get_content_icon(subtopic):
    subtopic_lower = subtopic.lower()
    if any(word in subtopic_lower for word in ['práctico', 'ejercicio', 'configuración', 'implementación', 'paso a paso']):
        return '💻'
    elif any(word in subtopic_lower for word in ['herramienta', 'plataforma', 'chatgpt', 'gratuitas']):
        return '🛠️'
    elif any(word in subtopic_lower for word in ['caso', 'éxito', 'estudio']):
        return '📋'
    else:
        return '📚'

# Function to abbreviate module names properly
def abbreviate_module(module_text):
    # Remove "Módulo X: " and keep the main title
    parts = module_text.split(': ', 1)
    if len(parts) > 1:
        number = parts[0].replace('Módulo ', 'M')
        title = parts[1]
        # Abbreviate common words
        title = title.replace('Fundamentos de IA para Dentistas', 'Fundamentos IA')
        title = title.replace('Chatbots para Consultorios', 'Chatbots')
        title = title.replace('IA en Diagnóstico por Imágenes', 'Diagnóstico IA')
        title = title.replace('Predicción de Tratamientos', 'Predicción')
        title = title.replace('Automatización Administrativa', 'Automatización')
        title = title.replace('IA en Comunicación con Pacientes', 'Comunicación IA')
        title = title.replace('Herramientas Prácticas No-Code', 'Herramientas')
        title = title.replace('Implementación y Casos Reales', 'Implementación')
        return f"{number}:<br>{title}"
    return module_text

# Create figure
fig = go.Figure()

# Central hub
center_x, center_y = 0, 0
fig.add_trace(go.Scatter(
    x=[center_x], y=[center_y],
    mode='markers+text',
    marker=dict(size=120, color='#13343B', line=dict(width=4, color='white')),
    text=['IA en<br>Odontología'],
    textposition='middle center',
    textfont=dict(size=18, color='white', family='Arial Black'),
    showlegend=False,
    hovertemplate='<b>Aplicaciones Prácticas de IA en Odontología</b><extra></extra>'
))

# Calculate positions for modules with increased spacing
n_modules = len(course_data['modules'])
module_radius = 5  # Further increased radius
angles = np.linspace(0, 2*np.pi, n_modules, endpoint=False)

# Add modules and their connections
for i, (angle, module_data) in enumerate(zip(angles, course_data['modules'])):
    module_x = center_x + module_radius * np.cos(angle)
    module_y = center_y + module_radius * np.sin(angle)
    
    # Connection line from center to module
    fig.add_trace(go.Scatter(
        x=[center_x, module_x], y=[center_y, module_y],
        mode='lines',
        line=dict(color=colors[i], width=5),
        showlegend=False,
        hoverinfo='skip'
    ))
    
    # Module name with better abbreviation
    module_name = abbreviate_module(module_data['module'])
    
    # Module node
    fig.add_trace(go.Scatter(
        x=[module_x], y=[module_y],
        mode='markers+text',
        marker=dict(size=80, color=colors[i], line=dict(width=3, color='white')),
        text=[module_name],
        textposition='middle center',
        textfont=dict(size=12, color='white', family='Arial'),
        showlegend=False,
        hovertemplate=f'<b>{module_data["module"]}</b><extra></extra>'
    ))
    
    # Add subtopics with much better spacing
    subtopic_radius = 3.0  # Increased spacing
    n_subtopics = len(module_data['subtopics'])
    
    # Calculate positions in a fan pattern around each module
    fan_angle = np.pi / 2  # 90 degree fan
    start_angle = angle - fan_angle / 2
    end_angle = angle + fan_angle / 2
    
    if n_subtopics == 1:
        subtopic_angles = [angle]
    else:
        subtopic_angles = np.linspace(start_angle, end_angle, n_subtopics)
    
    for j, (sub_angle, subtopic) in enumerate(zip(subtopic_angles, module_data['subtopics'])):
        # Position subtopics
        sub_x = module_x + subtopic_radius * np.cos(sub_angle)
        sub_y = module_y + subtopic_radius * np.sin(sub_angle)
        
        # Connection line
        fig.add_trace(go.Scatter(
            x=[module_x, sub_x], y=[module_y, sub_y],
            mode='lines',
            line=dict(color=colors[i], width=2, dash='dot'),
            showlegend=False,
            hoverinfo='skip'
        ))
        
        # Get icon
        icon = get_content_icon(subtopic)
        
        # Subtopic node - larger and clearer
        fig.add_trace(go.Scatter(
            x=[sub_x], y=[sub_y],
            mode='markers+text',
            marker=dict(size=40, color=colors[i], opacity=0.9, line=dict(width=2, color='white')),
            text=[icon],
            textposition='middle center',
            textfont=dict(size=18),
            showlegend=False,
            hovertemplate=f'<b>{subtopic}</b><br>Tipo: {icon}<extra></extra>'
        ))

# Add legend in top right corner
legend_x_start = 7
legend_y_start = 7
legend_items = [
    {'icon': '📚', 'label': 'Teoría'},
    {'icon': '💻', 'label': 'Prácticos'},
    {'icon': '🛠️', 'label': 'Herramientas'},
    {'icon': '📋', 'label': 'Casos'}
]

# Legend background box
fig.add_shape(
    type="rect",
    x0=6.5, y0=4.5, x1=9.5, y1=7.5,
    line=dict(color="gray", width=1),
    fillcolor="rgba(255,255,255,0.9)"
)

# Legend title
fig.add_trace(go.Scatter(
    x=[legend_x_start], y=[legend_y_start],
    mode='text',
    text=['Tipos de Contenido'],
    textposition='middle left',
    textfont=dict(size=14, color='black', family='Arial Black'),
    showlegend=False,
    hoverinfo='skip'
))

# Legend items
for i, item in enumerate(legend_items):
    y_pos = legend_y_start - 0.7 - (i * 0.6)
    
    # Icon
    fig.add_trace(go.Scatter(
        x=[legend_x_start], y=[y_pos],
        mode='text',
        text=[item['icon']],
        textposition='middle center',
        textfont=dict(size=16),
        showlegend=False,
        hoverinfo='skip'
    ))
    
    # Label
    fig.add_trace(go.Scatter(
        x=[legend_x_start + 0.7], y=[y_pos],
        mode='text',
        text=[item['label']],
        textposition='middle left',
        textfont=dict(size=12, color='black'),
        showlegend=False,
        hoverinfo='skip'
    ))

# Update layout
fig.update_layout(
    title=dict(
        text='IA en Odontología: Estructura del Curso',
        x=0.5,
        y=0.95,
        font=dict(size=22, family='Arial Black')
    ),
    showlegend=False,
    plot_bgcolor='rgba(250,250,250,0.5)',
    paper_bgcolor='white',
    xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
    yaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
    font=dict(size=12, family='Arial')
)

# Set proper range to accommodate all elements
fig.update_xaxes(range=[-9, 10])
fig.update_yaxes(range=[-9, 8])

fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image('ia_odontologia_mindmap.png', width=1500, height=1300)