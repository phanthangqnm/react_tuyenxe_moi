import { atom } from "jotai";
import {
  atomFamily
} from "jotai/utils";

import {
  TuyenXe, GioChay, Customers
} from "./types";
import { requestWithFallback } from "./utils/request";


export const userInfoKeyState = atom(0);

export const tuyenXeState = atom(() =>
  requestWithFallback<TuyenXe[]>("/tuyenxe", [])
);

export const gioChayState = atom(() =>
  requestWithFallback<GioChay[]>("/giochay", [])
);

export const tabsState = atom(["Tất cả", "Nam", "Nữ", "Trẻ em"]);
export const selectedTabIndexState = atom(0);


// export const customersTuyenXeInfoState = atom(async (get) => {
//   const codeInfo = '22';

//   const customers = await requestWithFallback<
//     (Customers & { tuyenxeinfo_code: string })[]
//   >("/products?tuyenxeinfo_code='codeInfo'", []);
//   return products['products'].map((product) => ({
//     ...product,
//     category: categories.find(
//       (category: any) => category.id === product.categoryId
//     )!,
//   }));
// });

export const customersState = atom(() =>
  requestWithFallback<Customers[]>("/customers", [])
);

export const itemsCustomerAtom = atom<Record<number, Customers[]>>({});

export const customersTuyenXeInfoState = atomFamily((codeInfo: String) =>
  atom(async (get) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const customers = await get(customersState);
    return customers.filter((cus: any) => String(cus.tuyenxeinfo_code) === codeInfo);
  })
);

// const customersTuyenXeInfoState = atomFamily((code: string) => 
//   atom(async () => {
//     if (!code) return [];
//     const res = await fetch(`/api/customers?code=${code}`);
//     return await res.json();
//   })
// );