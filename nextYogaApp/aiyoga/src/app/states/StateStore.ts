"use client"
import { create } from 'zustand'
interface YogaPose {
  PoseName: string;
  PoseDescription: string;
  PoseSteps: string[];
  Precautions: string[];
  Benefits: string[];
}

type Store = {
  responseArray:YogaPose[] | null;
  selectedCard:any | null;
  diseaseName:string | null;
  isFlipped: boolean;
  setSelectedCard:(value:any)=>void;
  setResponseArray:(value:YogaPose[])=>void;
  setDiseaseName:(value:string)=>void;
  setIsFlipped: (value:boolean)=>void;
}

const StateStore = create<Store>((set)=>({
  responseArray:null,
  diseaseName:null,
  isFlipped:false,
  selectedCard:null,
  setSelectedCard:(value)=>set({selectedCard:value}),
  setIsFlipped:(value)=>set({isFlipped:value}),
  setResponseArray:(value)=>set({responseArray:value}),
  setDiseaseName:(value)=>set({diseaseName: value})
}))

export default StateStore;