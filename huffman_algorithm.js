class Node {
    constructor(char, freq) {
        this.char = char
        this.freq = freq
        this.left = null
        this.right = null
    }
}

function buildFrequencyMap(str) {
    const freqMap = {}
    for (let char of str) {
        if (freqMap[char]) {
            freqMap[char]++
        } else {
            freqMap[char] = 1
        }
    }
    return freqMap
}

function buildHuffmanTree(freqMap) {
    const queue = []
    for (let char in freqMap) {
        queue.push(new Node(char, freqMap[char]))
    }
    while (queue.length > 1) {
        queue.sort(function (a, b) {
            return a.freq - b.freq
        })
        const left = queue.shift()
        const right = queue.shift()
        const newNode = new Node(null, left.freq + right.freq)
        newNode.left = left
        newNode.right = right
        queue.push(newNode)
    }
    return queue.shift()
}

function buildHuffmanCodes(node, prefix = '', codes = {}) {
    if (node.char !== null) {
        prefix += ' '
        codes[node.char] = prefix
    } else {
        buildHuffmanCodes(node.left, prefix + '0', codes)
        buildHuffmanCodes(node.right, prefix + '1', codes)
    }
    return codes
}

function encode(str, codes) {
    let encodedStr = ''
    for (let char of str) {
        encodedStr += codes[char]
    }
    return encodedStr
}

function huffmanEncoding(str) {
    const freqMap = buildFrequencyMap(str)
    const keys = Object.keys(freqMap)
    const root = buildHuffmanTree(freqMap)
    const codes = (keys.length === 1) ? { [keys[0]]: '0 ' } : buildHuffmanCodes(root)
    const encodedStr = encode(str, codes)
    return { freqMap, codes, encodedStr }
}