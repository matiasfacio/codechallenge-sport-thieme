import React, { VFC } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  QUERY_SPECIALTIES,
  MUTATE_ADD_COACH_TO_SPECIALTY,
  QUERY_ONE_COACH,
} from "../../graphql/coaches";
import { useQuery, useMutation } from "@apollo/client";
import { Specialty } from "../../generated/graphql-generated-types";
import { BeatLoader } from "react-spinners";

interface CoachSpecialtiesProps {
  knownSpecialties: Specialty[];
  coachId: number;
}

const CoachSpecialties: VFC<CoachSpecialtiesProps> = ({
  knownSpecialties,
  coachId,
}) => {
  const { data, loading, error } = useQuery(QUERY_SPECIALTIES);
  const [updateSpecialty] = useMutation(MUTATE_ADD_COACH_TO_SPECIALTY);
  const [specialtiesSelected, setSpecialties] = React.useState(() =>
    knownSpecialties.map((specialty: Specialty) => specialty.name)
  );

  if (loading) {
    return <BeatLoader color={"#0054a6"} />;
  }

  if (error) {
    return <pre>Error loading specialties: {error.message}</pre>;
  }
  let specialtiesAvailable: Specialty["name"][];

  if (data) {
    specialtiesAvailable = data.specialties.map(
      (specialty: Specialty) => specialty.name
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let connect_disconnect: "connect" | "disconnect";

    if (specialtiesSelected.includes(event.target.name)) {
      connect_disconnect = "disconnect";
      setSpecialties((prev) => prev.filter((t) => t !== event.target.name));
    } else {
      setSpecialties((prev) => [...prev, event.target.name]);
      connect_disconnect = "connect";
    }
    updateSpecialty({
      variables: {
        data: {
          coaches: {
            [connect_disconnect]: {
              id: coachId,
            },
          },
        },
        where: {
          id: specialtiesAvailable.indexOf(event.target.name) + 1,
        },
      },
      refetchQueries: [
        {
          query: QUERY_ONE_COACH,
          variables: {
            where: {
              id: coachId,
            },
          },
        },
      ],
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Manage Specialties</FormLabel>
        <FormGroup row>
          {specialtiesAvailable.map((sp: string) => {
            const checked = specialtiesSelected.includes(sp);
            return (
              <FormControlLabel
                key={sp}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={sp}
                  />
                }
                label={sp}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CoachSpecialties;
