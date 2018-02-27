


module.exports = {
    changeText: () => {
        var text = 'RT @KentMurphy: RT if you miss the Kid 🐐 https://t.co/PNopACMiVc'
        var text1 = text.replace(/https.*$/g, '')
        var text2 = text1.replace(/^(.*?)\: /g, '')
        return text2
    },

    userExist: () => {
        var user = "Juan Castro"
        if(user==false){
            return "false"
        } else {
            return user
        }
    },

    isAnArray: () => {
        var params = ['book', true, 'dog', 'elephantitis', 700, 'Jeft Goldbloom']
         return params
    },

    imageSize: () => {
        image = 'profilepic+normal'
        return image.replace('normal', '400x400')
    }
}