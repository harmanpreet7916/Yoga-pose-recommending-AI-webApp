import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function POST(req: Request, res: Response) {

    const body = await req.json();
    console.log(body.hello);

    try {

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "you are the fanuc robot expert who know everything Use your knowledge base to best respond to customer queries giving every detail",
                },

                {
                    role: "user",
                    // content: `"${prompt} answer in 40-60 words"`,
                    content: `"${body.hello}"`,
                },
            ],
            model: "gpt-3.5-turbo",
        });

        const reply = completion.choices[0].message.content

        console.log(reply)


        return new Response(JSON.stringify(reply))
    }

    catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error))
    }


}