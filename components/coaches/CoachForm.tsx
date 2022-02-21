import React, { VFC } from "react";
import { Coach } from "../../generated/graphql-generated-types";
import { InputUpdate } from "../../pages/coach/[coachId]";
import { Grid, Input } from "@mui/material";
import { EditRounded } from "@mui/icons-material";

interface CoachFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  coach: Coach;
  editing: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputUpdate: InputUpdate;
  onEditing: (value: null | string) => void;
  onSetEditing: (value: string) => void;
}

export const CoachForm: VFC<CoachFormProps> = ({
  onSubmit,
  coach,
  editing,
  onInputChange,
  inputUpdate,
  onEditing,
  onSetEditing,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        flexDirection={"column"}
        alignContent={"flex-start"}
        rowGap={1}
      >
        <div className="title">Coach: {coach.name}</div>
        <Grid container flexDirection="row" columnGap={1} rowGap={2}>
          {Object.keys(coach)
            .slice(1, -1)
            .map((info: keyof Coach) => {
              return (
                <Grid
                  item
                  key={info}
                  xs={3}
                  style={{
                    borderBottom: "1px black solid",
                    paddingBottom: 5,
                  }}
                >
                  {editing === info ? (
                    <InputField
                      info={info}
                      inputUpdate={inputUpdate}
                      onInputChange={onInputChange}
                      onEditing={onEditing}
                    />
                  ) : (
                    <TextField
                      coach={coach}
                      info={info}
                      onEditing={() => onSetEditing(info)}
                    />
                  )}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </form>
  );
};

interface InputFieldProps {
  info: keyof Coach;
  inputUpdate: InputUpdate;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditing: (value: string | null) => void;
}

const InputField: VFC<InputFieldProps> = ({
  info,
  inputUpdate,
  onInputChange,
  onEditing,
}) => {
  return (
    <Input
      placeholder={info}
      value={inputUpdate[info]}
      color="primary"
      size="small"
      disableUnderline
      onChange={onInputChange}
      name={info}
      autoFocus
      onBlur={() => onEditing(null)}
      onKeyDown={(e) => {
        if (e.code === "Escape") {
          onEditing(null);
        }
      }}
    />
  );
};

interface TextFieldProps {
  info: keyof Coach;
  coach: Coach;
  onEditing: (value: string) => void;
}

const TextField: VFC<TextFieldProps> = ({ info, coach, onEditing }) => {
  return (
    <div id="field" className="field">
      <pre>{info}</pre>
      <div>
        {coach[info]}
        {info !== "id" && (
          <EditRounded
            id="editingIcon"
            color="primary"
            fontSize="small"
            onClick={() => onEditing(info)}
          />
        )}
      </div>
    </div>
  );
};
