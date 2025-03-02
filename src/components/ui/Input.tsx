import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField';

export default function CustomInput(props: TextFieldProps) {
  return <TextField variant="outlined" color="primary" {...props} />;
}
