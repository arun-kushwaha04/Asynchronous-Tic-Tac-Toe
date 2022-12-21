const Game = require('../models/games');
const User = require('../models/users');

exports.getAllGames = async (req, res) => {
 try {
  const { email } = req.body;
  const userEmail = [];
  const game1List = await Game.find({ player1: email });
  const game2List = await Game.find({ player2: email });
  let games = [...game1List, ...game2List];

  games = games.sort((a, b) => {
   if (a.lastModified <= b.lastModified) return 1;
   return -1;
  });

  games.forEach((game) => {
   if (game.player1 != email) userEmail.push(game.player1);
   else userEmail.push(game.player2);
  });

  const data = await User.find({ email: { $in: userEmail } });

  games.forEach((gameData, index) => {
   let userName;
   for (let i = 0; i < data.length; i++) {
    let x = data[i];
    if (
     (x.email != email && x.email === gameData.player2) ||
     x.email === gameData.player1
    ) {
     userName = x.userName;
     break;
    }
   }
   gameData['userName'] = userName;
  });

  res.status(200).json({
   message: 'User games reterieved',
   payload: games,
   status: 200,
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({
   message: 'Internal server error occured',
   payload: null,
   status: 500,
  });
 }
};

exports.startNewGame = async (req, res) => {
 try {
  const { player1, player2 } = req.body;
  const game1 = await Game.findOne({
   player1: player1,
   player2: player2,
   gameFinished: false,
  });
  const game2 = await Game.findOne({
   player1: player2,
   player2: player1,
   gameFinished: false,
  });
  if (game1 || game2) {
   res.status(400).json({
    message: 'A game already exists',
    payload: null,
    status: 400,
   });
   return;
  }
  const user = await User.findOne({ email: player2 });
  if (!user) {
   res.status(400).json({
    message: 'Incorrect user mail id',
    payload: null,
    status: 400,
   });
  }
  const dateString = String(new Date(Date()).getTime());
  const game = new Game({
   player1: player1,
   player2: player2,
   gameFinished: false,
   nextMoveBy: player1,
   gameState: {
    block1: 0,
    block2: 0,
    block3: 0,
    block4: 0,
    block5: 0,
    block6: 0,
    block7: 0,
    block8: 0,
    block9: 0,
   },
   lastModified: dateString,
   gameWonBy: null,
  });
  await game.save();
  res.status(200).json({
   message: 'New game created',
   payload: game,
   status: 200,
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({
   message: 'Internal server error occured',
   payload: null,
   status: 500,
  });
 }
};

exports.updateGameStatus = async (req, res) => {
 try {
  const { gameId, gameFinished, nextMoveBy, gameState, gameWonBy } = req.body;
  const dateString = String(new Date(Date()).getTime());

  Game.findById(gameId, async (err, game) => {
   if (err) {
    console.log(err);
    res.status(500).json({
     message: 'Internal error occured',
     payload: null,
     status: 500,
    });
   }
   if (!game) {
    res.status(400).json({
     message: 'Game not found',
     payload: null,
     status: 400,
    });
   } else {
    game.gameFinished = gameFinished;
    game.nextMoveBy = nextMoveBy;
    game.gameState = gameState;
    game.gameWonBy = gameWonBy;
    game.lastModified = dateString;
    await game.save();
   }
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({
   message: 'Internal error occured',
   payload: null,
   status: 500,
  });
 }
 return;
};
