import TextInput from '../components/form/text-input'
import SelectInput from '../components/form/select-input'

export default {
  fields: [
    {
      name: 'startDate',
      label: 'Start date',
      helperText: 'Required for "Employees"',
      type: 'text',
      pattern: {
        value: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        message: 'Please enter a valid date. DD/MM/YYYY',
      },
      InputComponent: TextInput,
    },
    {
      name: 'department',
      label: 'Department',
      required: true,
      message: 'A Department must be selected',
      options: ['', 'HR', 'Engineering', 'Sales'],
      type: 'select',
      InputComponent: SelectInput,
    },
  ],
  nextFormStep: 'payrollForm',
}
