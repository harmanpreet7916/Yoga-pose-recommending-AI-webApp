import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.API_KEY}`);

export async function POST(req: Request, res: Response) {
    // gpt model define for text 
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { diseaseDescription } = await req.json();
    console.log(diseaseDescription);

    const prompt = `i am suffering from " +${diseaseDescription}+". suggest 6 yoga poses that can cure my health problem The suggested poses should take into account every aspect of my health issue and be tailored to my unique body condition.  list names of yoga poses in the following parsable JSON format:
    [
        {
            "PoseName": "Yoga pose Name ",
            "PoseDescription": "basic description of the pose",
            "PoseSteps":  ["1st step", "2nd step", "nth step"],
            "Precautions": ["precaution1", "precaution2", "precaution-n"],
            "Benefits": ["benefit1", "benefit2", "benefit-n"]
        }
    ]

    don't give any description or any heading.`;

    try {
        const result = await model.generateContent([prompt]);
        const response = result.response;
        const text = await response.text();
        const posesArray = JSON.parse(text);

        // console.log(posesArray);
        return new Response(JSON.stringify({ posesArray }));

    } catch (error: any) {
        // console.log(error);
        return new Response(error);
    }
}
