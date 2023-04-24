import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const configuration = new Configuration({
  organization: "org-qctbPeOFuOhEEEFEo3vZ2oqr",
  apiKey: process.env.ENHANCED_KEY,
});
const openai = new OpenAIApi(configuration);

// async function callApi() {
//   const response = await openai.createCompletion({
//     id: "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
//     object: "text_completion",
//     created: 1589478378,
//     model: "text-davinci-003",
//     choices: [
//       {
//         text: "\n\nThis is indeed a test",
//         index: 0,
//         logprobs: null,
//         finish_reason: "length",
//       },
//     ],
//     usage: {
//       prompt_tokens: 5,
//       completion_tokens: 7,
//       total_tokens: 12,
//     },
//   });
//   console.log(response.data.choices[0].text);
//

//create a simple express api that calls the function above
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(message);
  console.log(currentModel);
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log(response.data.choices[0].text);
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data);
  res.json({
    models: response.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
