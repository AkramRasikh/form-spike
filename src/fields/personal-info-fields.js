import TextInput from '../components/form/text-input'
import SelectInput from '../components/form/select-input'
import {checkEmail} from './validation-helper-methods'

export default {
  fields: [
    {
      name: 'role',
      label: 'Role',
      required: true,
      options: ['', 'Employee', 'Contractor', 'Admin'],
      type: 'select',
      InputComponent: SelectInput,
    },
    {
      name: 'email',
      label: 'Email',
      required: true,
      rules: {
        validate: checkEmail,
      },
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: 'Entered value does not match an email format',
      },
      type: 'email',
      InputComponent: TextInput,
    },
    {
      name: 'firstName',
      label: 'First Name',
      required: true,
      rules: {
        minLength: {
          value: 3,
          message: 'Must be at least 3 letters',
        },
        maxLength: {
          value: 20,
          message: 'Must be at max 20 letters',
        },
      },
      type: 'text',
      InputComponent: TextInput,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      required: true,
      rules: {
        minLength: {
          value: 3,
          message: 'Must be at least 3 letters',
        },
        maxLength: {
          value: 20,
          message: 'Must be at max 20 letters',
        },
      },
      type: 'text',
      InputComponent: TextInput,
    },
  ],
  nextFormStep: 'employmentForm',
}
