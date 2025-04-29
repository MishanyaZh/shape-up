'use client';

import MuiSelect, {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export interface SelectOption<T extends string | number = string> {
  value: T;
  label: string;
}

interface CustomSelectProps<T extends string | number = string>
  extends Omit<SelectProps<T>, 'onChange'> {
  options: SelectOption<T>[];
  label?: string;
  onChange?: (value: T) => void;
}

export default function Select<T extends string | number = string>({
  options,
  label,
  onChange,
  value,
  ...props
}: CustomSelectProps<T>) {
  const labelId = `${label?.toLowerCase().replace(/\s+/g, '-')}-label`;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (onChange) {
      onChange(event.target.value as T);
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
          <MenuItem key={String(option.value)} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
