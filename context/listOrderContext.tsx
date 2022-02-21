import React, { createContext, FC, useState } from "react";

interface ListOrderContextProps {
  order: "asc" | "desc";
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  pagination: number;
  setPagination: React.Dispatch<React.SetStateAction<number>>;
  resetPagination: () => void;
}

export const listOrderContext = createContext<ListOrderContextProps | null>(
  null
);

export const ListOrderContextProvider: FC = ({ children }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [pagination, setPagination] = useState<number>(0);

  const resetPagination = () => {
    setPagination(0);
  };
  return (
    <listOrderContext.Provider
      value={{ order, setOrder, pagination, setPagination, resetPagination }}
    >
      {children}
    </listOrderContext.Provider>
  );
};
