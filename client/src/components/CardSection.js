import logo from "../assets/images/sitting.jpg";
function ImageCard({
  heading,
  description,
  thumbnailSrc,
  thumbnailAlt = "Image",
}) {
  return (
    <div className="card rounded-lg shadow-sm border-2 border-zinc-950 place-content-center flex flex-col justify-centre  bg-[#aec3b0]">
      <div className="image  overflow-hidden rounded-lg ">
        <img
          className="w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg h-auto"
          src={thumbnailSrc}
          alt={thumbnailAlt}
        />
      </div>

      <div className="info  m-2 text-justify p-3 border-b-">
        <div className="heading  flex justify-center relative">
          <h3 className="border font-open tracking-wide bg-[#002D25] bg-opacity-90 absolute -top-10 rounded-full w-full text-center px-3 py-1 font-bold text-white truncate">
            {heading}
          </h3>
        </div>
        <div className="description tracking-wide font-normal ">
          <p>{description}</p>
        </div>
      </div>

      <div className="buttons flex place-content-evenly m-2 ">
        <button className="bg-[#1E3549] text-white mx-2 rounded py-1 px-3 hover:bg-[#304B42]">
          how to do
        </button>
        <button className="bg-sky-500 text-white mx-2  rounded py-1 px-3 hover:bg-sky-600">
          learn more
        </button>
      </div>
    </div>
  );
}
function CardSection(props) {
  if (!props.poseData || props.poseData.length <= 0) {
    return <></>;
  }

  return (
    <div className="bg-grey-100 font-normal">
      <h2 className="w-full text-2xl font-bold text-center">
        Yoga Poses to cure {props.healthProblem}
      </h2>
      <div className="grid gap-6 p-4 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        <>
          {props.poseData.map((pose, index) => {
            return (
              <ImageCard
                heading={pose.name}
                description="this asana is very beneficail for your health issue do 3 sets for 30 seconds and 2 times a day"
                thumbnailSrc={
                  pose.image ? `data:pose/jpeg;base64,${pose.image}` : logo
                }
                key={index}
              />
            );
          })}
        </>
      </div>
    </div>
  );
}

export default CardSection;
