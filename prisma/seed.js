const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.user.deleteMany({});

  // 초기 데이터 생성
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'hong@example.com',
        name: '홍길동',
      },
    }),
    prisma.user.create({
      data: {
        email: 'kim@example.com',
        name: '김철수',
      },
    }),
    prisma.user.create({
      data: {
        email: 'lee@example.com',
        name: '이영희',
      },
    }),
  ]);

  console.log('시드 데이터가 생성되었습니다:', users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });