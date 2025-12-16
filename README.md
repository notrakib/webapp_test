# Web Application Details

Completion status: 100%

### setup project
#### DB
1. cd db && docker compose build
2. docker compose up -d

#### Server
1. cd server && npm install
2. check .env.example and configure accordingly
3. npm run start:dev

#### Client
1. cd src && npm install
2. npm run dev

### App URLs
Register - http://localhost:3000/register
Login - http://localhost:3000/login
Timeline - http://localhost:3000/timeline
To follow other users - http://localhost:3000/find-users
To check other user's profile - http://localhost:3000/users/[user_id] (Click on user name from timeline)

### Database Notes
The database schema is defined in the test.sql file

### Dependency Notes
For frontend all critical/high vulnerabilities were resolved
For backend there are 2 critical/high dev dependencies were ignored.