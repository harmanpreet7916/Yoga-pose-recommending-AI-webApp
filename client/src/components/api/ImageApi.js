export default async function ImageApi(imageNames) {
  if (imageNames) {
    try {
      const imageApiResponse = await fetch("http://localhost:3000/images", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ imageNames: imageNames }),
      });

      const response = await imageApiResponse.json();
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
