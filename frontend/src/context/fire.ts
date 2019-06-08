import * as React from 'react';

export interface IFire {
  id: number;
  image: string;
  content: string;
  position: string;
  keywords: string;
  sentiment: string;
  weight: number;
  star: number;
}

export interface IFirePut {
  image: string;
  content: string;
  position: string;
}

export interface IFireData {
  data: {
    fires: IFire[],
    listOpen: boolean,
    selectedId: number
  },
  functions: {
    getFires: (position: string) => void,
    likeFire: (id: number) => void,
    dislikeFire: (id: number) => void,
    addFires: (fire: IFirePut) => void,
    setListOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedId: React.Dispatch<React.SetStateAction<number>>
  }
}

export const FireDataContext: React.Context<null | IFireData> = React.createContext(null);
