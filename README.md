# Asynchronous-Tic-Tac-Toe
An asynchronous version of  multi player tic-tac-toe, a playable web frontend using ReactJS and NodeJS.
Here Asynchronous means that both players take turns to play the game at their own convenience of time once started. Both players do not need to be online at the same time to play this game

## Local Setup

Clone the repository, cd into them individually, and then follow the below mentioned steps for setting up backend and frontend separately.

Frontend:

    - Fork the repository.
    - Clone the repository (git clone https://github.com/arun-kushwaha04/Asynchronous-Tic-Tac-Toe).
    - Open the folder in which you cloned the repository.
    - Change directory to frontend.
    - Run *npm install* or *yarn install*.
    - Run *npm run build* to build the frontend
    - Setup your backend using the below mentioned steps.

Backend:

    - Fork the repository.
    - Clone the repository (git clone https://github.com/arun-kushwaha04/Asynchronous-Tic-Tac-Toe).
    - Open the folder in which you cloned the repository.
    - Change directory to backend.
    - Run *npm install*.
    - Create a .env file (Follow blueprint show in .env.example).
    - Now you can run 'npm run dev' and start working locally.
    
## Packages Used

    - Node Js
    - Express
    - JWT 
    - Bcrypt Js
    - Mongoose
    - Dotnev
 
## Features Implemented

### Frontend
1. Login-SingUp pages:
    - Registeration of new users.
    - Login A register user.

2. Dashboard Page:
    - View all game user has played.
    - Navigate to play screen for a game.

2. New Game Page :
    - Create new game by entering email id of a user.

3. Play Page :
    - Make moves on this page.
    
<br>

### Backend

1. Auth Route(auth/)
    - register -> Registeration of user.
    - login -> Authentication of user.

2. Game Route(game/)
    - getAllGame -> Fetch all game of a user by their email id.
    - startNewGame -> Start a new game between two user.
    - updateGame -> Update a game state.
