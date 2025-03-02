import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

export default function CustomButton(props: ButtonProps) {
  return <Button variant="contained" color="primary" {...props} />;
}
