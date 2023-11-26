import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
const apikey = "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";
const openai = new OpenAIApi(
  new Configuration({
    apiKey: apikey,
  })
);

export default function App() {
  const [userInput, setUserInput] = useState();
  const [yogaPoseImageData, setYogaPoseImageData] = useState({});
  const [healthProblem, sethealthProblem] = useState();

  async function chatGpt(input) {
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
        return response;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  async function extractPoseNames2(response) {
    const poseNames = [];
    const lines = response.split(/\r?\n/); // Split the response by new lines

    for (let line of lines) {
      line = line.trim(); // Remove leading and trailing whitespace

      if (line !== "") {
        const commaSeparatedPoses = line.split(","); // Split the line by commas

        for (let pose of commaSeparatedPoses) {
          pose = pose.trim(); // Remove leading and trailing whitespace
          pose = pose.replace(/^\d+\.\s*/, ""); // Remove leading numbers and dot
          pose = pose.trim(); // Remove leading and trailing whitespace

          if (pose !== "") {
            poseNames.push(pose); // Add the pose name to the array
          }
        }
      }
    }

    return poseNames; // Return the array of pose names
  }

  async function fetchImages(names) {
    if (names) {
      try {
        const imageApiResponse = await fetch("http://localhost:3000/images", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({ imageNames: names }),
        });
        console.log("image api response " + imageApiResponse.json());
        return imageApiResponse.json();
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  const handleChange = async (e) => {
    try {
      e.preventDefault();
      setUserInput(e.target.value);
      console.log(userInput);
      if (!userInput) {
        console.log("enter somethindg");
        return;
      }
      const gptResponse = await chatGpt(userInput);
      console.log(gptResponse);
      if (!gptResponse) {
        console("gpt api not responding ");
        return;
      }

      const poseNamesWithComma = await extractPoseNames2(gptResponse);
      console.log("pose names extracted ");
      console.log(poseNamesWithComma);

      if (!poseNamesWithComma) {
        console.log("pose names are not extracted from gpt response ");
        return;
      }

      const imageArray = await fetchImages(poseNamesWithComma);
      console.log("image server response " + imageArray);

      if (!imageArray) {
        console.log("unable to get data from image api");
        setYogaPoseImageData(null);
      }

      setYogaPoseImageData(imageArray);
      console.log(yogaPoseImageData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleChange}>
        <input
          type="text"
          placeholder="enter ..."
          value={healthProblem}
          onChange={(e) => {
            sethealthProblem(e.target.value);
          }}
        />
        <input type="submit" value="seracj" />
      </form>
    </div>
  );
}
