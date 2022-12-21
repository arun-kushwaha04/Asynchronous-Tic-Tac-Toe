const express = require('express');
const router = express.Router();
const {
 getAllGames,
 startNewGame,
 updateGameStatus,
} = require('../controllers/game');
const { verifyToken } = require('../middleware/tokenVerifier');

router.post('/getAllGame', verifyToken, getAllGames);
router.post('/startNewGame', verifyToken, startNewGame);
router.post('/updateGame', verifyToken, updateGameStatus);

module.exports = router;
