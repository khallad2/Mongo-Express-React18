Todo
 - Authorization is implemented
 - story end is implemented
 - Users model and management is implemented
 - chrome browser

Assumptions:
 - User can create sentence after story is created (Create story then click Join and choose story or click on story link)
 - User can Invite anyone using unique story link to add sentence to non-completed story
 - User can Invite anyone using unique story link to end non-completed story
 - User can Invite anyone using unique story link to view completed Narrative
 - User can join non-completed story to add sentence at a time without any restrictions of sentence length or number of sentences
 - User can join non-completed story and see last sentence using shared link or by choosing from menu-select story
 - User can join non-completed story to end the story and reveal the Narrative and share link
 - user can join and end non-completed story only when it has at least one sentence
 - User can join completed story to view the whole Narrative or share link
 - User can View all Stories and to
   - read completed stories and share links
   - contribute and share link and view last sentence of non-completed story




DB Setup Terminal-1 (global setup or in specific dir)
========
    0.to setup MongoDb i followed https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/ 
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
    0. to setup react-ts vite project i followed https://vitejs.dev/guide/#scaffolding-your-first-vite-project
    1. run cmd npm install
    2. from Backend setup step 3 copy the Server url and put it into /client/.env
    3. npm run dev


## implemented User stories
User Story 1: As a Player, I Want to Create a New Story
  Acceptance Criteria:
- Users can access a main menu with the option to create a new story.
- Creating a new story involves setting basic parameters such as story title and optional topic.
-
User Story 2: As a Player, I Want to Add a Sentence to the Story
  Acceptance Criteria:
- Once in a story, users can see the previous sentence contributed by another player.
- There's an input field where users can type and submit their sentence.
- The sentence submission is processed in real-time, and the updated story is displayed to all participants.
- 
User Story 3: As a Player, I want to Join other Stories.
  Acceptance Criteria:
- Users can access a main menu with the option to join an existing story.
- Joining an existing story allows users to browse and select from available open stories or start a new one.

User Story 4: As a Player, I Want to Invite Friends to Join My Story Acceptance Criteria:
- Players have the option to invite friends to join their ongoing story. - Invitation methods include sharing a unique link or via a story key. - Invited friends can seamlessly join the story without disruptions.

User Story 5: As a Player, I Want to End the Story and Reveal the Completed Narrative
  Acceptance Criteria:
- Players have the option to end a story, signalling that the narrative is complete.
- Upon ending, the entire story, including all contributed sentences, is presented in a shareable format.
