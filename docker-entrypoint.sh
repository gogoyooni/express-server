#!/bin/sh

# 데이터베이스 연결 대기
echo "Waiting for database connection..."
npx wait-on tcp:postgres:5432 -t 30000

# 데이터베이스 마이그레이션
echo "Running database migrations..."
npx prisma migrate deploy

# 시드 데이터 추가
echo "Adding seed data..."
npx prisma db seed

# 서버 시작
echo "Starting server..."
node index.js