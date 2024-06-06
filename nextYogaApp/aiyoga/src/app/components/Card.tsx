import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import foto from './sitting.jpg';
import StateStore from '../states/StateStore'
const YogaCard = ({ PoseName, PoseDescription, PoseSteps, Precautions, Benefits, PoseId }: any) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const { selectedCard, setSelectedCard } = StateStore();



    const showCardDetails = (data: any) => {
        // console.log(data.target);
        // setIsFlipped(!isFlipped);
        setSelectedCard(PoseName)
    };
    return (
        <div id={PoseId} className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer hover:border-green-500 border border-green-700" onClick={showCardDetails} >
            <div className={`bg-gradient-to-r from-[#00ca41] via-[#007a2f] to-[#009e36] p-1 rounded `} > 

                <div className={`rounded`}>
                    <Image src={foto} alt={PoseName} className="w-full h-64 object-cover rounded" />
                    <div className="px-6 py-4  bg-[#ecfff3] ">
                        <div className="font-bold text-xl mb-2">{PoseName}</div>
                        <p className="text-gray-700 text-base line-clamp-2">{PoseDescription}</p>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default YogaCard;

{/* Back of the card */ }



{/* <div className={`bg-white ${isFlipped ? "block" : "hidden"} h-full`}>
                    <div className="px-6 py-4 h-full">
                        <div className="font-bold text-xl mb-2">{PoseName}</div>
                        <ul className="text-gray-700 text-base">
                            {PoseSteps.map((step: string, index: number) => (
                                <li key={index}>{index + 1}. {step}</li>
                            ))}
                        </ul>
                        <div className='mt-2 p-2 '>Precautions: <span className='italic text-blue-300'>{Precautions}</span></div>
                        <div> benefits:
                            <ul>
                                {Benefits.map((benefit: string, index: number) => (
                                    <li className='italic text-green-300' key={index}>{index + 1}. {benefit}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={toggleFlip}
                        >
                            Close
                        </button>
                    </div>
                </div> */}
