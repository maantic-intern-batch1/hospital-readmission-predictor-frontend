import { TextField } from "@mui/material";

// eslint-disable-next-line react/prop-types
const InputText = ({ name, value, onChange }) => {
  return (
    <TextField
      name={name}
      sx={{ width: "40%", minWidth: "15rem", margin: "1rem auto" }}
      value={value}
      onChange={onChange}
      label={name}
      required
      type="number"
    />
  );
};

export default InputText;
