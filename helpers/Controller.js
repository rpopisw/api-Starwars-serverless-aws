'use strict'

import Exceptions from './Exceptions'
import Response from './Response'
import Request from './Request'

const {
  BadRequestException,
  DataValidationFailedException,
  UnAuthorizedException,
  NotFoundException
} = Exceptions

class BaseController {
  constructor() {
    this.middlewares = []
  }

  init(event, context, callback) {
    this.request = new Request(event, context)
    this.response = new Response(callback)

    context.callbackWaitsForEmptyEventLoop = false

    try {
      const middlewarePromise = this.processRequest()
      const handle = this.handle.bind(this)
      return middlewarePromise
        .then(handle)
        .then(response => this.response.send(response))
        .catch(e => {
          this.handleException(e)
        })
    } catch (e) {
      this.handleException(e)
    }
  }

  /**
   * You MUST implement this method.
   * It is supposed to be used to handle the logic in
   * your controller. Should returns a promise or raise
   * an Exception from core/Exceptions
   */
  handle() {
    throw new Error('You must implement the method handle')
  }

  middleware(middlewareClass) {
    this.middlewares.push(middlewareClass)
  }

  processRequest() {
    const promises = []
    for (let i = 0; i < this.middlewares.length; i++) {
      let Middleware = this.middlewares[i]
      let middlewareObj = new Middleware(this.request, this.response)
      let method = middlewareObj.processRequest.bind(middlewareObj)
      promises.push(method())
    }
    return Promise.resolve(Promise.all(promises))
  }

  handleException(e) {
    const isSimilarError = function (e) {
      const similarErrors = [
        BadRequestException,
        UnAuthorizedException,
        NotFoundException
      ]
      for (let i = 0; i < similarErrors.length; i++) {
        if (e instanceof similarErrors[i]) {
          return true
        }
      }
      return false
    }

    if (isSimilarError(e)) {
      this.response.fail(
        {
          status: e.statusCode,
          name: e.name,
          message: e.message,
          code: e.code
        },
        e.statusCode
      )
    } else if (e instanceof DataValidationFailedException) {
      this.response.statusCode(e.statusCode).send(e.body)
    } else {
      this.response.fail500(e)
    }
  }
}

export default BaseController
