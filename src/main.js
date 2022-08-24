const getCountry = require("./lib/crawler/get-country");

const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/mongodb"), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: "mongodb+srv://yeojinsa:duwlstk7102@cluster0.vlqqn.mongodb.net/yeojinsa?retryWrites=true&w=majority",
});

fastify.register(require("@fastify/cors"),{
  origin:"*"
})

fastify.get("/country", async function (req, reply) {
    const countryObject = await getCountry();
    const result = this.mongo.db
        .collection("country")
        .insertOne({ _id: "countries", countries: countryObject });
    const result2 = this.mongo.db
        .collection("country")
        .insertOne({
            _id: "countryName",
            countryName: Object.keys(countryObject),
        });
    reply.send(result);
});

fastify.get("/country/:page", async function (req, reply) {
    const users = this.mongo.db.collection("country");
    const result = await users.find({}).limit(Number(req.params.page)).toArray();
    reply.send(result);
});

fastify.get("/country-name",async function (req, reply) {
    const users = this.mongo.db.collection("country");
    const result = await users.find({_id:"countryName"}).toArray();
    reply.send(result);
})

fastify.listen({ port: 3300 }, (err) => {
    if (err) throw err;
    console.log("리스닝 3300");
});
