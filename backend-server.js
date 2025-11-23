// Sample Node.js Backend for Compliance Workflow Optimizer
// Install dependencies: npm install express cors anthropic

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve your HTML file from a 'public' folder

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // Set this in your environment variables
});

// API endpoint to analyze workflow
app.post('/api/analyze', async (req, res) => {
    try {
        const { workflowName, workflowDescription, hoursRequired, timePeriod } = req.body;

        // Validate input
        if (!workflowName || !workflowDescription || !hoursRequired || !timePeriod) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Call Anthropic API
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [{
                role: 'user',
                content: `Analyze this compliance workflow and provide optimization recommendations:

Workflow: ${workflowName}
Description: ${workflowDescription}
Time Required: ${hoursRequired} hours per ${timePeriod}

Please provide your analysis in the following JSON format:
{
    "timeSavings": "percentage or hours",
    "timeSavingsDesc": "brief description",
    "riskReduction": "percentage",
    "riskReductionDesc": "brief description",
    "opportunities": [
        {
            "title": "Automated Data Collection",
            "description": "detailed description"
        },
        {
            "title": "Pre-Assessment Validation",
            "description": "detailed description"
        },
        {
            "title": "Intelligent Workflow Routing",
            "description": "detailed description"
        },
        {
            "title": "Real-Time Compliance Checking",
            "description": "detailed description"
        },
        {
            "title": "Automated Documentation",
            "description": "detailed description"
        }
    ]
}

You MUST provide exactly 5 opportunities with those specific titles.
Focus on how AI can optimize each of those 5 areas for this specific workflow.
Return ONLY valid JSON, no other text.`
            }]
        });

        // Extract and parse the response
        const analysisText = message.content[0].text;
        
        // Remove markdown code blocks if present
        const jsonText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const analysis = JSON.parse(jsonText);

        // Return the parsed analysis
        res.json(analysis);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to analyze workflow',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Make sure to set ANTHROPIC_API_KEY environment variable');
});
