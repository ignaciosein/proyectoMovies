const fetch = require('node-fetch');

const pelis = {
    getMovie: async (url) => {
        let response = await fetch(url)
        let data = await response.json()
        return data
        // fetch(url)
        // .then((res)=>res.json())
        // .then((json)=>console.log(json))
    }
}
module.exports=pelis;