import Boom from '@hapi/boom'

function formatError({ message, ...err }, stack) {
  const error = { ...err, error: message, statusError: err.error }
  return { ...error, stack }
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    return next(Boom.badImplementation(err))
  }
  return next(err)
}
function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err

  res
    .status(statusCode)
    .json({ success: false, ...formatError(payload, err.stack, err.data) })
}

export { wrapErrors, errorHandler }
