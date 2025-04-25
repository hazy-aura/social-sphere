const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');

const prisma = new PrismaClient();

async function main() {
  const users = [
    { id: randomUUID(), username: 'alice', avatar: null, cover: null, name: 'Alice', surname: 'Smith', description: 'Frontend Developer', city: 'New York', school: 'NYU', work: 'ACME Corp', website: 'https://alice.example.com' },
    { id: randomUUID(), username: 'bob', avatar: null, cover: null, name: 'Bob', surname: 'Johnson', description: 'Backend Developer', city: 'San Francisco', school: 'UCSF', work: 'Beta LLC', website: 'https://bob.example.com' },
    { id: randomUUID(), username: 'charlie', avatar: null, cover: null, name: 'Charlie', surname: 'Brown', description: 'Full Stack Developer', city: 'Los Angeles', school: 'UCLA', work: 'Gamma Inc', website: 'https://charlie.example.com' },
    { id: randomUUID(), username: 'david', avatar: null, cover: null, name: 'David', surname: 'Wilson', description: 'QA Engineer', city: 'Chicago', school: 'UIUC', work: 'Delta Co', website: 'https://david.example.com' },
    { id: randomUUID(), username: 'eve', avatar: null, cover: null, name: 'Eve', surname: 'Davis', description: 'Product Manager', city: 'Boston', school: 'Harvard', work: 'Epsilon Ltd', website: 'https://eve.example.com' },
    { id: randomUUID(), username: 'frank', avatar: null, cover: null, name: 'Frank', surname: 'Miller', description: 'DevOps Engineer', city: 'Seattle', school: 'University of Washington', work: 'Zeta GmbH', website: 'https://frank.example.com' },
    { id: randomUUID(), username: 'grace', avatar: null, cover: null, name: 'Grace', surname: 'Lee', description: 'UX Designer', city: 'Austin', school: 'UT Austin', work: 'Eta LLC', website: 'https://grace.example.com' },
    { id: randomUUID(), username: 'heidi', avatar: null, cover: null, name: 'Heidi', surname: 'Taylor', description: 'Data Scientist', city: 'Denver', school: 'CMU', work: 'Theta Solutions', website: 'https://heidi.example.com' },
    { id: randomUUID(), username: 'ivan', avatar: null, cover: null, name: 'Ivan', surname: 'Anderson', description: 'AI Engineer', city: 'Miami', school: 'MIT', work: 'Iota Tech', website: 'https://ivan.example.com' },
    { id: randomUUID(), username: 'judy', avatar: null, cover: null, name: 'Judy', surname: 'Thomas', description: 'Technical Lead', city: 'Dallas', school: 'Georgia Tech', work: 'Kappa Systems', website: 'https://judy.example.com' },
    { id: randomUUID(), username: 'mallory', avatar: null, cover: null, name: 'Mallory', surname: 'Harris', description: 'Security Analyst', city: 'Atlanta', school: 'Georgia Tech', work: 'Lambda Works', website: 'https://mallory.example.com' },
    { id: randomUUID(), username: 'nancy', avatar: null, cover: null, name: 'Nancy', surname: 'Clark', description: 'Marketing Specialist', city: 'Phoenix', school: 'ASU', work: 'Mu Dynamics', website: 'https://nancy.example.com' },
    { id: randomUUID(), username: 'oliver', avatar: null, cover: null, name: 'Oliver', surname: 'Lewis', description: 'Systems Engineer', city: 'Philadelphia', school: 'Penn', work: 'NuWorks', website: 'https://oliver.example.com' },
    { id: randomUUID(), username: 'peggy', avatar: null, cover: null, name: 'Peggy', surname: 'Robinson', description: 'Network Engineer', city: 'Houston', school: 'Rice University', work: 'Xi Labs', website: 'https://peggy.example.com' },
    { id: randomUUID(), username: 'quincy', avatar: null, cover: null, name: 'Quincy', surname: 'Walker', description: 'Business Analyst', city: 'San Diego', school: 'UCSD', work: 'Omicron Soft', website: 'https://quincy.example.com' },
    { id: randomUUID(), username: 'ruth', avatar: null, cover: null, name: 'Ruth', surname: 'Young', description: 'Content Writer', city: 'Minneapolis', school: 'University of Minnesota', work: 'Pi Analytics', website: 'https://ruth.example.com' },
    { id: randomUUID(), username: 'sybil', avatar: null, cover: null, name: 'Sybil', surname: 'King', description: 'Graphic Designer', city: 'Detroit', school: 'Wayne State', work: 'Rho Ventures', website: 'https://sybil.example.com' },
    { id: randomUUID(), username: 'trent', avatar: null, cover: null, name: 'Trent', surname: 'Scott', description: 'Sales Executive', city: 'Charlotte', school: 'UNC Charlotte', work: 'Sigma Studios', website: 'https://trent.example.com' },
    { id: randomUUID(), username: 'ursula', avatar: null, cover: null, name: 'Ursula', surname: 'Green', description: 'HR Manager', city: 'San Jose', school: 'San Jose State', work: 'Tau Media', website: 'https://ursula.example.com' },
    { id: randomUUID(), username: 'victor', avatar: null, cover: null, name: 'Victor', surname: 'Adams', description: 'Finance Analyst', city: 'Portland', school: 'Portland State', work: 'Upsilon Health', website: 'https://victor.example.com' },
    { id: randomUUID(), username: 'wendy', avatar: null, cover: null, name: 'Wendy', surname: 'Baker', description: 'Legal Advisor', city: 'Nashville', school: 'Vanderbilt', work: 'Phi Finance', website: 'https://wendy.example.com' },
    { id: randomUUID(), username: 'xavier', avatar: null, cover: null, name: 'Xavier', surname: 'Gonzalez', description: 'Customer Success Manager', city: 'Orlando', school: 'University of Central Florida', work: 'Chi Logistics', website: 'https://xavier.example.com' },
    { id: randomUUID(), username: 'yvonne', avatar: null, cover: null, name: 'Yvonne', surname: 'Perez', description: 'Quality Assurance', city: 'Columbus', school: 'Ohio State University', work: 'Psi Retail', website: 'https://yvonne.example.com' },
    { id: randomUUID(), username: 'zoe', avatar: null, cover: null, name: 'Zoe', surname: 'Ramirez', description: 'Social Media Manager', city: 'Indianapolis', school: 'Indiana University', work: 'Omega Entertainment', website: 'https://zoe.example.com' },
    { id: randomUUID(), username: 'arthur', avatar: null, cover: null, name: 'Arthur', surname: 'Martinez', description: 'Architect', city: 'Baltimore', school: 'Johns Hopkins', work: 'Alpha Networks', website: 'https://arthur.example.com' }
  ];

  for (const user of users) {
    await prisma.user.upsert({ where: { username: user.username }, update: {}, create: user });
  }
  console.log('Seeded users successfully');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
