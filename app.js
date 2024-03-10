const text = document.querySelector('#text')
const ascii = document.querySelector('#ascii')
const huffman = document.querySelector('#huffman')

const generateBtn = document.querySelector('#generate')
const clearBtn = document.querySelector('#clear')

const chars = document.querySelector('#chars')
const asciiBits = document.querySelector('#ascii-bits')
const asciiBytes = document.querySelector('#ascii-bytes')
const huffmanBits = document.querySelector('#huffman-bits')
const huffmanBytes = document.querySelector('#huffman-bytes')
const compression = document.querySelector('#compression')

const codesList = document.querySelector('#codes')

function calcCompression(asciiLen, huffmanLen) {
    if (asciiLen === 0) return '--'
    let compression = (asciiLen - huffmanLen) / asciiLen * 100
    return parseFloat(compression.toFixed(2)) + '%'
}

function updateStats() {
    const textLen = text.value.length
    const asciiLen = ascii.value.replaceAll(' ', '').length
    const huffmanLen = huffman.value.replaceAll(' ', '').length
    chars.innerText = textLen
    asciiBits.innerText = asciiLen
    asciiBytes.innerText = asciiLen / 8
    huffmanBits.innerText = huffmanLen
    huffmanBytes.innerText = huffmanLen / 8
    compression.innerText = calcCompression(asciiLen, huffmanLen)
}

function addCodes(freqMap, codes) {
    const keys = Object.keys(freqMap)
    for (let i = 0; i < keys.length; i++) {
        codesList.innerHTML += `<div class="${i % 2 ? "text-primary" : ""}">[${keys[i]}](${freqMap[keys[i]]}) -- ${codes[keys[i]]}</div>`
    }
}

generateBtn.addEventListener('click', function () {
    ascii.value = stringToAsciiBinary(text.value)
    if (text.value === '') {
        huffman.value = ''
        codesList.innerText = ''
    } else {
        const { freqMap, codes, encodedStr } = huffmanEncoding(text.value)
        huffman.value = encodedStr
        addCodes(freqMap, codes)
    }
    updateStats()
})

clearBtn.addEventListener('click', function () {
    text.value = ''
    ascii.value = ''
    huffman.value = ''
    updateStats()
})