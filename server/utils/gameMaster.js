var random3Digit = function () {
    return shuffle("123456789".split('')).join('').substring(0, 3);
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var checkGuess = function (guess) {
    var master = global.number;
    console.log('Mater check',global.number,guess)
    var masterArr = (master + '').split('');
    var guessArr = (guess + '').split('');
    var b = 0, c = 0;
    guessArr.forEach(element => {
        var index = guessArr.indexOf(element);
        if (masterArr[index] == element) {
            b++;
        } else if (masterArr[index] !== element && masterArr.indexOf(element) > -1) {
            c++;
        }
    });
    return { Bull: b, Cow: c };
}
exports.random3Digit = random3Digit;
exports.checkGuess = checkGuess;