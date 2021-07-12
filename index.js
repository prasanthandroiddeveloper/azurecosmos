const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;
const server = app.listen(port);
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./databaseContext");

const newItem = {
  id: "2",
  category: "function",
  name: "Cosmos DB",
  description: "Complete Cosmos DB Node.js Quickstart ⚡",
  isComplete: false,
};

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/kaptura", function (req, res) {
  //io.sockets.emit("FromAPI", req.query + " : Updated");
  console.log(JSON.stringify(req.query), "params");

  res.send("Welcome to Roambee");
  const schema = {
    type: "object",
    properties: {
      foo: { type: "string" },
      bar: { type: "number", maximum: 300 },
    },
    required: ["foo", "bar"],
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);

  // test({ foo: "abc", bar: 2 });
  // test({ foo: 2, bar: 4 });
  test({ foo: req.query.foo, bar: parseInt(req.query.bar) });

  function test(data) {
    const valid = validate(data);
    if (valid) {
      console.log(data, "datasasa");
      const { endpoint, key, databaseId, containerId } = config;

      const client = new CosmosClient({ endpoint, key });

      const database = client.database(databaseId);
      const container = database.container(containerId);

      // Make sure Tasks database is already setup. If not, create it.
      dbContext.create(client, databaseId, containerId);

      const { resource: createdItem } = container.items.create(data);
    } else {
      console.log("Invalid: " + ajv.errorsText(validate.errors));
    }
  }

  return true;
});

console.log("express running on server port 3000");
