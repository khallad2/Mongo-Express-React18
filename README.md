Here you will find an Overview, Installation steps, and prerequisites for running the project

## Overview:
   # Stack: 
   React18-ts + Vite, Express + typescript, Mongo-DB

## implemented User stories
User Story 1: 
As a Player, I Want to Create a New Story
Acceptance Criteria:
- Users can access a main menu with the option to create a new story.
- Creating a new story involves setting basic parameters such as story title and optional topic.

User Story 2: 
As a Player, I Want to Add a Sentence to the Story
Acceptance Criteria:
- Once in a story, users can see the previous sentence contributed by another player.
- There's an input field where users can type and submit their sentences.
- The sentence submission is processed in real time, and the updated story is displayed to all participants.

User Story 3: 
As a Player, I want to Join other Stories.
Acceptance Criteria:
- Users can access a main menu with the option to join an existing story.
- Joining an existing story allows users to browse and select from available open stories or start a new one.

User Story 4: 
As a Player, I Want to Invite Friends to Join My Story Acceptance Criteria:
- Players have the option to invite friends to join their ongoing story. - Invitation methods include sharing a unique link or via a story key. - Invited friends can seamlessly join the story without disruptions.

User Story 5: 
As a Player, I Want to End the Story and Reveal the Completed Narrative
Acceptance Criteria:
- Players can end a story, signaling that the narrative is complete.
- Upon ending, the entire story, including all contributed sentences, is presented in a shareable format.

### Assumptions: 
 - User can create a sentence after a story is created (Create story then click Join and choose a story or click on story link)
 - User Can Share or Invite by click on the Share -> copy link and then share it with others
 - User can Invite anyone using a unique story link to add a sentence to the non-completed story
 - User can Invite anyone using a unique story link to end the non-completed story
 - User can Invite anyone using a unique story link to view the completed Narrative
 - When a user is invited to a story via a link he can not choose other stories from the menu on that link
 - User can join a non-completed story to add one sentence at a time without any restrictions of sentence length or number of sentences
 - User can join a non-completed story and see the last sentence using a shared link or by choosing from the menu-select story
 - User can join a non-completed story to end the story reveal the Narrative and share link
 - User can join and end a non-completed story only when it has at least one sentence
 - User can join the completed story to view the whole Narrative or share the link
 - User can View all Stories and to
   - read completed stories and share links
   - contribute and share links and view the last sentence of a non-completed story

### Prerequisites
Mongo-db should be installed locally

Typescript and ts-node for Backend:
    npm install -g typescript
    npm install -g ts-node

## Installation

- Extra: if you have a mac and you use brew you can run cmd 
   chmod +x install-dep.sh
   ./install-mongo.sh
  this will setup mongoDb or follow step 0 in DB Setup

- if you have a mac in the challenge dir you can run
   chmod +x install-dep.sh
  ./install-dep.sh
this will install all challenge dependencies for the frontend and backend and run frontend and backend in 2 terminals
Alternatively you can follow the following setup steps 

DB Setup Terminal-1 (global setup or in specific dir)
========
    0.to setup MongoDb i followed the guide on https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/ 
    1.run cmd brew update
    2.run cmd brew install mongodb-community@7.0
    3. run cmd brew services start mongodb-community@7.0 // start DB service
    4. run cmd mongosh // to get the data base connection string ex: mongodb://127.0.0.1:27017
    5. use one-line-story // switch to one-line-story DB


Backend setup Terminal-2 (dir: challenge/server)
============= 
    0. run cmd: cd challenge/server
    1. run cmd: npm install
    2. from DB Setup step#4 copy the DB Connection string ex: MONGODB_URI=mongodb://127.0.0.1:27017/ into  /server/.env
    3. run cmd: npm start

Frontend setup Terminal-3 (dir: challenge/client)
=============
    0. to setup react-ts vite project I followed https://vitejs.dev/guide/#scaffolding-your-first-vite-project
    1. run cmd npm install
    2. from Backend setup step 3 copy the server URL and put it into /client/.env
    3. npm run dev

Backend Testing using Jest
============
    0. I followed https://github.com/kulshekhar/ts-jest?tab=readme-ov-file#getting-started to install ts-jest
    1. run cmd: npm run test //I have provided examples of test files but couldn't establish doing tests because of time

Frontend Testing using Jest
============
### To Do List
- Frontend-testing please note: Vite+jest is not fully supported https://jestjs.io/docs/getting-started#using-vite
- Authorization, login, logout, delete story
- security (middleware)
- User model and management
- compatibility with firefox and edge and Safari now is only Chrome browser
