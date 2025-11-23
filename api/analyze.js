import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { workflowDescription } = req.body;

    if (!workflowDescription) {
      return res.status(400).json({ error: 'Workflow description is required' });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `You are a compliance workflow automation expert. Analyze the following compliance workflow and provide:

1. Key automation opportunities
2. Estimated time savings
3. Risk reduction benefits
4. Implementation complexity (Low/Medium/High)
5. Recommended tools or approaches

Workflow: ${workflowDescription}

Provide a structured analysis with specific, actionable recommendations.`,
        },
      ],
    });

    const analysis = message.content[0].text;
    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze workflow' });
  }
}
