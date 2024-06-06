"use client";
import { useEffect, useState } from 'react';
import YogaCard from "../components/Card";
import StateStore from "../states/StateStore";
import HoveringDetailedCard from '../components/HoveringDetailedCard';

interface YogaPose {
    PoseName: string;
    PoseDescription: string;
    PoseSteps: string[];
    Precautions: string[];
    Benefits: string[];
}

export default function ProductPage() {
    const [diseaseDescription, setDiseaseDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<YogaPose | undefined | null>(null);
    const [fadeClass, setFadeClass] = useState<string>('fade-in');
    const { responseArray, setResponseArray, selectedCard, setSelectedCard } = StateStore();

    useEffect(() => {
        if (responseArray) {
            const data = responseArray!.find(p => p.PoseName === selectedCard);
            setFadeClass('fade-in');
            setSelectedPhoto(data);
            if (data) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [selectedCard]);

    const getPoses = async () => {
        if (!isLoading) {
            setIsLoading(true);
            try {
                const diseaseCures = await fetch("api/cures", {
                    method: "POST",
                    body: JSON.stringify({
                        diseaseDescription: diseaseDescription
                    })
                });

                const response = await diseaseCures.json();
                setResponseArray(response.posesArray);
                setDiseaseDescription("");
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
            setSelectedCard(null);
        }
    };

    const closeModal = () => {
        setFadeClass('fade-out');
        setTimeout(() => {
            setSelectedPhoto(null);
            setSelectedCard(null);
        }, 300); // Match this timeout with the duration of fade-out animation
    };

    return (
        <div className="SearchSection flex flex-col items-center overflow-x-hidden">
            <div className="searchForm m-4 mt-10 p-3 w-4/5 flex flex-col items-center gap-y-5">
                <input
                    className="searchBar w-full md:w-2/3 lg:w-1/2 border border-zinc-950 px-4 py-2 rounded-3xl shadow md:shadow-lg hover:border-neutral-50"
                    type="text"
                    placeholder="I am suffering from diabetes but I also have back pain..."
                    value={diseaseDescription}
                    onChange={(e) => setDiseaseDescription(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            getPoses();
                        }
                    }}
                />
                <button
                    disabled={isLoading}
                    className={`searchButton px-9 py-1 rounded-3xl bg-[#606C5D] text-white transition duration-200 ease-in-out transform hover:scale-110 hover:bg-[#E1ECC8] hover:text-black shadow-lg disabled:bg-[#606C5D] disabled:cursor-not-allowed disabled:text-[#E1ECC8] disabled:shadow-none disabled:hover:scale-100 disabled:hover:bg-[#606C5D] disabled:hover:text-white disabled:transition-none disabled:ease-none disabled:duration-0 disabled:transform-none`}
                    type="submit"
                    onClick={getPoses}
                >
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
                {selectedPhoto && (
                    <div className={`inset-0 flex justify-center items-center w-full h-full z-0 ${fadeClass}`}>
                        <HoveringDetailedCard
                            PoseName={selectedPhoto.PoseName}
                            PoseDescription={selectedPhoto.PoseDescription}
                            PoseSteps={selectedPhoto.PoseSteps}
                            Precautions={selectedPhoto.Precautions}
                            Benefits={selectedPhoto.Benefits}
                            closeModal={closeModal}
                        />
                    </div>
                )}
                {responseArray && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                        {responseArray.map((pose: YogaPose, index: number) => (
                            <YogaCard
                                key={index}
                                PoseName={pose.PoseName}
                                PoseDescription={pose.PoseDescription}
                                PoseSteps={pose.PoseSteps}
                                Precautions={pose.Precautions}
                                Benefits={pose.Benefits}
                                PoseId={index}
                                onClick={() => setSelectedCard(pose.PoseName)} // Add onClick to set selected card
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// "use client"
// import { useEffect, useState } from 'react';
// import YogaCard from "../components/Card";
// import StateStore from "../states/StateStore";
// import HoveringDetailedCard from '../components/HoveringDetailedCard';

// interface YogaPose {
//     PoseName: string;
//     PoseDescription: string;
//     PoseSteps: string[];
//     Precautions: string[];
//     Benefits: string[];
// }

// export default function ProductPage() {
//     const [diseaseDescription, setDiseaseDescription] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedPhoto, setSelectedPhoto] = useState<YogaPose | undefined | null>(null);
//     const [fadeClass, setFadeClass] = useState<string>('fade-in');
//     const { responseArray, setResponseArray, selectedCard, setSelectedCard } = StateStore();

//     useEffect(() => {
//         if (responseArray) {
//             const data = responseArray!.find(p => p.PoseName === selectedCard);
//             setFadeClass('fade-in');
//             setSelectedPhoto(data);
            
//         }
//     }, [selectedCard]);

//     const getPoses = async () => {
//         if (!isLoading) {

//             setIsLoading(true);
//             try {
//                 const diseaseCures = await fetch("api/cures", {
//                     method: "POST",
//                     body: JSON.stringify({
//                         diseaseDescription: diseaseDescription
//                     })
//                 });

//                 const response = await diseaseCures.json();
//                 setResponseArray(response.posesArray);
//                 setDiseaseDescription("");
//             } catch (error) {
//                 console.error(error);
//             }
//             setIsLoading(false);
//         }

//     };

//     const closeModal = () => {
//         setFadeClass('fade-out');
//         setTimeout(() => {
//             setSelectedPhoto(null);
//             setSelectedCard(null);
//         }, 300); // Match this timeout with the duration of fade-out animation
//     };

//     return (
//         <div className="SearchSection  flex flex-col items-center  overflow-x-hidden">
//             <div className="searchForm  m-4 mt-10 p-3 w-4/5 flex flex-col items-center gap-y-5">
                

//                 <input
//                     className="searchBar w-full md:w-2/3 lg:w-1/2 border border-zinc-950 px-4 py-2 rounded-3xl shadow md:shadow-lg hover:border-neutral-50"
//                     type="text"
//                     placeholder="I am suffering from diabetes but I also have back pain..."
//                     value={diseaseDescription}
//                     onChange={(e) => setDiseaseDescription(e.target.value)}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter' && !e.shiftKey) {
//                             e.preventDefault();
//                             getPoses();
//                         }
//                     }}
//                 />
//                 <button
//                     disabled={isLoading}
//                     className={`searchButton px-9 py-1 rounded-3xl bg-[#606C5D] text-white transition duration-200 ease-in-out transform hover:scale-110 hover:bg-[#E1ECC8] hover:text-black shadow-lg disabled:bg-[#606C5D] disabled:cursor-not-allowed disabled:text-[#E1ECC8] disabled:shadow-none disabled:hover:scale-100 disabled:hover:bg-[#606C5D] disabled:hover:text-white disabled:transition-none disabled:ease-none disabled:duration-0 disabled:transform-none`}
//                     type="submit"
//                     onClick={getPoses}
//                 >
//                     {isLoading ? 'Loading...' : 'Search'}
//                 </button>
//                 {selectedPhoto && (
//                     <div className={` inset-0  flex justify-center items-center w-full h-full ${fadeClass}`}>

//                         <HoveringDetailedCard
//                             PoseName={selectedPhoto.PoseName}
//                             PoseDescription={selectedPhoto.PoseDescription}
//                             PoseSteps={selectedPhoto.PoseSteps}
//                             Precautions={selectedPhoto.Precautions}
//                             Benefits={selectedPhoto.Benefits}
//                             closeModal={closeModal}
//                         />

//                     </div>
//                 )}

//                 {responseArray &&
//                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
//                         {responseArray.map((pose: YogaPose, index: number) => (
//                             <YogaCard
//                                 key={index}
//                                 PoseName={pose.PoseName}
//                                 PoseDescription={pose.PoseDescription}
//                                 PoseSteps={pose.PoseSteps}
//                                 Precautions={pose.Precautions}
//                                 Benefits={pose.Benefits}
//                                 PoseId={index}
//                             />
//                         ))}
//                     </div>
//                 }

                
//             </div>
//         </div>
//     );
// }

// // "use client"
// // import { useEffect, useState } from 'react';
// // import YogaCard from "../components/Card"
// // import StateStore from "../states/StateStore"
// // import Image from 'next/image';
// // import foto from '../components/sitting.jpg';

// // interface YogaPose {
// //     PoseName: string;
// //     PoseDescription: string;
// //     PoseSteps: string[];
// //     Precautions: string[];
// //     Benefits: string[];
// // }
// // export default function ProductPage() {
// //     const [diseaseDescription, setDiseaseDescription] = useState('');
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [selectedPhoto, setSelectedPhoto] = useState<YogaPose | undefined | null>(null);
// //     const { responseArray, setResponseArray, selectedCard, setSelectedCard } = StateStore();

// //     useEffect(() => {
// //         console.log(responseArray);
// //         console.log(selectedCard)
// //         const data = responseArray!.find(p => p.PoseName === selectedCard);
// //         console.log(data);
// //         setSelectedPhoto(data)

// //     }, [selectedCard])



// //     const getPoses = async () => {
// //         setIsLoading(true);
// //         try {
// //             const diseaseCures = await fetch("api/cures", {
// //                 method: "POST",
// //                 body: JSON.stringify({
// //                     diseaseDescription: diseaseDescription
// //                 })
// //             })

// //             const response = await diseaseCures.json()
// //             console.log(response.posesArray)
// //             setResponseArray(response.posesArray);
// //             setDiseaseDescription("")
// //         } catch (error) {
// //             console.error(error);
// //         }
// //         setIsLoading(false);

// //     }





// //     return (

// //         <div className="SearchSection border-2 border-red-400 flex flex-col items-center  bg-gray-100 z-0 ">

// //             <div className="searchForm border border-green-600 m-4 mt-5 p-3 w-4/5 flex flex-col items-center gap-y-5 ">
// //                 <div>{isLoading && <>Loading....</>}</div>

// //                 <input
// //                     className="searchBar w-1/2 border border-zinc-950  px-4 py-2 rounded-3xl shadow md:shadow-lg hover:border-neutral-50"
// //                     type="text"
// //                     placeholder="I am suffering from dibeties but i also have backpain..."
// //                     value={diseaseDescription}
// //                     onChange={(e) => setDiseaseDescription(e.target.value)}
// //                     onKeyDown={(e) => {
// //                         if (e.key === 'Enter' && !e.shiftKey) {
// //                             e.preventDefault()
// //                             getPoses();
// //                         }
// //                     }
// //                     }
// //                 />
// //                 <button
// //                     disabled={isLoading}
// //                     className={`"searchButton px-9 py-1 rounded-3xl  bg-[#606C5D] text-white transition duration-200 ease-in-out transform hover:scale-110 hover:bg-[#E1ECC8]  hover:text-black shadow-lg disabled:bg-[#606C5D] disabled:cursor-not-allowed disabled:text-[#E1ECC8] disabled:shadow-none disabled:hover:scale-100 disabled:hover:bg-[#606C5D] disabled:hover:text-white disabled:transition-none disabled:ease-none disabled:duration-0 disabled:transform-none"`}
// //                     type="submit"
// //                     onClick={getPoses}>Search</button>

// //                 {responseArray &&
// //                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 '>
// //                         {
// //                             responseArray.map((pose: YogaPose, index: number) => (
// //                                 <YogaCard

// //                                     key={index}
// //                                     PoseName={pose.PoseName}
// //                                     PoseDescription={pose.PoseDescription}
// //                                     PoseSteps={pose.PoseSteps}
// //                                     Precautions={pose.Precautions}
// //                                     Benefits={pose.Benefits}
// //                                     PoseId={index}
// //                                 />
// //                             ))
// //                         }

// //                     </div>
// //                 }
// //                 {selectedPhoto && (
// //                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  w-full h-full ">
// //                         <div className="bg-white p-4 rounded w-1/2 h-1/2">
// //                             <h2 className="text-2xl font-bold mb-4">{selectedPhoto.PoseName}</h2>
// //                             <Image src={foto} className='w-full h-64 object-cover' alt={selectedPhoto.PoseName} />
// //                             <p>{selectedPhoto.PoseDescription}</p>
// //                             <button onClick={() => { setSelectedPhoto(null); setSelectedCard(null) }} className="mt-4 bg-blue-500 text-white p-2 rounded">
// //                                 Close
// //                             </button>
// //                         </div>
// //                     </div>
// //                 )}



// //             </div>


// //         </div >

// //     );
// // };





// // {/* <input value={diseaseDescription} onChange={(e) => setDiseaseDescription(e.target.value)} />
// //                 <button onClick={handleClick}>click me</button>
// //                 <div>outpout hre --=- ${cures}</div>
// //                 {isLoading && <div>Loading.. </div>} */}


// // {/* <table>
// //                         <thead>
// //                             <tr>
// //                                 <th>Pose Name</th>
// //                                 <th>Description</th>
// //                                 <th>Steps</th>
// //                                 <th>Precautions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {posesArray.map((pose, index) => (
// //                                 <tr key={index}>
// //                                     <td>{pose.PoseName}</td>
// //                                     <td>{pose.PoseDescription}</td>
// //                                     <td>
// //                                         <ul>
// //                                             {pose.PoseSteps.map((step, stepIndex) => (
// //                                                 <li key={stepIndex}>{step}</li>
// //                                             ))}
// //                                         </ul>
// //                                     </td>
// //                                     <td>
// //                                         <ul>
// //                                             {pose.Precautions.map((precaution, precautionIndex) => (
// //                                                 <li key={precautionIndex}>{precaution}</li>
// //                                             ))}
// //                                         </ul>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table> */}



// // // const handleSubmit = async (e: any) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);
// // //     try {
// // //         const res = await fetch('/api/cures', {
// // //             method: 'POST',
// // //             headers: {
// // //                 'Content-Type': 'application/json',
// // //             },
// // //             body: JSON.stringify({ description: diseaseDescription }),
// // //         });
// // //         const data = await res.json();
// // //         setCures(data);
// // //     } catch (error) {
// // //         console.error('Error fetching cures:', error);
// // //     } finally {
// // //         setIsLoading(false);
// // //     }
// // // };
