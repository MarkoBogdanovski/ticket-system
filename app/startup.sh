#!/bin/sh

echo "Migrate"
npx sequelize db:migrate
echo "Seed users table with agents"
node seeders/userSeeder.js
npm start
break
