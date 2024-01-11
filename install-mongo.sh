#!/bin/bash

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew is not installed. Please install Homebrew first."
    exit 1
fi

# Update Homebrew
brew update

# Install MongoDB Community Edition version 7.0
brew install mongodb-community@7.0

# Start MongoDB service
brew services start mongodb-community@7.0

# Wait for MongoDB to start
sleep 5

# Connect to MongoDB shell and switch to 'one-line-story' database
mongosh --eval "use one-line-story"

echo "MongoDB installation and setup completed."
