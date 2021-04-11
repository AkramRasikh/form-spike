import TextInput from '../components/form/text-input'

export default {
  fields: [
    {
      name: 'salary',
      label: 'Salary',
      helperText: 'Only needed for "Employees"',
      required: 'required',
      type: 'text',
      pattern: {
        value: /^\d*(\.\d{0,2})?$/,
        message: 'Entered value does not match salary',
      },
      InputComponent: TextInput,
    },
  ],
  nextFormStep: 'createPayroll',
}
