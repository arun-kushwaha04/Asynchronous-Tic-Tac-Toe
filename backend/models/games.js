const mongoose = require('mongoose');

const game = mongoose.Schema({
 player1: {
  type: 'string',
  requrie: true,
 },
 player2: {
  type: 'string',
  require: true,
 },
 gameFinished: {
  type: 'boolean',
  require: true,
 },
 nextMoveBy: {
  type: 'string',
  default: null,
 },
 gameState: {
  block1: 'number',
  block2: 'number',
  block3: 'number',
  block4: 'number',
  block5: 'number',
  block6: 'number',
  block7: 'number',
  block8: 'number',
  block9: 'number',
 },
 lastModified: {
  type: 'string',
  require: true,
 },
 gameWonBy: {
  type: 'string',
  default: null,
 },
 userName: {
  type: 'string',
 },
});

module.exports = mongoose.model('Game', game);
