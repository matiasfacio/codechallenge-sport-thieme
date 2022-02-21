import { useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
import React, { createContext, FC, useState } from "react";
import { QUERY_ALL_COACHES_UNORDED } from "../graphql/coaches";

interface ListOrderContextProps {
  order: "asc" | "desc";
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  pagination: number;
  resetPagination: () => void;
  handleNextPageClick: () => void;
  handlePrevPageClick: () => void;
}

export const listOrderContext = createContext<ListOrderContextProps | null>(
  null
);

const client = new ApolloClient({
  uri: "http://localhost:3000/api",
  cache: new InMemoryCache(),
});

const result = await client.query({
  query: QUERY_ALL_COACHES_UNORDED,
});

const totalCoaches = result.data.coaches.length;

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

  const handleNextPageClick = () => {
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
