const api = require("../api/api.js")

module.exports= async function getCountry() {
    const obj={
    }
    return new Promise(async(resole,reject)=>{
        
        const {data} = await api();
        for (const country of data) {
            try {
                obj[country["translations"]["kor"]["common"]] = {
                    flags:country["flags"]["svg"],
                    population:country["population"],
                    capital:country["capital"] || null,
                    languages:country["languages"] ? country["languages"][Object.keys(country["languages"])[0]] : null
                }
            } catch (error) {
                console.log('error',country["translations"]["kor"]["common"])
            }
           
        }

        resole(obj)
    })
   
}