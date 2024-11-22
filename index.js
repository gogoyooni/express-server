const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const promBundle = require('express-prom-bundle');
require('dotenv').config();

const prisma = new PrismaClient();
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
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// 모든 사용자 조회
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 사용자 생성
app.post('/users', async (req, res) => {
try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
    data: { name, email },
    });
    res.json(user);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

const PORT = process.env.PORT || 2323;
app.listen(PORT, () => {
console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});