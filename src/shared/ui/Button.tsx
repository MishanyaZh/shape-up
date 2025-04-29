import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)({
  textAlign: 'center',
  justifyContent: 'center',
  '& .MuiButton-label': {
    textAlign: 'center',
  },
});

export default function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}
