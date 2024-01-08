Todo
 - Authorization is implemented
 - story end is implemented
 - Users model and management is implemented

Assumptions:

 - user can end story when it has at least one sentence
 - user can enter many sentences
 - 
 - browser is chrome

DB Setup Terminal-1 (global setup or in specific dir)
========
 
    1.run cmd brew update
    2.run cmd brew install mongodb-community@7.0

    3. run cmd brew services start mongodb-community@7.0 // start DB service
    4. run cmd mongosh // to get the data base connection string ex: mongodb://127.0.0.1:27017
    5. use one-line-story // switch to one-line-story DB

Backend setup Terminal-2 (dir: challenge/server)
=============
    1. run cmd npm install
    2. from DB Setup step#4 copy the DB Connection string ex: MONGODB_URI=mongodb://127.0.0.1:27017/ into  /server/.env
    3. npm start

Frontend setup Terminal-3 (dir: challenge/client)
=============
    1. run cmd npm install
    2. from Backend setup step 3 copy the Server url and put it into /client/.env
    3. npm run dev



followed
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
to setup MongoDb

then 

Mongosh command to get the connection string
put it in .env 

followed
https://vitejs.dev/guide/#scaffolding-your-first-vite-project
to setup react-ts vite project
to run the project 

3 terminal windows (Backend, Frontend, DB)


