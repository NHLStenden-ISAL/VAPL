import { useState } from "react";
import EvaluateObject from "../Objects/Arithmetic/EvaluateObject";
import { Grid, TextField, Typography } from "@mui/material";
import { KeyGroup } from "./InputFilter";
import DisabledInputField from "./Components/DisabledInputField";
import InputField from "./Components/InputField";
import CheckBox from "./Components/CheckBox";
import PositionArea from "./Components/PositionArea";

export default function EvaluateGUI({ selectedObject }: { selectedObject: EvaluateObject }) {
  const guiBox = selectedObject.getDataContainer();

  const [statement, setStatement] = useState(guiBox.statement);
  const [name, setName] = useState(guiBox.name);
  const position = guiBox.location;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.value.length <= 0) { return; }

    if (target.id === 'Evaluate') {
      selectedObject.getStorable().changeName(target.value);
    }
    else if (target.id === 'Statement') {
      selectedObject.changeStatement(target.value);
    }
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant='h6' p={2}> Evaluate Object</Typography>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          {guiBox.isKnown
            ? <DisabledInputField name="Evaluate" value={name} />
            : <InputField name="Evaluate" value={name} keyGroup={KeyGroup.ALPHANUMERIC} setValue={setName} onBlur={onBlur} />
          }
        </Grid>
        <Grid item>
          <Typography variant='body1'>Which equals</Typography>
        </Grid>
        <Grid item p={1}>
          <TextField fullWidth
            id='Statement'
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            onBlur={(e) => onBlur(e.target)}
          />
        </Grid>
        <Grid item>
          <PositionArea position={position} />
        </Grid>
        <Grid item xs={12}>
          <CheckBox name="IsKnown" value={false} />
        </Grid>
      </Grid>
    </Grid>
  )
}