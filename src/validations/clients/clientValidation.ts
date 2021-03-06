import * as yup from 'yup'

const clientValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required('name is required'),
        email: yup.string().required('email is required'),
        phone_number: yup
          .string()
          .required('phone is required'),
        intention: yup
          .string()
          .required('intention is required'),

      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}

export default clientValidator
