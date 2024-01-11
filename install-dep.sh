#!/bin/bash

#chmod +x install-dep.sh
#
## Go to the server directory
#cd server
#
## Run npm install for the server
#npm install
#
## Return to the original directory
#cd ..
#
## Go to the client directory
#cd client
#
## Run npm install for the client
#npm install
## Function to run a command in a new terminal in the specified directory
#
## Return to the original directory
#cd ..

run_in_terminal() {
  osascript -e "tell app \"Terminal\" to do script \"cd '$1' && $2\""
}

# Open terminal in the server directory and run npm run start
run_in_terminal "$(pwd)/server" "npm run start"

# Open terminal in the client directory and run npm run dev
run_in_terminal "$(pwd)/client" "npm run dev"
