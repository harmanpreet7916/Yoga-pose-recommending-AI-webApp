import { useEffect, useState } from "react";
import "./App.css";
import ImageApi from "../components/api/ImageApi";
import ExtractNames from "../components/helper functions/ExtractNames";
import Spinner from "../components/Spinner";
import { Configuration, OpenAIApi } from "openai";
import CardSection from "../components/CardSection";
import logo from "../assets/images/newLogo.png";

const apikey = "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";
const openai = new OpenAIApi(
  new Configuration({
    apiKey: apikey,
  })
);

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [_ImageData, set_ImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState([]);
  const [hp, sethp] = useState("");

  async function OpenAiApi(input) {
    if (input) {
      try {
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-0613",
          messages: [
            {
              role: "user",
              content: `"suggest 9 yoga poses that can cure " +${input}+". The suggested poses should take into account every aspect of my health issue and be tailored to my unique body condition. Please list the names of the yoga poses in the following format: 'pose1, pose2, pose3, pose4, pose5, pose6, pose7, pose8, pose9' don't give any description or any heading."`, //this is the qurey which wil be send to chat gpt modle to get response
            },
          ],
        });
        const poses = await response.data.choices[0].message.content;
        setGptResponse(poses);
        return poses;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      console.log(gptResponse);
      const poseNameArray = ExtractNames(gptResponse);
      if (!poseNameArray) {
        console.log("pose names are not extracted from gpt response ");
        setIsLoading(false);
        setUserInput("");
        return;
      }
      const imageArray = await ImageApi(poseNameArray);
      set_ImageData(imageArray);
    };
    fetchImages();
  }, [gptResponse]);

  const handleChange = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const healthProblem = userInput;
      if (!healthProblem) {
        console.log("enter somethindg");
        setIsLoading(false);
        setUserInput("");
        return;
      }

      await OpenAiApi(healthProblem);
      if (!gptResponse) {
        console.log("gpt api not responding ");
        setIsLoading(false);
        setUserInput("");
        return;
      }

      setIsLoading(false);
      sethp(userInput);
      setUserInput("");
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div>
      <div className="SearchSection border-2 flex flex-col items-center min-h-screen bg-gray-100 z-0 ">
        <img className="mt-11 w-1/3" src={logo} alt="" />

        <form
          className="searchForm  m-4 mt-5 p-3 w-4/5 flex flex-col items-center gap-y-5 "
          onSubmit={handleChange}
        >
          <input
            className="searchBar w-1/2 border border-zinc-950  px-4 py-2 rounded-3xl shadow md:shadow-lg hover:border-neutral-50"
            type="text"
            placeholder="Enter your Health Issue.."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input
            className="searchButton px-9 py-1 rounded-3xl  bg-[#606C5D] text-white transition duration-200 ease-in-out transform hover:scale-110 hover:bg-[#E1ECC8]  hover:text-black shadow-lg"
            type="submit"
            value={"Search"}
          />
        </form>
        <div>{isLoading && <Spinner />}</div>

        {_ImageData && <CardSection poseData={_ImageData} healthProblem={hp} />}
      </div>
    </div>
  );
}
