import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// eslint-disable-next-line react/prop-types
export default function BasicSelect({ name, value, onChange, fieldValues=[] }) {
  return (
    <Box sx={{ width: "40%", margin: "1rem auto", minWidth: "15rem" }}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-select-label`}>{name}</InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          value={value}
          label={name}
          onChange={onChange}
          name={name}
          required
        >
          <MenuItem value="">
            <em>Select {name}</em>
          </MenuItem>
          {fieldValues?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
