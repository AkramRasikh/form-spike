import React, {useEffect} from 'react'
import {object, arrayOf, func, string, bool} from 'prop-types'
import {useForm} from 'react-hook-form'
import FormButton from './form-button'
import InputError from './input-error'

const Form = ({
  fields,
  setFormValues,
  setFormStep,
  formValues,
  nextFormStep,
  formSubmitText,
  masterRequire,
}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({mode: 'onChange'})

  const onSubmit = data => {
    setFormValues(prev => ({...prev, ...data}))
    setFormStep(nextFormStep)
  }

  useEffect(
    () => () => {
      reset()
    },
    [fields],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      {fields.map(
        ({
          InputComponent,
          name,
          label,
          required,
          rules,
          pattern,
          validate,
          ...fieldProps
        }) => (
          <div key={name} className="input-container">
            <InputComponent
              name={name}
              label={label}
              defaultValue={formValues[name]}
              register={register(name, {
                required: masterRequire || required,
                validate,
                ...rules,
                pattern,
              })}
              {...fieldProps}
            />

            {errors[name] && <InputError errorMessage={errors[name].message} />}
          </div>
        ),
      )}
      <FormButton disabled={!isValid}>{formSubmitText}</FormButton>
    </form>
  )
}

Form.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  fields: arrayOf(object).isRequired,
  setFormValues: func.isRequired,
  setFormStep: func.isRequired,
  formSubmitText: string.isRequired,
  nextFormStep: string.isRequired,
  masterRequire: bool.isRequired,
}

export default Form
