const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const gameMaster = require('../utils/gameMaster')
const gamePlayer = require('../utils/gamePlayer')

//Connection
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean-tut', (err, db) => {
        if (err) {
            return console.log(err);
        }
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

//create new game starter number
router.get('/newGame', (req, res) => {
    global.number = gameMaster.random3Digit();
    console.log('New Game:', global.number)
    res.json({ num: global.number });
});

//check guess
router.post('/check', (req, res) => {
    console.log(req.body);
    let result = gameMaster.checkGuess(req.body.guess);
    console.log('result', result);
    res.json({ guess: req.body.guess, b: result.Bull, c: result.Cow });
});

//show result
router.get('/show', (req, res) => {
    console.log('ans was', global.number);
    res.json({ ans: global.number });
});

//first random guess
router.get('/firstGuess', (req, res) => {
    global.availableDigits = '123456789';
    global.usedNumbers = [];
    var firstGuess = gameMaster.random3Digit();
    console.log('first guess', firstGuess);
    res.json({ cpuGuess: firstGuess });
});

//subsequent guesses based on bulls and cows entered by user
router.post('/cpuGuess', (req, res) => {
    console.log(req.body, global.usedNumbers)
    if ((global.availableDigits / 100) > 1) {
        var SubsequentGuess = gamePlayer.makeGuess(req.body.cpuGuess, req.body.bull, req.body.cow);
        console.log('next guess', SubsequentGuess);
        res.json({ cpuGuess: SubsequentGuess });
    } else {
        console.log((global.availableDigits / 100))
        res.status(400).json({});
    }
});

module.exports = router;