import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  MUTATION_CREATE_COACH,
  QUERY_ALL_COACHES,
} from "../../graphql/coaches";
import { useMutation } from "@apollo/client";
import { Input, InputLabel, FormControl } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Coach } from "../../generated/graphql-generated-types";
import { useRouter } from "next/router";

const initialValue: Partial<Coach> = {
  name: "",
  email: "",
  phone: "",
  street: "",
  streetNumber: "",
  zip: "",
  city: "",
  website: "",
  specialties: [],
  posts: [],
};

export default function AddCoachModal({
  isOpen = false,
  onClose,
  order = "asc",
}) {
  const [createCoach] = useMutation(MUTATION_CREATE_COACH);
  const [formData, setFormData] = useState(() => initialValue);
  const router = useRouter();

  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData(initialValue);
  };

  const handleSubmitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCoach({
      variables: { data: formData },
      refetchQueries: [
        {
          query: QUERY_ALL_COACHES,
          variables: {
            orderBy: {
              name: order,
            },
          },
        },
      ],
    });
    resetForm();
    onClose();
    router.push("/coachesadministration");
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"}>
        <DialogTitle>Create a new coach</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitFormData} style={{ marginTop: 30 }}>
            <Grid
              container
              justifyContent={"center"}
              rowGap={3}
              maxWidth={"md"}
              margin={0}
            >
              <Grid container flexDirection={"row"} columnGap={1}>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor={"name"} color="primary" shrink={true}>
                      Name
                    </InputLabel>
                    <Input
                      id="name-input"
                      placeholder={"Name"}
                      value={formData.name}
                      color="primary"
                      size="small"
                      type="text"
                      onChange={handleInputData}
                      name={"name"}
                      autoFocus
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor={"email"} color="primary" shrink={true}>
                      Email
                    </InputLabel>
                    <Input
                      id="email-input"
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputData}
                      size="small"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor={"phone"} color="primary" shrink={true}>
                      Phone
                    </InputLabel>
                    <Input
                      id="phone-input"
                      placeholder="Phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputData}
                      size="small"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container flexDirection={"row"} columnGap={1}>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel
                      htmlFor={"street"}
                      color="primary"
                      shrink={true}
                    >
                      Street
                    </InputLabel>
                    <Input
                      id="street-input"
                      placeholder="Street"
                      name="street"
                      type="text"
                      value={formData.street}
                      onChange={handleInputData}
                      size="small"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel
                      htmlFor={"streetNumber"}
                      color="primary"
                      shrink={true}
                    >
                      Street number
                    </InputLabel>
                    <Input
                      id="streetNumber-input"
                      placeholder="Street Number"
                      name="streetNumber"
                      type="text"
                      value={formData.streetNumber}
                      onChange={handleInputData}
                      size="small"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor={"zip"} color="primary" shrink={true}>
                      Zip Code
                    </InputLabel>
                    <Input
                      id="zip-input"
                      placeholder="Zip Code"
                      name="zip"
                      type="text"
                      value={formData.zip}
                      onChange={handleInputData}
                      size="small"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor={"city"} color="primary" shrink={true}>
                      City
                    </InputLabel>
                    <Input
                      id="city-input"
                      placeholder="City"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputData}
                      size="small"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container style={{ marginBottom: 24 }}>
                <Grid item>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel
                      htmlFor={"website"}
                      color="primary"
                      shrink={true}
                    >
                      Website
                    </InputLabel>
                    <Input
                      id="website-input"
                      placeholder="Website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleInputData}
                      size="small"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Create Coach
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
