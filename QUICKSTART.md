# Quick Start Guide

## Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure API Key
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Anthropic API key
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### Step 3: Create Public Folder
```bash
mkdir public
mv compliance_optimizer.html public/
```

### Step 4: Start Server
```bash
npm start
```

### Step 5: Open Browser
Navigate to: `http://localhost:3000/compliance_optimizer.html`

## That's It!

Try selecting one of the example workflows and clicking "▶ Analyze Workflow"

## Common Issues

**"Cannot find module 'express'"**
- Run `npm install` first

**"Failed to fetch"**
- Make sure the server is running
- Check that you're accessing `http://localhost:3000/compliance_optimizer.html`

**"API Error: 401"**
- Your API key is invalid or not set
- Check your .env file

**"API Error: 429"**
- You've hit rate limits
- Wait a moment and try again

## Next Steps

- Customize the workflow examples in the HTML file
- Add your own styling/branding
- Deploy to a hosting service (Heroku, AWS, etc.)
- Add authentication for production use
