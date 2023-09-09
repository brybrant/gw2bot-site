export default ({ $axios, error: nuxtError }) => {
  // $axios.defaults.timeout = 10000

  $axios.onError((error) => {
    if (!error.response) {
      return nuxtError({
        statusCode: 500,
        message: error.message
      })
    }

    if (error.response.data) {
      if (error.response.data.message) {
        error.message = error.response.data.message
      }
      if (error.response.data.cause) {
        error.cause = error.response.data.cause
      }
    }

    return nuxtError(error)
  })
}
