/**
 * A Request type to easily send requests to services
 *
 * @type {Request}
 */
export default class Request {
  /**
   * Create the request by passing the event and context received
   * in the lambda handler. This class has methods to retrieve info
   * from those parameters
   *
   * @param event
   * @param context
   * @public
   */
  constructor(event, context) {
    this.event = event
    this.context = context
  }

  /**
   * Extract a value from an object using dot notation. It can
   * get nested objects
   *
   * @param obj
   * @param key
   * @param defaultValue
   * @returns {*}
   * @public
   */
  __get(obj, key, defaultValue) {
    if (!obj) return defaultValue === undefined ? null : defaultValue
    const path = key.split('.')
    for (let i = 0; i < path.length; i++) {
      if (typeof obj === 'object') {
        if (obj[path[i]]) {
          obj = obj[path[i]]
        } else {
          obj = defaultValue === undefined ? null : defaultValue
          break
        }
      } else {
        return defaultValue === undefined ? null : defaultValue
      }
    }
    return obj
  }

  /**
   * Get a value from a path variable
   *
   * @param key
   * @param defVal
   * @returns {*}
   * @public
   */
  path(key, defVal) {
    if (key === undefined) return this.event.pathParameters || {}
    return this.__get(this.event.pathParameters, key, defVal)
  }

  /**
   * Get a value from the body of the request
   *
   * @param key
   * @param defVal
   * @returns {*}
   * @public
   */
  post(key, defVal) {
    // Make sure that body is not a JSON string but an object
    // because AWS sends it as a JSON string
    if (this.event.body && typeof this.event.body === 'string') {
      try {
        this.event.body = JSON.parse(this.event.body)
      } catch (ex) {
        this.event.body = {}
      }
    }

    if (key === undefined) return this.event.body || {}
    return this.__get(this.event.body, key, defVal)
  }

  /**
   * Get a value from the query parameters
   *
   * @param key
   * @param defVal
   * @returns {*}
   * @public
   */
  query(key, defVal) {
    if (key === undefined) return this.event.queryStringParameters || {}
    return this.__get(this.event.queryStringParameters, key, defVal)
  }

  /**
     * Get a value from the method
     *
     * @returns {*}
     * @public
     */
  method() {
    return this.event.httpMethod || ''
  }

  /**
   * Get a value from the headers
   *
   * @param key
   * @param defVal
   * @returns {*}
   */
  headers(key, defVal) {
    if (key === undefined) return this.event.headers || {}
    return this.__get(this.event.headers, key, defVal)
  }

  /**
   * Return the IP Address of the request from the AWS event
   *
   * @returns {*}
   */
  ip() {
    let ipVal = this.__get(this.event, 'requestContext.identity.sourceIp', null)
    if (ipVal === '::') {
      ipVal = '127.0.0.1'
    }
    return ipVal
  }
}