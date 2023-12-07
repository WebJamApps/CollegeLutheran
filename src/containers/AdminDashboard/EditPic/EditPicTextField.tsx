import { TextField } from '@mui/material';

interface IeditPicTextFieldProps {
  value: string,
  label: string,
  onChange: (arg0:any) => any
}
export function EditPicTextField(props: IeditPicTextFieldProps) {
  const { value, onChange, label } = props;
  return (
    <TextField
      sx={{ marginTop: '20px' }}
      label={label}
      type="text"
      fullWidth
      value={value}
      onChange={onChange}
    />
  );
}
