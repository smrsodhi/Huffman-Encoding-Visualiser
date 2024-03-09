function charToAsciiBinary(character) {
    const asciiValue = character.charCodeAt(0);
    const binaryString = asciiValue.toString(2).padStart(8, '0');
    return binaryString;
}

function stringToAsciiBinary(inputString) {
    let binaryString = '';
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        binaryString += charToAsciiBinary(char);
    }
    return binaryString;
}