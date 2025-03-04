'use client';

import MuiSelect, {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps extends Omit<SelectProps, 'onChange'> {
  options: SelectOption[];
  label?: string;
  onChange?: (value: string) => void;
}

export default function Select({
  options,
  label,
  onChange,
  value,
  ...props
}: CustomSelectProps) {
  const labelId = `${label?.toLowerCase().replace(/\s+/g, '-')}-label`;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (onChange) {
      onChange(event.target.value as string);
    }
  };

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        label={label}
        value={value}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
