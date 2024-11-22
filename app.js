const express = require('express');
const promBundle = require('express-prom-bundle');
const app = express();

// Prometheus metrics middleware
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: {app: 'express-app'},
  promClient: {
    collectDefaultMetrics: {
      timeout: 5000
    }
  }
});

app.use(metricsMiddleware);

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Sample API endpoint
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' }
  ];
  res.json(users);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
