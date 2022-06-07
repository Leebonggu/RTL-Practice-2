import { Dispatch, SetStateAction } from 'react';

export type OrderType = 'options' | 'products';

export type UpdateItemCount = (itemName: string, newItemCount: number, orderType: OrderType) => void;

export type UpdateItemHanlder = (itemName: string, newItemCount: number) => UpdateItemCount
export interface Item {
  name: string;
  imagePath: string;
  updateItemCount?: UpdateItemCount;
  orderType: OrderType;
}

export type Step = 0 | 1 | 2;

export type PageStep = { pageStep: Step; setStep: Dispatch<SetStateAction<Step>> };