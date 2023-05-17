var makeGuess = (lastGuess, bull, cow) => {
    if (cow === 0 && bull === 0) {
        var lastGuessArr = (lastGuess + '').split('');
        global.availableDigits = global.availableDigits.replace(lastGuess[0], '');
        global.availableDigits = global.availableDigits.replace(lastGuess[1], '');
        global.availableDigits = global.availableDigits.replace(lastGuess[2], '');
        console.log(global.availableDigits);
        var num = random3Digit(global.availableDigits, 3);
        while (global.usedNumbers.indexOf(num) != -1) {
            num = random3Digit(global.availableDigits, 3);
        }
        global.usedNumbers.push(num);
        return num;
    } else if (bull === 3) {
        return lastGuess;
        console.log(lastGuess)
    } else if ((bull + cow) === 3) {
        global.availableDigits = (lastGuess + '');
        var num = random3Digit(global.availableDigits, 3);
        while (global.usedNumbers.indexOf(num) != -1) {
            num = random3Digit(global.availableDigits, 3);
        }
        global.usedNumbers.push(num);
        return num;
    } else if (!global.cow && (cow + bull) === 2) {
        global.cow = true;
        global.savedDigit = lastGuess[2];
        // global.savedState = global.availableDigits;
        let temp = random3Digit(global.availableDigits, 1);
        while (lastGuess[0] == temp || lastGuess[1] == temp || lastGuess[2] == temp) {
            temp = random3Digit(global.availableDigits, 1);
        }
        return lastGuess.replace(lastGuess[2], temp);;
    } else if (global.cow && (cow + bull) === 2) {
        global.cow = false;
        global.availableDigits = global.availableDigits.replace(global.savedDigit, '');
        let temp = random3Digit(global.availableDigits, 1);
        while (lastGuess[0] == temp || lastGuess[1] == temp || lastGuess[2] == temp) {
            temp = random3Digit(global.availableDigits, 1);
        }
        var num = lastGuess.replace(lastGuess[2], '') + temp;
        while (global.usedNumbers.indexOf(num) != -1) {
            num = random3Digit(global.availableDigits, 3);
        }
        global.usedNumbers.push(num);
        return num;
    }
    else if (global.cow && (cow + bull) < 2) {
        global.cow = false;
        var num = random3Digit(global.availableDigits, 3);
        while (global.usedNumbers.indexOf(num) != -1) {
            num = random3Digit(global.availableDigits, 3);
        }
        global.usedNumbers.push(num);
        return num;
    }
    else {
        var num = random3Digit(global.availableDigits, 3);
        while (global.usedNumbers.indexOf(num) != -1) {
            num = random3Digit(global.availableDigits, 3);
        }
        global.usedNumbers.push(num);
        return num;
    }
}
var random3Digit = function (numberList, n) {
    return shuffle(numberList.split('')).join('').substring(0, n);
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
var i = [
    00, 01, 02, 03, 10, 11, 12, 20, 21, 30
]
exports.makeGuess = makeGuess;
