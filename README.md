DESCRIPTION

Mongo, express, react, node based listing of test tasks related to users. React with redux-toolkit and typescript. Backend is also in typescript. Authentication wit JWT cookie.

FEATURES

- User registration, login, update and delete with all related collections and tasks.
- Collections can be created, updated and deleted with all related tasks.
- Tasks can be created, updated, deleted and set to completed or incomplete. More tags can be added to every task.
- All listing can be search by keywords, in case of tasks filtering by name or tags too. Listings can be ordered in different ways. By adding, updating and deleting elements in tasks, a list refresh button will apear to avoid unpredicted list changing based on given list ordering.

MONGODB SETUP

1. You can import test data from mongo_test_tables folder
2. Setup your MongoDB path in .env file in the backend folder

PRELOADED TEST USERS FROM MONGODB TEST TABLES

1. More collections and many tasks

   - email: user_1@email.com
   - password: User_1

2. Few collections and some tasks

   - email: user_2@email.com
   - password: User_2

3. No related collection and task

   - email: user_3@email.com
   - password: User_3

DEVELOPMENT

1. Install node modules of both backend and frontend folders
2. Change to development mode in .env file in the backend folder: "NODE_ENV = development"
3. Start backend from the main folder: npm run server --prefix backend
4. Start frontend from the main folder: npm start --prefix frontend
5. Open in browser: http://localhost:3000/

PRODUCTION

1. Change to production mode in .env file in the backend folder: "NODE_ENV = production"
2. Create production mode of frontend from the main folder: npm run build --prefix frontend
3. Start production mode of backend from the main folder: npm start --prefix backend
4. Open in browser: http://localhost:5000/

DOCKER SETUP

1. Change to development mode in .env file in the backend folder: "NODE_ENV = development"
2. Change mongo URI in .env file in the backend folder: "MONGO_URI = mongodb://mongodb/mern_test"
3. Change the proxy inside package.json file in the frontend folder: "proxy": "http://backend:5000"
4. In command line go into main parent folder and run: "docker-compose up"
5. If "MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017" error comes, try to restart backend image inside docker
