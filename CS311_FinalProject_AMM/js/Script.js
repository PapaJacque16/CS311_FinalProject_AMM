// JavaScript source code
var type = ''; 
var places = 0; 

addValueInFocusEvents();
addConvertBtnClickEvents();
addRadioBtnChangeEvents();

function addValueInFocusEvents() {
    document.querySelector('#value-in').addEventListener('focus', () => {
        clearResult();
        clearValToBeConverted();
    });
}

function addConvertBtnClickEvents() {
    document.querySelector('#convert-btn').addEventListener('click', () => {
        convert();
    });
}

function addRadioBtnChangeEvents() {
    const radios = document.querySelectorAll('[name="conv-type"]');
    for (const radio of radios)
        radio.addEventListener('change', () => {
            clearResult();
            clearValToBeConverted();
        });
}

function clearResult() {
    document.querySelector('#result').innerHTML = '______________';
}

function clearValToBeConverted() {
    document.querySelector('#value-in').value = '';
    document.querySelector('#value-in').focus();
}

function convert() {
    const toBeConverted = document.querySelector('#value-in').value;
    const result = document.querySelector('#result');
    const buttons = document.querySelectorAll('input[name="conv-type"]');
    var converted = 0;
    
    for (const button of buttons) {
        if (button.checked) {
            type = button.value;
            break;
        }
    }

    if (type === '') {
        alert("Please select a conversion type.");
        return;
    }

    if (isNaN(toBeConverted) || toBeConverted === '') {
        alert("Value to be converted must be a number.");
        return;
    }

    switch (type) {
        case "meters-feet":
            converted = toBeConverted * 3.28084; 
            places = getSignificantDigitCount(toBeConverted);

            if (places > 6)
                places = 6; 
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} meters = ${converted} feet`;
            break;

        case "feet-meters":
            converted = toBeConverted / 3.28084; 
            places = getSignificantDigitCount(toBeConverted);

            if (places > 6)
                places = 6; 
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} feet = ${converted} meters`;
            break;

        case "kilometers-miles":
            converted = toBeConverted * 0.621371; 
            places = getSignificantDigitCount(toBeConverted);

            if (places > 6)
                places = 6;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} kilometers = ${converted} miles`;
            break;

        case "miles-kilometers":
            converted = toBeConverted / 0.621371; 
            places = getSignificantDigitCount(toBeConverted);

            if (places > 6)
                places = 6;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} Miles = ${converted} Kilometers`;
            break;

        case "celsius-farenheit":
            converted = toBeConverted * .55555555555 + 32; 
            places = getSignificantDigitCount(toBeConverted);

            if (toBeConverted == 0)
                places = farcelPlaces(toBeConverted);
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} Celcius = ${converted} Farenheit`;
            break;

        case "farenheit-celsius":
            converted = (toBeConverted - 32) * .55555555555; 
            places = getSignificantDigitCount(toBeConverted); 
                
            if (toBeConverted == 0)
                places = farcelPlaces(toBeConverted);
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} Farenheit = ${converted} Celsius`;
            break;

        case "kilograms-pounds":
            converted = toBeConverted * 2.2046226218; 
            places = getSignificantDigitCount(toBeConverted);

            if (places > 11)
                places = 11;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} kilograms = ${converted} pounds`;
            break;

        case "pounds-kilograms":
            converted = toBeConverted / 2.2046226218; 
            places = getSignificantDigitCount(toBeConverted);

            if (places > 11)
                places = 11;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} pounds = ${converted} kilograms`;
            break;

        case "grams-ounces":
            converted = toBeConverted * 0.0352739619; 
            places = getSignificantDigitCount(toBeConverted);
            if (places > 10)
                places = 10; 
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} grams = ${converted} ounces`;
            break;

        case "ounces-grams":
            converted = toBeConverted / 0.0352739619; 
            places = getSignificantDigitCount(toBeConverted);

            if (places > 10)
                places = 10; 
            console.log('places = ' + places);
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} ounces = ${converted} grams`;
            break;

        default:
            console.log('switch default - conversion type');
            break;
    }
}

function getSignificantDigitCount(n) {
    let count = 0;
    let decIndex = -2;
    let str = String(n);
    let len = str.length;

    console.log('');
    console.log(`original str: ${str}`);
    if (n == 0) {
        console.log('n = 0 - one sig figure');
        console.log('(special handling for F-C and C-F)')
        return 1;
    }

    str = str.replace('-', '');
    console.log(`remove minus, if present: ${str}`);
    str = removeLeadingZeroes(str);
    console.log(`removeLeadingZeroes: ${str}`);

    len = str.length;
   
    for (let i = 0; i < len; i++) {
        if (str[i] == '.')
            
            if (i == len - 1)
                decIndex = -1
           
            else
                decIndex = i;
         
    }
    console.log(`decIndex: ${decIndex}`);

    // Remove decimal point.
    str = str.replace(".", "");
    console.log(`remove decimal, if present: ${str}`);

    switch (decIndex) {

        case 0: /* Decimal point was the first character. Must remove leading 
            zeroes again and count remaining digits. */
            str = removeLeadingZeroes(str);
            console.log(`Decimal was first char, remove leading zeroes again: ${str}`);
            count = str.length;
            return count;

        case -1: // Decimal point was last character - count remaining digits.
            count = str.length;
            return count;

        case -2: /* No decimal point. Remove trailing zeroes and count remaining 
            digits. */
            n = Number(str);
            while (n != 0 && n % 10 == 0) n /= 10;
            count = String(n).length;
            return count;

        default: 
            str = removeLeadingZeroes(str);
            count = str.length;
            return count;
    }
}

function removeLeadingZeroes(x) {
   
    let leadingZeroIndex;
    let str = String(x);
    let len = str.length;

    for (i = 0; i < len; i++) {
        if (str[i] != '0') { 
            leadingZeroIndex = i;
            break;
        }
    }
   
    str = str.substring(leadingZeroIndex);
    return str;
}

function farcelPlaces(x) {
    let str = String(x);
    str = str.replace('-', '');
    str = removeLeadingZeroes(str);
    str = str.replace('.', '');
    return str.length;
}
