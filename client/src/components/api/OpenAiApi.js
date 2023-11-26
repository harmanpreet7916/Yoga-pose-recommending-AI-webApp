import { Configuration, OpenAIApi } from "openai";

const apikey = "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";
const openai = new OpenAIApi(
  new Configuration({
    apiKey: apikey,
  })
);

export default async function OpenAiApi(input) {
  if (input) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `"give 9 names only of yoga pose to cure "+${input} + " don't give any discription just mention names not even any extra line of introduction or any thing just straightly give me the names in format like this 'pose1,pose2,pose3,pose4,pose5' "`, //this is the qurey which wil be send to chat gpt modle to get response
          },
        ],
      });
      const poses = response.data.choices[0].message.content;
      return poses;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
