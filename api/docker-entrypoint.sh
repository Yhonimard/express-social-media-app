#!/bin/sh

echo "app starting"
/app/node_modules/.bin/sequelize db:migrate
/app/node_modules/.bin/sequelize db:seed:all
npm start