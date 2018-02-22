


module.exports = {
    changeText: () => {
        var text = 'RT @aopelstar: my biggest beef with web development is that there are so few people with which to share your victories.'
        for(var i = 0; i < text.length; i++){
            if(text[i]===':'){
                var t = text.slice(i + 2)
            }
        }
        return t
    }
}