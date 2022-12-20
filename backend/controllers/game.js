const Game = require('../models/games');

exports.getAllGames = async (req, res) => {
 try {
  const { email } = req.body;
  const game1List = await Game.find({ palyer1: email });
  const game2List = await Game.find({ palyer2: email });
  let games = [...game1List, ...game2List];

  games = games.sort((a, b) => a.lastModified > b.lastModified);
  console.log(games);
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
  const dateString = String(new Date(Date()).getTime());
  const game = new Game({
   player1: player1,
   player2: player2,
   gameFinised: false,
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
  const { gameId, gameFinised, nextMoveBy, gameState, gameWonBy } = req.body;
  const dateString = String(new Date(Date()).getTime());

  Game.findById(gameId, async (err, game) => {
   if (err) {
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
    game.gameFinised = gameFinised;
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
