const dataGovernanceTopics = {
    "calidad de datos": {
        "definition": "La calidad de los datos se refiere al estado de las piezas de información cualitativas o cuantitativas. Existen muchas definiciones de calidad de datos, pero generalmente se considera que los datos son de alta calidad si son 'aptos para sus usos previstos en operaciones, toma de decisiones y planificación'.",
        "dimensions": ["Precisión", "Integridad", "Consistencia", "Puntualidad", "Unicidad", "Validez"]
    },
    "linaje de datos": {
        "definition": "El linaje de datos incluye los orígenes de los datos, lo que les sucede y hacia dónde se mueven con el tiempo. El linaje de datos es el proceso de comprender, registrar y visualizar los datos a medida que fluyen desde las fuentes de datos hasta el consumo.",
        "importance": "El linaje de datos es importante para el análisis de la causa raíz, el análisis de impacto y el cumplimiento normativo."
    },
    "gobernanza de datos": {
        "definition": "La gobernanza de datos es el proceso de gestionar la disponibilidad, usabilidad, integridad y seguridad de los datos en los sistemas empresariales, basándose en estándares y políticas de datos internos que también controlan el uso de los datos.",
        "goals": ["Mejorar la calidad de los datos", "Garantizar la seguridad y privacidad de los datos", "Promover la alfabetización de datos", "Permitir una mejor toma de decisiones"]
    },
    "dama-dmbok": {
        "definition": "El DAMA-DMBOK (Cuerpo de Conocimiento de Gestión de Datos) es un marco que proporciona una visión general completa del campo de la gestión de datos. Es una referencia para los profesionales de la gestión de datos, que proporciona un vocabulario estándar y un enfoque estructurado para la gestión de datos.",
        "knowledge_areas": ["Gobernanza de Datos", "Arquitectura de Datos", "Modelado y Diseño de Datos", "Almacenamiento y Operaciones de Datos", "Seguridad de Datos", "Integración e Interoperabilidad de Datos", "Gestión de Documentos y Contenido", "Datos de Referencia y Maestros", "Almacenamiento de Datos e Inteligencia de Negocios", "Gestión de Metadatos", "Calidad de Datos"]
    },
    "dcam": {
        "definition": "El DCAM (Modelo de Evaluación de la Capacidad de Gestión de Datos) es un marco que ayuda a las organizaciones a evaluar sus capacidades de gestión de datos. Proporciona un enfoque estructurado para identificar fortalezas y debilidades en las prácticas de gestión de datos.",
        "components": ["Estrategia y Caso de Negocio", "Gobernanza de Datos", "Calidad de Datos", "Operaciones de Datos", "Plataforma y Arquitectura", "Capacidades de Soporte"]
    },
    "cobit": {
        "definition": "COBIT (Objetivos de Control para la Información y Tecnologías Relacionadas) es un marco para el gobierno y la gestión de las TI empresariales. Proporciona un conjunto de buenas prácticas para la gestión y el gobierno de las TI, y puede utilizarse para apoyar las iniciativas de gobernanza de datos.",
        "principles": ["Satisfacer las Necesidades de las Partes Interesadas", "Cubrir la Empresa de Extremo a Extremo", "Aplicar un Marco Único e Integrado", "Permitir un Enfoque Holístico", "Separar el Gobierno de la Gestión"]
    },
    "ciclo de vida de los datos": {
        "definition": "El ciclo de vida de los datos describe las etapas por las que pasa una pieza de datos en particular desde su generación o captura inicial hasta su eventual archivo o eliminación.",
        "diagram": "<div class=\"mermaid\">graph TD; A[Creación] --> B(Almacenamiento); B --> C{Uso}; C --> D[Archivo]; C --> E[Eliminación];</div>"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    let userName = '';

    appendMessage('Bot', '¡Hola! ¿Cuál es tu nombre?');

    function sendMessage() {
        const message = userInput.value.trim().toLowerCase();
        if (message) {
            appendMessage('Tú', message);
            userInput.value = '';

            if (!userName) {
                if (message.startsWith("mi nombre es")) {
                    userName = message.substring(11);
                    appendMessage('Bot', `¡Hola ${userName}! ¿Cómo puedo ayudarte hoy?`);
                } else {
                    userName = message;
                    appendMessage('Bot', `¡Hola ${userName}! ¿Cómo puedo ayudarte hoy?`);
                }
            } else {
                let botResponse = "Lo siento, no entiendo. ¿Puedes reformular tu pregunta? Intenta preguntar sobre calidad de datos, linaje de datos o gobernanza de datos.";
                for (const keyword in dataGovernanceTopics) {
                    if (message.includes(keyword)) {
                        const topic = dataGovernanceTopics[keyword];
                        let response = `<strong>${keyword.toUpperCase()}</strong><br>${topic.definition}`;
                        if (topic.dimensions) {
                            response += `<br><strong>Dimensiones:</strong> ${topic.dimensions.join(', ')}`;
                        }
                        if (topic.importance) {
                            response += `<br><strong>Importancia:</strong> ${topic.importance}`;
                        }
                        if (topic.goals) {
                            response += `<br><strong>Metas:</strong> ${topic.goals.join(', ')}`;
                        }
                        if (topic.knowledge_areas) {
                            response += `<br><strong>Áreas de Conocimiento:</strong> ${topic.knowledge_areas.join(', ')}`;
                        }
                        if (topic.components) {
                            response += `<br><strong>Componentes:</strong> ${topic.components.join(', ')}`;
                        }
                        if (topic.principles) {
                            response += `<br><strong>Principios:</strong> ${topic.principles.join(', ')}`;
                        }
                        if (topic.diagram) {
                            response += `<br>${topic.diagram}`;
                        }
                        botResponse = response;
                        break;
                    }
                }
                appendMessage('Bot', botResponse);
            }
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatWindow.appendChild(messageElement);
        // Render mermaid diagrams
        mermaid.run({
            nodes: document.querySelectorAll('.mermaid')
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
