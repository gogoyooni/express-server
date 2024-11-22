FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/    
COPY . .

EXPOSE 2323
RUN npx prisma generate

# 데이터베이스 마이그레이션과 시드 데이터 추가
# RUN npx prisma migrate deploy

# seed 명령어 제거 (entrypoint에서 실행할 예정)
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
