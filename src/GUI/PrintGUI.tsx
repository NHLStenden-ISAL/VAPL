import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PositionArea from "./Components/PositionArea";
import PrintObject from "../Objects/PrintObject";

export default function PrintGUI({ selectedObject }: { selectedObject: PrintObject }) {
  const guiBox = selectedObject.getDataContainer();

  const [statement, setStatement] = useState(guiBox.statement);
  const position = guiBox.location;

  const onBlur = (target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
    if (target.value.length <= 0) { return; }

    selectedObject.getStorable().changeValue(target.value);
  }

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item alignSelf='center'>
        <Typography variant="h6" p={2}> Print Object</Typography>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <Typography variant="body1">Variable name</Typography>
        </Grid>
        <Grid item p={1}>
          <TextField fullWidth
            id="If"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            onBlur={(e) => onBlur(e.target)}
          />
        </Grid>
        {/* <Grid item >
          <Typography variant="body1">is true, turn {Direction[guiBox.direction].toLowerCase()}</Typography>
        </Grid> */}
      </Grid>
      <Grid item>
        <PositionArea position={position} />
      </Grid>

    </Grid>
  );
}