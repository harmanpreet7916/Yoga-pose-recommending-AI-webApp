
export async function POST(req: Request) {
    const { input } = await req.json()
   console.log("hello world")
    console.log(input)





    return new Response("stream")
}