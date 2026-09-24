# Registro de Prompts - Proyecto StreamView Analytics

A continuación se detalla el historial de instrucciones (prompts) proporcionados para el desarrollo del proyecto:

**Prompt 1 (Inicio y contexto del proyecto):**
> "revisa C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1; en esa carpeta existe C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1\EP1_Instrucciones y Pauta EP1_Encargo_Estudiante.pdf y C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1\EP2_Instrucciones y Pauta EP2_Presentacion_Estudiante.pdf; ambos archivos son requerimientos y explicaciones del caso. Además, te pasé C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1\Referencias\Levantamiento de requerimientos actualizado.docx.pdf para que lo reescribas en base al caso actual. utilizaremos ese documento como guía para nuestro proyecto (SÓLO EN LAS AREAS EN QUE COINCIDA POR CONTENIDO Y ALCANCE, PRIMANDO LOS PDF)"

**Prompt 2 (Definición del stack tecnológico):**
> "utilizaremos plotly para las visualizaciones (y react, recomiéndame estéticas modernas) y kedro como backend, haremos un monorepo en github."

**Prompt 3 (Diseño de arquitectura de datos):**
> "definamos la estructura del pipeline"

**Prompt 4 (Ajustes de estructura y entorno):**
> "data y notebooks deben ser parte del backend, corrígelo. además, inicializa un entorno virtual en el backend para aislar las dependencias del proyecto mientras trabajes en ello. Utiliza un requirements.txt de kedro. necesitamos una manera de hacer el pipeline reproducible, subimos los datos crudos a github o hay otra manera?"

**Prompt 5 (Decisión sobre el manejo de datos):**
> "la vía académica rápida"

**Prompt 6 (Creación de bitácora):**
> "necesitamos crear en el directorio C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1\Referencias un documento que tenga un log de todos los prompts que te he dado"

**Prompt 7 (Inicio de EDA):**
> "empecemos por el EDA en los notebooks"

**Prompt 8 (Carga de datos):**
> "datos: C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1\Data_Movies.zip"

**Prompt 9 (Construcción del pipeline base):**
> "armemos el pipeline"

**Prompt 10 (Construcción del pipeline Reporting):**
> "crer el pipeline de Reporting"

**Prompt 11 (Inicialización del Frontend):**
> "Pasamos a la carpeta frontend/ e inicializa el proyecto de React + Vite para empezar a maquetar el Dashboard"

**Prompt 12 (Maquetación del Dashboard):**
> "comencemos programando la estructura base del layout (Sidebar y Grid de tarjetas) en App.jsx"

**Prompt 13 (Servicio de datos y Plotly):**
> "Escribe un pequeño "Servicio de Datos" en React que haga un fetch..."

**Prompt 14 (Conexión real con el pipeline):**
> "hardcodeaste los datos? quiero que se obtengan del pipeline"

**Prompt 15 (Reemplazo del gráfico inútil):**
> "con qué propones continuar? aún tenemos el gráfico de crecimiento del catálogo histórico que no aporta valor real..."

**Prompt 16 (Remoción de Placeholders y Navegación):**
> "aún quedan placeholders (filtros avanzados, exportar informe, rentabilidad y audiencia); revisa ademas el documento de requerimientos..."

**Prompt 17 (Refinamiento final de UI/UX):**
> "hay un placeholder: Espacio reservado para el análisis demográfico... los filtros globales no funcionan y la exportación del informe en pdf es feísima..."

**Prompt 18 (Limpieza de UI):**
> "dejaste un ícono de menú sandwich en total títulos en resumen general del dashboard. además, top 5 mundial está en audiencia top y en resumen general, es redundante."

**Prompt 19 (Mapa Coroplético):**
> "podemos agregar un gráfico que muestre la distribución según países de la rentabilidad? quizás usando geopandas? me gustaría uno así en resumen general."

**Prompt 20 (Directores Top en Rentabilidad):**
> "estoy de acuerdo con tu lógica"

**Prompt 21 (Bugfix Parsing JSON de Pandas):**
> "el gráfico directores de myor impacto financiero está vacío."

**Prompt 22 (Refinamiento Estético Gestalt):**
> "quiero que consideres las historias de usuario y requerimientos planteados... paradigmas de la gestalt y la utilización sobria y efectiva de atributos preatentivos para evaluar y mejorar la estética del dashboard"

**Prompt 23 (Redacción Informe Ejecutivo EP1):**
> "redacta el informe ejecutivo con lujo de detalles"

**Prompt 24 (Modo Presentación en React):**
> "no quiero un powerpoint. quiero un html con react. hazlo"

**Prompt 25 (Autoría):**
> "Ahora autoría, somos Martín Papic y Franco Seguel, agrégalo donde sea necesario"

**Prompt 26 (Organización del repositorio y README):**
> "el registro de prompts está actualizado? si es así, guíame sobre como subir el repo a github..."

**Prompt 27 (Atributos Preatentivos y Alineación a Negocio):**
> "colores más sobrios, menos alto contraste... atributos preatentivos (color en barras, tamaño en dispersión)... comunicar la intención con atributos preatentivos y Gestalt con el fin de comprender el comportamiento de sus usuarios y fortalecer la toma de decisiones relacionadas con: Retención, Interacción, Preferencias, Experiencia..."

**Prompt 28 (Paleta Verde/Azul y Rojo como Peligro Preatentivo):**
> "cambia la configuración de colores por una con menos contraste, menos rojo (parece mucho riesgo), prefiere tonos verdes y azules. rojo sólo como atributo preatentivo clave. Además, en el gráfico de barras elimina la linea punteada, deja solo la solida y las barras."

**Prompt 29 (Historias de Usuario, Leyendas y Carga Visual en Dispersión):**
> "en la sección de ROI, el gráfico de dispersión es muy confuso, es posible disminuir la muestra para mejorar la visualización? Además, sitúa leyendas explicativas bajo caada gráfico. Sobre esto, en la presentación del dashboard, las leyendas deben estar relacionadas con las historias de usuario en un storytelling atractivo y efectivo."

**Prompt 30 (Bugfix Sintaxis):**
> "el proyecto muestra un error: plugin:vite:oxc Transform failed... no se inicia la página."

**Prompt 31 (Bugfix Parsing):**
> "el proyecto muestra un error: plugin:vite:oxc... Expected } but found Identifier... no se inicia la página."

**Prompt 32 (Ajuste de Color Coding Cobrizo y Tamaños de Barras):**
> "en el gráfico de la presentación, en el punto 4, y en el dashboard... incluye color coding para el ROI por director. Además, se ve muy pequeño (la leyenda del roi no se alcanza a leer, quisiera que lo expandieras verticalmente, las barras). También quiero color coding para el gráfico de preferencia de consumo de contenido. Ambos los quiero en tonos cobrizos, pero con mucho blanco, ninguno quiero que llegue a rojo."

**Prompt 33 (Ajuste de Grilla Horizontal - Dominancia):**
> "en la pestaña audiencia top, quiero que el gráfico de la derecha sea predominante al ocupar el espacio horizontal."

**Prompt 34 (Mapeo de Atributo de Color a Volumen):**
> "ese mismo gráfico que agrandaste, quiero que el color coding vaya de acuerdo al número de títulos por género"

**Prompt 35 (Corrección de Storytelling - Métricas Inexistentes):**
> "En las conclusiones, mencionas métricas de abandono en rojo, no existen. A cuáles te refieres? conversemos"

**Prompt 36 (Auditoría Final de Trazabilidad):**
> "revisa que el informe esté acorde al dashboard, presentación y EDA (notebook)"

**Prompt 37 (Incorporación de Simbología en Gráficos de Presentación y Dashboard):**
> "en la presentación, falta la simbología de los gráficos"

**Prompt 38 (Declaración de Uso de IA en EDA):**
> "agrega una concisa declaración de uso de IA (antigravity, modelos Gemini 3.8 Flash y Gemini 3.1 Pro) en el EDA (notebook) que declare que se usó IA a lo largo del desarrollo del proyecto y que se adjunta un registro de los prompts"
