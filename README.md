# StreamView Analytics Dashboard

Este proyecto es la solución desarrollada para la Evaluación Parcial 1 y 2 (EP1 / EP2) de la asignatura **Visualización de Datos** por el equipo consultor conformado por **Martín Papic** y **Franco Seguel**.

## 📌 Descripción del Proyecto

StreamView Analytics es una plataforma interactiva de inteligencia de negocios diseñada para analizar la rentabilidad financiera y las tendencias de la audiencia de un catálogo de más de 16,000 títulos. El proyecto se basa en una arquitectura dual:

1. **Backend (Kedro & Python):** Procesa datos crudos, ejecuta cálculos de negocio (ROI, promedios) y exporta resultados estáticos a la capa `08_reporting`.
2. **Frontend (React.js & Plotly):** Interfaz gráfica interactiva y de baja carga cognitiva, con un modo de presentación (Slides) incorporado para la defensa técnica.

## 📂 Estructura de Directorios

- `/entregables/`: Contiene toda la documentación académica requerida (Informe Ejecutivo y Registro de Prompts de IA).
- `/backend/`: Pipeline de datos construido con Kedro. 
  - `data/01_raw/`: Bases de datos sintéticas originales.
  - `data/08_reporting/`: Archivos JSON consumidos por el dashboard.
- `/frontend/`: Código fuente de la aplicación React.

## 🚀 Cómo Ejecutar el Proyecto Localmente

### Prerrequisitos
- **Node.js** (v18+)
- **Python** (3.10+)

### 1. Iniciar el Servidor de React (Frontend)
El frontend está configurado para leer los JSONs directamente desde la carpeta del backend.
```bash
cd frontend
npm install
npm run dev
```
Luego, abre tu navegador en `http://localhost:5173`.

### 2. Recalcular Datos en Kedro (Opcional - Backend)
Si deseas modificar la lógica analítica de los datos, debes re-ejecutar el pipeline de Kedro:
```bash
cd backend
python -m venv .venv
# Activar entorno (En Windows: .venv\Scripts\activate | En Mac/Linux: source .venv/bin/activate)
pip install -r src/requirements.txt
kedro run --pipeline=reporting
```

## 🤖 Uso de IA Generativa
El desarrollo de este proyecto fue asistido por Inteligencia Artificial Generativa. Todo el historial y justificación de estas interacciones se encuentra documentado en:
📁 `entregables/registro_prompts.md`

> **NOTA IMPORTANTE PARA LOS AUTORES:** Este documento de registro de prompts **debe seguir complementándose** obligatoriamente si ocurren nuevas interacciones con IA generativa (por ejemplo, durante ajustes futuros, preparación de la defensa oral, etc.), hasta la entrega final del proyecto.

## 🧑‍💻 Autores
- **Martín Papic**
- **Franco Seguel**
