import React, { createContext, FC, useState } from "react";

interface ListOrderContextProps {
  order: "asc" | "desc";
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  pagination: number;
  resetPagination: () => void;
  handleNextPageClick: (value: number) => void;
  handlePrevPageClick: () => void;
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

  const handlePrevPageClick = () => {
    setPagination((prev) => {
      if (prev - 10 < 0) {
        return 0;
      } else {
        return prev - 10;
      }
    });
  };

  const handleNextPageClick = (totalCoaches: number) => {
    setPagination((prev) => {
      if (prev + 10 >= totalCoaches) {
        return 0;
      } else {
        return prev + 10;
      }
    });
  };

  return (
    <listOrderContext.Provider
      value={{
        order,
        setOrder,
        pagination,
        resetPagination,
        handlePrevPageClick,
        handleNextPageClick,
      }}
    >
      {children}
    </listOrderContext.Provider>
  );
};
