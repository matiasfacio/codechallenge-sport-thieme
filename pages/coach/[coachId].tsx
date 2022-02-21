import React, { VFC } from "react";
import { useRouter, NextRouter } from "next/router";
import {
  QUERY_ONE_COACH,
  MUTATE_COACH,
  QUERY_ALL_COACHES,
  MUTATION_DELETE_COACH,
} from "../../graphql/coaches";
import {
  useMutation,
  ApolloClient,
  InMemoryCache,
  useReactiveVar,
  makeVar,
} from "@apollo/client";
import Grid from "@mui/material/Grid";
import {
  Button,
  ButtonGroup,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import CoachSpecialties from "../../components/coaches/CoachSpecialties";
import Link from "next/link";
import { Coach } from "../../generated/graphql-generated-types";
import { CoachForm } from "../../components/coaches/CoachForm";

export const listOfFavorites = makeVar([]);

export type InputUpdate = Record<string, string>;

type CoachList = {
  coach: Coach;
};

interface CoachProps {
  data: CoachList;
}

const Coach: VFC<CoachProps> = ({ data }) => {
  const router: NextRouter = useRouter();
  const [updateCoach] = useMutation(MUTATE_COACH);
  const [deleteCoach] = useMutation(MUTATION_DELETE_COACH);
  const [editing, setEditing] = React.useState<string | null>(null);
  const [inputUpdate, setInputUpdate] = React.useState<InputUpdate>({});
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const { coach } = data;

  const reloadPage = () => {
    router.push(`${router.asPath}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUpdate({ [e.target.name]: e.target.value });
  };

  const handleSetEditing = (info: string) => {
    setEditing(info);
    setInputUpdate({
      [info]: coach[info],
    });
  };

  const handleDeleteCoach = () => {
    setDeleteModalOpen(true);
  };

  const onDeleteCoach = () => {
    deleteCoach({
      variables: {
        where: {
          id: coach.id,
        },
      },
    });
    router.push("/coachesadministration");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputUpdate) {
      return;
    }
    const updatedInfo = Object.entries(inputUpdate)[0];
    updateCoach({
      variables: {
        data: {
          [updatedInfo[0]]: {
            set: updatedInfo[1],
          },
        },
        where: {
          email: coach.email,
        },
      },
      refetchQueries: [{ query: QUERY_ALL_COACHES }],
    });
    setInputUpdate({});
    setEditing(null);
    reloadPage();
  };

  if (data.coach === null) {
    return (
      <Container>
        <Box marginY={5}>
          <Link href="/coachesadministration" passHref>
            <Button variant="text" startIcon={<ArrowBackIosNew />}>
              Back
            </Button>
          </Link>
          <div>
            <pre>No data found</pre>
          </div>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box marginY={5}>
        <Link href="/coachesadministration" passHref>
          <Button variant="text" startIcon={<ArrowBackIosNew />}>
            Back
          </Button>
        </Link>
        <CoachForm
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          coach={coach}
          editing={editing}
          onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
          inputUpdate={inputUpdate}
          onEditing={(value) => setEditing(value)}
          onSetEditing={(value) => handleSetEditing(value)}
        />
        <MarkCoachAsFavorite coachId={coach.id} />
        <ButtonGroup size="small" fullWidth>
          {editing && (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => setEditing(null)}
            >
              Cancel Editing
            </Button>
          )}
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleDeleteCoach}
          >
            Delete Coach
          </Button>
        </ButtonGroup>
        {setDeleteModalOpen && (
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => onDeleteCoach()}
          />
        )}
        <CoachSpecialties
          knownSpecialties={coach.specialties}
          coachId={coach.id}
        />
      </Box>
    </Container>
  );
};

export default Coach;

interface MarkCoachAsFavoriteProps {
  coachId: number;
}

const MarkCoachAsFavorite: VFC<MarkCoachAsFavoriteProps> = ({ coachId }) => {
  const Favorites = useReactiveVar(listOfFavorites);

  const handleFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      listOfFavorites([...listOfFavorites(), coachId]);
    } else {
      const filterFavorites = Favorites.filter((id: number) => id !== coachId);
      listOfFavorites([...filterFavorites]);
    }
  };

  return (
    <FormControlLabel
      label="Mark as favorite"
      control={
        <Checkbox
          checked={Favorites.includes(coachId)}
          onChange={handleFavorite}
          name={"favorite"}
        />
      }
    />
  );
};

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: VFC<DeleteModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Delete Coach</DialogTitle>
      <DialogContent>You are about to delete a coach</DialogContent>
      <DialogActions>
        <Button color={"secondary"} onClick={onConfirm}>
          Confirm
        </Button>
        <Button color={"primary"} onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { coachId } = params;
  const client = new ApolloClient({
    uri: "http://localhost:3000/api",
    cache: new InMemoryCache(),
  });
  const result = await client.query({
    query: QUERY_ONE_COACH,
    variables: {
      where: {
        id: parseInt(coachId),
      },
    },
  });

  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: result.data,
    },
  };
};
