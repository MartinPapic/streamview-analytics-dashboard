# Informe Ejecutivo: Proyecto StreamView Analytics

**Asignatura:** Visualización de Datos (ADY1104)
**Evaluación:** Evaluación Parcial EP1 y EP2
**Rol:** Equipo Consultor Especializado en Analítica Visual
**Autores:** Martín Papic y Franco Seguel

---

## 1. Descripción del Problema de Negocio

StreamView Analytics es una plataforma internacional de streaming digital que se enfrenta a un desafío fundamental en la competitiva industria del entretenimiento: comprender a profundidad el comportamiento de sus usuarios y el rendimiento financiero de su catálogo para fortalecer la toma de decisiones estratégicas. 

Actualmente, la organización posee vastos volúmenes de datos corporativos desconectados (reproducciones, presupuestos, ingresos, directores, países). El problema de negocio radica en la **ausencia de una herramienta centralizada y analítica** que permita correlacionar el éxito financiero de las producciones (Retorno de Inversión) con las preferencias y el engagement de la audiencia. Sin esta visión holística, la empresa corre el riesgo de invertir capital en contenidos de alto presupuesto que no generan retención, o ignorar nichos geográficos y demográficos altamente rentables.

## 2. Objetivos del Proyecto

**Objetivo General:**
Diseñar, desarrollar e implementar una solución integral de visualización de datos (Dashboard Interactivo) que consolide las métricas de rendimiento financiero y preferencias de consumo, permitiendo a la alta gerencia de StreamView tomar decisiones informadas sobre adquisición y producción de contenidos.

**Objetivos Específicos:**
1. Integrar y procesar datos crudos históricos mediante pipelines de ingeniería de datos (Kedro) para obtener métricas limpias y calculadas (ROI, promedios de recaudación y popularidad).
2. Explorar las distribuciones de datos para identificar patrones ocultos (relación presupuesto-recaudación, impacto de los directores, distribución geográfica de ingresos).
3. Diseñar una interfaz interactiva y de baja carga cognitiva, utilizando principios de la psicología de la Gestalt, para facilitar el proceso de *Data Storytelling* hacia distintos niveles organizacionales.

## 3. Audiencia Objetivo y Propósito Comunicacional

La solución fue diseñada considerando tres perfiles (Historias de Usuario) que interactuarán con el producto:

1. **Perfil Ejecutivo (Alta Gerencia / CEO):** 
   * *Necesidad:* Monitorear la salud general del negocio con métricas macro (KPIs) y comprender el riesgo financiero de las inversiones.
   * *Propósito Comunicacional:* Proveer una "Visión Estratégica Global" y un "Análisis de Rentabilidad" que les permita responder en segundos si la empresa está ganando dinero y qué factores o directores mitigan el riesgo financiero.
2. **Perfil Analista de Contenido:** 
   * *Necesidad:* Comprender las tendencias de los usuarios, qué consumen y qué retiene su atención.
   * *Propósito Comunicacional:* Exponer de manera detallada (Audiencia Top) los géneros dominantes y los títulos más populares para guiar futuras compras de derechos o producciones originales.
3. **Equipo Consultor (Nosotros):**
   * *Necesidad:* Narrar la historia de los datos de forma fluida.
   * *Propósito Comunicacional:* Servir como soporte de presentación que lleve a los *stakeholders* de lo general (Visión Global) a lo particular (Rentabilidad específica y directores), sin saturarlos visualmente.

## 4. Descripción de las Fuentes de Datos

El proyecto se alimentó de las bases de datos corporativas en formato CSV, alojadas en la capa `01_raw`:
* **`netflix_movies_detailed_up_to_2025.csv`** y **`netflix_tv_shows_detailed_up_to_2025.csv`**: Bases de datos sintéticas balanceadas (16,000 registros totales, 1000 títulos por año de 2010 a 2025).
* **Variables Relevantes utilizadas:**
  * *Financieras:* `budget` (Presupuesto) y `revenue` (Recaudación), utilizadas para calcular el ROI neto `((revenue - budget) / budget)`.
  * *Engagement:* `popularity` y `vote_average` (Calificación media).
  * *Dimensiones Categóricas:* `country` (País de origen), `director` (Director de la obra), `genres` (Etiquetas de género), y `release_year` (Año de estreno).

## 5. Análisis Exploratorio mediante Visualizaciones (EDA)

Durante la fase de exploración (ver notebook `01_EDA_StreamView.ipynb`), se descubrió una anomalía sintética en los datos: la distribución de películas y series por año era idénticamente plana (exactamente 1,000 títulos por año). Esto obligó al equipo consultor a pivotar la estrategia de visualización. En lugar de enfocarnos en "volumen de contenido añadido", lo cual generaría gráficos planos sin valor de negocio, decidimos enfocarnos en el **rendimiento cualitativo y financiero** (Promedios de Popularidad, ROI por país, y Recaudación por Director).

## 6. Justificación de las Representaciones Gráficas Seleccionadas

El diseño del dashboard se basó estrictamente en la aplicación de **Atributos Preatentivos** y **Leyes de la Gestalt**, asegurando un diseño sobrio (`Dark Mode`) y de mínima carga cognitiva:

1. **Tarjetas de KPI (Big Numbers):** Utilizan un tamaño de fuente masivo (`4xl`) para fijar preatentivamente la atención en los macros del negocio antes de pasar al detalle.
2. **Gráfico Mixto de Crecimiento (Bar + Line - *Rendimiento Financiero y Engagement*):** Se utilizó para correlacionar finanzas con popularidad. *Gestalt (Figura-Fondo):* Se asignó el color rojo de la marca a las barras de recaudación (Figura) y un gris pizarra a las líneas de popularidad (Fondo), evitando que compitan por la atención del usuario.
3. **Mapa Coroplético Mundial (*GeoChart*):** Se prefirió por sobre un gráfico de barras geográfico debido a la inmediatez cognitiva que otorga un mapa. *Gestalt (Similitud):* Se utilizó una paleta monocromática térmica (`Reds`), donde el rojo brillante señala de inmediato los países con mayor ROI, disminuyendo la carga de leer los ejes numéricos.
4. **Gráfico de Dispersión / Scatter Plot (*Rentabilidad y Riesgo*):** Cruza el Presupuesto (X) con la Recaudación (Y), coloreado por ROI (`RdYlGn`). *Gestalt (Continuidad y Proximidad):* Se aplicó una opacidad del `70%` a los puntos. En un gráfico con más de 10,000 datos, esto evita una mancha visual incomprensible, permitiendo percibir *clusters* (agrupaciones) de densidad mediante los puntos superpuestos más brillantes.
5. **Gráficos de Barras Horizontales (*Top Directores y Géneros*):** Seleccionados para manejar etiquetas categóricas largas (nombres completos o géneros) sin tener que rotar el texto (lo cual dificulta la lectura y aumenta el esfuerzo cognitivo). 

## 7. Desarrollo de la Narrativa Visual (Data Storytelling)

El dashboard fue orquestado bajo una estructura narrativa en tres actos a través de sus pestañas (menú lateral):

* **Acto 1: El Contexto Macro (Visión Estratégica Global).** El usuario entra y comprende de inmediato el tamaño del catálogo (16,000 títulos), el ROI general, y analiza si, históricamente, el crecimiento de la popularidad se ha traducido en mayor recaudación y dónde está situada esa recaudación en el mapa mundial.
* **Acto 2: El Nudo Financiero (Análisis de Rentabilidad y Riesgo).** Habiendo entendido lo macro, el usuario profundiza en el riesgo. Observa el *Scatter Plot* para entender que mayores presupuestos no siempre garantizan retornos positivos (puntos rojos). Luego, la vista se desplaza hacia abajo al *Gráfico de Directores*, entregando la solución: apostar por directores de alta fiabilidad financiera como Anthony/Joe Russo o James Cameron.
* **Acto 3: El Desenlace Cualitativo (Tendencias de Audiencia).** Finalmente, se analiza al consumidor final. Se expone qué contenido específico aman los usuarios y qué géneros dominan, dando directrices claras para la próxima iteración de producción.

## 8. Diseño e Implementación del Dashboard Interactivo

La solución técnica fue desarrollada utilizando una arquitectura moderna que separa responsabilidades:
* **Backend Analítico (Python / Kedro):** Un pipeline de procesamiento automatizado que extrae la data cruda, la limpia y calcula métricas complejas, exportando archivos JSON ligeros y optimizados hacia la capa `08_reporting`.
* **Frontend Interactivo (React.js + Tailwind CSS):** La interfaz fue desarrollada desde cero, implementando `react-plotly.js` para los gráficos, garantizando responsividad, tooltips interactivos (hover) y escalabilidad. Vite fue utilizado para crear un servidor proxy que consume los JSONs del backend en tiempo real, sin requerir una base de datos pesada (cumpliendo un despliegue MVP ágil).

## 9. Evaluación Crítica de la Solución

* **Fortalezas:** Excelente adherencia a los principios de diseño de información y carga cognitiva. La arquitectura tecnológica (Kedro + React) es de nivel profesional, superando herramientas de arrastrar y soltar (como Power BI estándar), permitiendo personalización pixel-perfect y versionado en Git.
* **Limitaciones:** El dashboard MVP asume un escenario estático; los datos no están conectados aún a un Data Warehouse en tiempo real o streaming (Kafka/Snowflake). Adicionalmente, el dataset sintético presentaba carencias (como la ausencia total del campo `duration` en películas), limitando ciertos cruces demográficos propuestos inicialmente.
* **Oportunidades de Mejora:** Integrar un sistema de Machine Learning que, basándose en la rentabilidad de géneros y directores, recomiende presupuestos máximos sugeridos para nuevos proyectos, evolucionando de una analítica descriptiva a una prescriptiva.

## 10. Conclusiones y Recomendaciones

1. **Apostar por Directores Históricos y Mercados Clave:** Los datos confirman empíricamente que la rentabilidad no está atada exclusivamente a presupuestos masivos, sino al emparejamiento correcto de talentos (ej. James Cameron, Kelsey Mann) con mercados geográficos de alto rendimiento. *Recomendación:* Destinar fondos preferentes a retener talento directivo de alto ROI comprobado.
2. **Dominancia del Formato Serie TV:** Como se observa en los KPIs de la vista macro, las Series de TV lideran el engagement global. *Recomendación:* Priorizar el desarrollo de contenido episódico sobre las películas unitarias de presupuesto medio, ya que las series mantienen al usuario suscrito por períodos más prolongados, reduciendo la tasa de *churn* (deserción).
3. **Escalabilidad de la Solución:** La herramienta desarrollada es completamente modular. *Recomendación:* Una vez validado este MVP por la gerencia, se sugiere integrar APIs de consumo en tiempo real de StreamView para que los tableros se actualicen sin intervención humana, permitiendo un monitoreo táctico diario.
