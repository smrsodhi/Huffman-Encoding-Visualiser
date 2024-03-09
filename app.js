const text = document.querySelector('#text')
const ascii = document.querySelector('#ascii')
const huffman = document.querySelector('#huffman')

text.addEventListener('input', function() {
    ascii.value = stringToAsciiBinary(text.value)
    if (text.value === '') {
        huffman.value = ''
    } else {
        huffman.value = huffmanEncoding(text.value)
    }
})