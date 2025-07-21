const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

const dataGovernanceTopics = {
    "data quality": {
        "definition": "Data quality refers to the state of qualitative or quantitative pieces of information. There are many definitions of data quality but data is generally considered high quality if it is 'fit for [its] intended uses in operations, decision making and planning'.",
        "dimensions": ["Accuracy", "Completeness", "Consistency", "Timeliness", "Uniqueness", "Validity"]
    },
    "data lineage": {
        "definition": "Data lineage includes the data's origins, what happens to it and where it moves over time. Data lineage is the process of understanding, recording, and visualizing data as it flows from data sources to consumption.",
        "importance": "Data lineage is important for root cause analysis, impact analysis, and regulatory compliance."
    },
    "data governance": {
        "definition": "Data governance is the process of managing the availability, usability, integrity and security of the data in enterprise systems, based on internal data standards and policies that also control data usage.",
        "goals": ["Improve data quality", "Ensure data security and privacy", "Promote data literacy", "Enable better decision making"]
    },
    "dama-dmbok": {
        "definition": "The DAMA-DMBOK (Data Management Body of Knowledge) is a framework that provides a comprehensive overview of the data management field. It is a reference for data management professionals, providing a standard vocabulary and a structured approach to data management.",
        "knowledge_areas": ["Data Governance", "Data Architecture", "Data Modeling and Design", "Data Storage and Operations", "Data Security", "Data Integration and Interoperability", "Documents and Content Management", "Reference and Master Data", "Data Warehousing and Business Intelligence", "Metadata Management", "Data Quality"]
    },
    "dcam": {
        "definition": "The DCAM (Data Management Capability Assessment Model) is a framework that helps organizations assess their data management capabilities. It provides a structured approach to identifying strengths and weaknesses in data management practices.",
        "components": ["Strategy and Business Case", "Data Governance", "Data Quality", "Data Operations", "Platform and Architecture", "Supporting Capabilities"]
    },
    "cobit": {
        "definition": "COBIT (Control Objectives for Information and Related Technologies) is a framework for the governance and management of enterprise IT. It provides a set of good practices for IT management and governance, and it can be used to support data governance initiatives.",
        "principles": ["Meeting Stakeholder Needs", "Covering the Enterprise End-to-End", "Applying a Single, Integrated Framework", "Enabling a Holistic Approach", "Separating Governance From Management"]
    },
    "data life cycle": {
        "definition": "The data life cycle describes the stages that a particular piece of data goes through from its initial generation or capture to its eventual archival or deletion.",
        "diagram": "<div class=\"mermaid\">graph TD; A[Creation] --> B(Storage); B --> C{Usage}; C --> D[Archival]; C --> E[Deletion];</div>"
    }
};

app.post('/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let botResponse = "I'm sorry, I don't understand. Can you please rephrase your question? Try asking about data quality, data lineage, or data governance.";

    if (!req.session.name) {
        if (userMessage.startsWith("my name is")) {
            req.session.name = userMessage.substring(11);
            botResponse = `Hello ${req.session.name}! How can I help you today?`;
        } else {
            botResponse = "Hello! What is your name?";
        }
    } else {
        for (const keyword in dataGovernanceTopics) {
            if (userMessage.includes(keyword)) {
                const topic = dataGovernanceTopics[keyword];
                let response = `<strong>${keyword.toUpperCase()}</strong><br>${topic.definition}`;
                if (topic.dimensions) {
                    response += `<br><strong>Dimensions:</strong> ${topic.dimensions.join(', ')}`;
                }
                if (topic.importance) {
                    response += `<br><strong>Importance:</strong> ${topic.importance}`;
                }
                if (topic.goals) {
                    response += `<br><strong>Goals:</strong> ${topic.goals.join(', ')}`;
                }
                if (topic.knowledge_areas) {
                    response += `<br><strong>Knowledge Areas:</strong> ${topic.knowledge_areas.join(', ')}`;
                }
                if (topic.components) {
                    response += `<br><strong>Components:</strong> ${topic.components.join(', ')}`;
                }
                if (topic.principles) {
                    response += `<br><strong>Principles:</strong> ${topic.principles.join(', ')}`;
                }
                if (topic.diagram) {
                    response += `<br>${topic.diagram}`;
                }
                botResponse = response;
                break;
            }
        }
    }

    res.json({ message: botResponse });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
