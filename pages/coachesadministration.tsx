import React, { VFC } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { QUERY_ALL_COACHES_PAGINATION } from "../graphql/coaches";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import ListSubheader from "@mui/material/ListSubheader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import AddCoachModal from "../components/coaches/AddCoachModal";
import { Button, ButtonGroup, Typography, Container } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { Coach } from "../generated/graphql-generated-types";
import { listOrderContext } from "../context/listOrderContext";

interface CoachesListProps {
  totalCoaches: number;
}

const CoachesList: VFC<CoachesListProps> = ({ totalCoaches }) => {
  const {
    order,
    setOrder,
    pagination,
    resetPagination,
    handleNextPageClick,
    handlePrevPageClick,
  } = React.useContext(listOrderContext);
  const { data, error, loading } = useQuery(QUERY_ALL_COACHES_PAGINATION, {
    variables: {
      skip: pagination,
      take: 10,
      orderBy: {
        name: order,
      },
    },
  });

  const [addCoach, setAddCoach] = React.useState<boolean>(false);

  if (loading) {
    return <div className={"loadingState"}>Loading...</div>;
  }

  if (error) {
    return <p>Error found when fetching data: {error.message}</p>;
  }

  const { coaches }: { coaches: Partial<Coach>[] } = data;

  return (
    <Container>
      <Box
        marginY={5}
        sx={{
          width: "100%",
          color: "var(--main-text-dark)",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Coaches
        </Typography>
        <List
          sx={{ color: "primary.dark", backgroundColor: "primary.light" }}
          component="ul"
          disablePadding
          aria-label="secondary coaches folder"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              className="custom_list_subheader"
            >
              <ArrowDropDownIcon onClick={() => setOrder("desc")} />{" "}
              <ArrowDropUpIcon onClick={() => setOrder("asc")} />
              <Button
                onClick={() => setAddCoach(true)}
                startIcon={<AddCircleIcon fontSize="medium" color="info" />}
              >
                Coach
              </Button>
            </ListSubheader>
          }
        >
          {coaches.map((coach: Coach) => {
            return (
              <ListItem button key={coach.id}>
                <Link href={`/coach/${coach.id}`} passHref>
                  <ListItemText
                    style={{ textTransform: "capitalize" }}
                    primary={coach.name}
                    className="itemList"
                  />
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Pagination
          onReset={resetPagination}
          onClickPrev={handlePrevPageClick}
          onClickNext={handleNextPageClick}
        />
      </Box>
      {addCoach && (
        <AddCoachModal
          isOpen={addCoach}
          order={order}
          onClose={() => setAddCoach(false)}
        />
      )}
    </Container>
  );
};

export default CoachesList;

interface PaginationProps {
  onClickPrev: () => void;
  onClickNext: () => void;
  onReset: () => void;
}

const Pagination: VFC<PaginationProps> = ({
  onClickPrev,
  onClickNext,
  onReset,
}) => {
  return (
    <ButtonGroup
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 5,
        alignItems: "center",
      }}
    >
      <Button
        onClick={onReset}
        variant="text"
        startIcon={<FirstPageIcon />}
      ></Button>
      <Button
        onClick={onClickPrev}
        variant="text"
        startIcon={<ArrowCircleLeftIcon />}
      ></Button>
      <Button
        onClick={onClickNext}
        variant="text"
        endIcon={<ArrowCircleRightIcon />}
      ></Button>
    </ButtonGroup>
  );
};
