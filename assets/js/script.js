var left = '';
var operator = '';
var right = '';

function appendToResult(value) {
    if (!operator) left += value;
    else right += value;
    updateResult();
}

function operatorToResult(value) {
    if (!left) return;
    if (right) calculateResult();
    operator = value;
    updateResult();
}

function clearResult() {
    left = '';
    operator = '';
    right = '';
    document.getElementById('word-area').style.display = 'none';
    updateResult();
}

function calculateResult() {
    if (!left || !operator || !right) return;

    let l = parseFloat(left);
    let r = parseFloat(right);
    let result;

    switch (operator) {
        case '+': result = l + r; break;
        case '-': result = l - r; break;
        case '*': result = l * r; break;
        case '/': result = r !== 0 ? l / r : 'Error'; break;
        default: return;
    }

    left = result.toString();
    operator = '';
    right = '';
    updateResult();
}

/* ===== 10^x FUNCTION ===== */
function tenPower() {
    if (right) right = Math.pow(10, parseFloat(right)).toString();
    else if (left) left = Math.pow(10, parseFloat(left)).toString();
    updateResult();
}

/* ===== DISPLAY & WORDS ===== */
function updateResult() {
    document.getElementById('result').value =
        left + (operator ? ' ' + operator + ' ' : '') + right || '0';

    if (left && !operator && !right) {
        document.getElementById('word-result').innerHTML =
            '<strong>' + numberToWords(left) + '</strong>';
        document.getElementById('word-area').style.display = 'flex';
        document.getElementById('speak-btn').disabled = false;
    }
}

function numberToWords(num) {
    num = Number(num);
    if (isNaN(num)) return '';

    const ones = ['', 'one','two','three','four','five','six','seven','eight','nine',
        'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const tens = ['', '', 'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

    function convert(n) {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? ' ' + ones[n%10] : '');
        if (n < 1000) return ones[Math.floor(n/100)] + ' hundred' + (n%100 ? ' ' + convert(n%100) : '');
        if (n < 1_000_000) return convert(Math.floor(n/1000)) + ' thousand' + (n%1000 ? ' ' + convert(n%1000) : '');
        return convert(Math.floor(n/1_000_000)) + ' million';
    }

    return convert(num);
}

function speakResult() {
    const words = document.getElementById('word-result').innerText;
    if (!words) return;
    speechSynthesis.speak(new SpeechSynthesisUtterance(words));
}
