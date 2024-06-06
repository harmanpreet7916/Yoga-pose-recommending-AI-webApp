import Image from 'next/image'
import React from 'react'
import foto from './sitting.jpg'

export default function HoveringDetailedCard({ PoseName, PoseDescription, PoseSteps, Precautions, Benefits, closeModal }: any) {
    return (
        <div className=" p-4 rounded h-2/3 w-2/3 object-contain bg-purple-500 bg-opacity-30 backdrop-blur-lg ">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold">{PoseName}</h1>
                <button onClick={closeModal} className="text-red-500 text-xl font-bold">X</button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4  bg-white ">
                {/* Left Column */}

                <div className="flex flex-col">

                    <div className="flex-grow h-2/3 bg-gray-300">
                        {/* Replace the src with the actual image source */}
                        <Image src={foto} alt={PoseName} className="object-cover h-full w-full" />
                    </div>
                    <div className="Description">
                        <p className="text-gray-700 text-base">{PoseDescription}</p>
                    </div>

                </div>
                {/* Right Column */}
                <div className="flex flex-col">
                    <div className="flex-grow bg-blue-200 bg-opacity-50 p-4">
                        <h1 className="text-xl font-bold">Follow These steps: </h1>
                        <ul className="text-gray-700 text-base">
                            {PoseSteps.map((step: string, index: number) => (
                                <li key={index}>{index + 1}. {step}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-4 flex  flex-col">

                        <div className="benefits">
                            <h1 className="text-l font-bold">Benefits:</h1>
                            <ul>
                                {Benefits.map((benefit: string, index: number) => (
                                    <li className='italic text-green-500' key={index}>{index + 1}. {benefit}</li>
                                ))}
                            </ul>
                        </div>
                        { }
                        {(Precautions !== undefined && Precautions !== null && Precautions !== "" && Precautions.length > 0) &&
                            <div className="precautions">
                                <h1 className="text-l font-bold">Precautions<span className='text-red-500'>*</span>:</h1>
                                <p className="text-gray-700  text-sm ">{Precautions}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}



// <div className="flex justify-between">
//                 <h1 className="text-xl font-bold">{PoseName}</h1>
//                 <button onClick={closeModal} className="text-red-500 text-xl font-bold">X</button>
//             </div>
//             <div className="flex justify-between">
//                 <div className="w-1/2">
//                     <Image src={foto} alt={PoseName} className="w-full h-64 object-cover" />
//                 </div>
//                 <div className="w-1/2">
//                     <p className="text-gray-700 text-base line-clamp-1">{PoseDescription}</p>
//                 </div>
//             </div>
//             <div className="flex justify-between">
//                 <h1 className="text-xl font-bold">Steps</h1>
//                 <ul className="text-gray-700 text-base">
//                     {PoseSteps.map((step: string, index: number) => (
//                         <li key={index}>{index + 1}. {step}</li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="flex justify-between">
//                 <h1 className="text-xl font-bold">Precautions</h1>
//                 <p className="text-gray-700 text-base line-clamp-1">{Precautions}</p>
//             </div>
//             <div className="flex justify-between">
//                 <h1 className="text-xl font-bold">Benefits</h1>
//                 <ul>
//                     {Benefits.map((benefit: string, index: number) => (
//                         <li className='italic text-green-300' key={index}>{index + 1}. {benefit}</li>
//                     ))}
//                 </ul>
//             </div>