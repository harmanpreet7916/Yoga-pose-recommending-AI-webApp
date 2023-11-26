export default function ExtractNames(response) {
  const poseNames = [];
  if (!response || response === null) {
    return poseNames;
  }
  if (typeof response !== "string" || !response.trim()) {
    return poseNames;
  }
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
