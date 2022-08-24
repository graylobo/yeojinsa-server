const fastify = require("fastify")({ logger: true });


fastify.register(require("@fastify/mongodb"), {
  forceClose: true,
  url: "mongodb+srv://yeojinsa:duwlstk7102@cluster0.vlqqn.mongodb.net/yeojinsa?retryWrites=true&w=majority",
});

fastify.get("/", async function (req, reply) {
   const users = this.mongo.db.collection("country");
  const result = await users.find({}).toArray();
  reply.send(result);
});

fastify.listen({ port: 3300 }, err => {
  if (err) throw err
  console.log('asd')
})

async function listUsers(req, reply) {
  const users = this.mongo.db.collection("users");
  const result = await users.find({}).toArray();
  reply.send(result);
}