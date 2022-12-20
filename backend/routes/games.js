const express = require('express');
const router = express.Router();
const {
 getAllGames,
 startNewGame,
 updateGameStatus,
} = require('../controllers/game');

router.post('/getAllGame', getAllGames);
router.post('/startNewGame', startNewGame);
router.post('/updateGame', updateGameStatus);

module.exports = router;
