import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { temp_C, temp_F, temp_K } from "../../utils/typeOfTemperature";
export default function SelectTypeTemp({
  typeTemp,
  setTypeTempHendler,
  className,
}) {
  return (
    <ToggleButtonGroup
      value={typeTemp}
      exclusive
      onChange={setTypeTempHendler}
      className={className}
    >
      <ToggleButton
        value={temp_C}
        disabled={temp_C === typeTemp}
        children={"С"}
      />
      <ToggleButton
        value={temp_F}
        disabled={temp_F === typeTemp}
        children={"F"}
      />
      <ToggleButton
        value={temp_K}
        disabled={temp_K === typeTemp}
        children={"K"}
      />
    </ToggleButtonGroup>
  );
}
