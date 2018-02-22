


module.exports = {
    changeText: () => {
        var text = 'RT @KentMurphy: RT if you miss the Kid 🐐 https://t.co/PNopACMiVc'
        var text1 = text.replace(/https.*$/g, '')
        var text2 = text1.replace(/^(.*?)\: /g, '')
        return text2
    }
}