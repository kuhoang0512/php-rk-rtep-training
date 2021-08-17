# RK RTEP Training Laravel 8 + Reactjs
------------------------------------------------
# Prerequisites
- PHP >= 7.3
- MySQL (version > 5)
- Apache/Nginx Server
- VS Code Editor
- Composer
- Postman
- Nodejs > 10
- npx
- create-react-app

------------------------------------------------

# Todo RESTful API
First step: setup Database `laravel_todo` from Mysql or Maria DB
Go to inside folder `todo-api` change the .env file

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_todo
DB_USERNAME=root
DB_PASSWORD=

Next step: 
Run `composer install`
Run `php artisan passport:install`

Final step:
Run server API: `php artisan serve` or with specific port `php artisan serve --port=8080`

----------------------------------------------

# Todo Web Application
First step: go to inside folder `todo-app` and run `npm install`
Next step: Change the env file

REACT_APP_API_URL=http://localhost:8080

You can change the variable whatever you want

Final step: Run `npm start` to run the web application

