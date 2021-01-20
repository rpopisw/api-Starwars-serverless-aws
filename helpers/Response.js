/**
 * Class to handle responses back to Lambda
 *
 * @type {Response}
 */
export default class Response {
  /**
   * Pass the Lambda function that comes in the handler
   *
   * @param lambdaCallback
   * @public
   */
  constructor(lambdaCallback) {
    this.callback = lambdaCallback
    this._statusCode = 200
    this._headers = {}
    this._options = {}
  }

  /**
   * Change the status code
   *
   * @param statusCode
   * @returns {Response}
   */
  statusCode(statusCode) {
    if (statusCode === undefined) return this._statusCode
    this._statusCode = parseInt(statusCode)
    if (isNaN(this._statusCode)) this._statusCode = 500
    if (this._statusCode < 200 || this._statusCode > 599) this._statusCode = 500
    return this
  }

  /**
   * Get all headers, retrieve a header or add one/many headers
   *
   * @param key
   * @param value
   * @returns {*}
   */
  headers(key, value) {
    // If called empty it returns all the headers
    if (key === undefined && value === undefined) {
      return this._headers
    }

    // Set or return the key when it is a string
    if (typeof key === 'string') {
      if (value === undefined) {
        return this._headers[key.toLowerCase()] || null
      } else {
        this._headers[key.toLowerCase()] = value
        return this
      }
    }

    // Add multiple headers
    let headerNames = Object.keys(key)
    for (let i = 0; i < headerNames.length; i++) {
      let headerName = headerNames[i].toLowerCase()
      this._headers[headerName] = key[headerNames[i]]
    }

    return this
  }

  options(key, value) {
    // If called empty it returns all the options
    if (key === undefined && value === undefined) {
      return this._options
    }

    // Set or return the key when it is a string
    if (typeof key === 'string') {
      if (value === undefined) {
        return this._options[key] || null
      } else {
        this._options[key] = value
        return this
      }
    }

    // Add multiple options
    let optionsNames = Object.keys(key)
    for (let i = 0; i < optionsNames.length; i++) {
      let optionName = optionsNames[i]
      this._options[optionName] = key[optionsNames[i]]
    }

    return this
  }

  /**
   * Send the body as a response
   *
   * @param body
   * @public
   */
  send(body) {
    const { raw, ...rest } = this._options

    if (body === undefined) body = {}
    if (!raw) {
      if (typeof body !== 'object') body = { message: body }
      body = JSON.stringify(body || {})
    }

    this.callback(null, {
      statusCode: this._statusCode,
      body,
      headers: this._headers,
      ...rest
    })
  }

  /**
   * Fail with a 4XX statusCode
   *
   * @param body
   * @param statusCode
   * @public
   */
  fail(body, statusCode) {
    if (body === undefined) body = {}
    if (typeof body !== 'object') body = { message: body }
    this.statusCode(Math.abs(parseInt(statusCode || 400)) % 100 + 400).send(
      Object.assign(
        {
          message: 'Something went wrong'
        },
        body || {}
      )
    )
  }

  /**
   * Fail with a 5XX statusCode
   *
   * @param err
   * @param statusCode
   * @public
   */
  fail500(err, statusCode) {
    if (err === undefined) err = new Error("Called 'fail500' without error")
    if (!err) err = { message: 'Internal server error' }

    // Log the error to identify later
    if (err.stack) {
      console.error(err.stack)
    } else {
      console.error(err)
    }

    // Send a response in a proper format to the customer
    this.statusCode(Math.abs(parseInt(statusCode || 500)) % 100 + 500).send({
      message: 'Internal server error'
    })
  }
}