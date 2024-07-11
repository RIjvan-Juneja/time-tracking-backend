// import { Response } from 'express'

exports.generalResponse = (
  response,
  data = [],
  message = '',
  response_type = 'success',
  toast = false,
  statusCode = 200,
) => {
  response.status(statusCode).send({
    data: data,
    message: message,
    toast: toast,
    response_type: response_type,
  })
}

// export default generalResponse