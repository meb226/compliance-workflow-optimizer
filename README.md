# Compliance Workflow Optimizer - Setup Instructions

## Overview
This project consists of a frontend HTML file and a Node.js backend server that communicates with the Anthropic API.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Anthropic API key

## Backend Setup

### 1. Install Dependencies
```bash
npm install express cors @anthropic-ai/sdk
```

### 2. Set Environment Variable
Create a `.env` file in your project root or set the environment variable:

**Option A: Using .env file**
```bash
# Create .env file
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
```

Then install dotenv:
```bash
npm install dotenv
```

And add to the top of your server file:
```javascript
require('dotenv').config();
```

**Option B: Set directly in terminal**

Windows (Command Prompt):
```cmd
set ANTHROPIC_API_KEY=your_api_key_here
```

Windows (PowerShell):
```powershell
$env:ANTHROPIC_API_KEY="your_api_key_here"
```

Mac/Linux:
```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

### 3. Project Structure
```
your-project/
├── backend-server.js          # Your Node.js server
├── public/
│   └── compliance_optimizer.html   # Frontend HTML file
├── package.json
└── .env                       # Environment variables (don't commit this!)
```

### 4. Run the Server
```bash
node backend-server.js
```

The server will start on `http://localhost:3000`

## Frontend Configuration

The HTML file is configured to call `/api/analyze` by default. If you need to change this:

1. Open `compliance_optimizer.html`
2. Find this line near the top of the `<script>` section:
   ```javascript
   const BACKEND_API_ENDPOINT = '/api/analyze';
   ```
3. Change it to your backend URL if needed:
   ```javascript
   const BACKEND_API_ENDPOINT = 'http://localhost:3000/api/analyze';
   ```

## Testing

1. Open your browser to `http://localhost:3000/compliance_optimizer.html`
2. Select an example workflow or enter your own
3. Click "▶ Analyze Workflow"
4. The results should appear after a few seconds

## Troubleshooting

### "Failed to fetch" Error
- Make sure your backend server is running
- Check that the `BACKEND_API_ENDPOINT` in the HTML matches your server URL
- Verify CORS is enabled (included in the sample server code)

### "API Error: 500" 
- Check your Anthropic API key is set correctly
- Look at the server console for detailed error messages
- Ensure you have API credits available

### No Response or Timeout
- The Anthropic API call can take 5-15 seconds
- Check your internet connection
- Verify the API key has the correct permissions

## Production Deployment

For production, consider:
1. Using environment variables for all configuration
2. Adding rate limiting to your API endpoints
3. Implementing proper error logging
4. Using HTTPS
5. Adding authentication if needed
6. Storing API keys securely (never in client-side code)

## API Response Format

The backend expects to return JSON in this format:
```json
{
    "timeSavings": "40-60%",
    "timeSavingsDesc": "per workflow execution",
    "riskReduction": "75%",
    "riskReductionDesc": "through automated checks",
    "opportunities": [
        {
            "title": "Automated Data Collection",
            "description": "..."
        },
        ... (5 total)
    ]
}
```

## Support

If you encounter issues:
1. Check the browser console for frontend errors
2. Check the Node.js console for backend errors
3. Verify all dependencies are installed
4. Ensure your API key is valid and has credits
