import CheckBox from "./Components/CheckBox";
import DisabledInputField from "./Components/DisabledInputField";
import InputField from "./Components/InputField";
import VariableObject from "../Objects/VariableObject";
import { Grid, Typography } from "@mui/material";
import { KeyGroup } from "./InputFilter";
import { useState } from "react";

export default function VariableGUI({ selectedObject }: { selectedObject: VariableObject }) {
  const guiBox = selectedObject.getGUIBox();

  const [name, setName] = useState(guiBox.name);
  const [value, setValue] = useState(guiBox.value);
  const position = guiBox.location;
  const isKnown = guiBox.isKnown;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.value.length <= 0) { return; }

    if (target.id === "Name") {
      selectedObject.getStorable().changeName(target.value);
    }

    if (target.id === "Value") {
      selectedObject.getStorable().changeValue(target.value);
    }
  }

  return (
    <Grid container spacing={1} direction="column">
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Variable Object</Typography>
      </Grid>
      <Grid item >
        {guiBox.isKnown
          ? <DisabledInputField name="Name" value={name} />
          : <InputField name="Name" value={name} keyGroup={KeyGroup.ALPHANUMERIC} setValue={setName} onBlur={onBlur} />
        }
      </Grid>
      <Grid item >
        {guiBox.isKnown
          ? <DisabledInputField name="Value" value={value} />
          : <InputField name="Value" value={value} keyGroup={KeyGroup.ALPHANUMERIC} setValue={setValue} onBlur={onBlur} />
        }
      </Grid>
      <Grid item container direction='row' justifyContent="space-around">
        <Grid item xs={5}>
          <DisabledInputField name="X" value={position.x.toString()} />
        </Grid>
        <Grid item xs={5}>
          <DisabledInputField name="Y" value={position.y.toString()} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CheckBox name="IsKnown" value={isKnown} />
      </Grid>
    </Grid>
  );
}
