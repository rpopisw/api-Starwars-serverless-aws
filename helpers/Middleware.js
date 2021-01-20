'use strict'

import path from 'path'

import i18n from 'i18n'

i18n.configure({
  directory: path.join(__dirname, './resources/lang'),
  register: global,
  updateFiles: false,
  defaultLocale: 'en'
})

/**
 * Every middleware can define processRequest.
 * That method must return a Promise
 */
class BaseMiddleware {
  constructor(request, response) {
    this.request = request
    this.response = response
  }
}

class LanguageMiddleware extends BaseMiddleware {
  processRequest() {
    let headers = this.request.headers()
    this.request.language = 'en'
    if (headers['Accept-Language']) {
      this.request.language = headers['Accept-Language'].substring(0, 2)
      i18n.setLocale(this.request.language)
    }
    return Promise.resolve()
  }
}

class CorsMiddleware extends BaseMiddleware {
  processRequest() {
    this.response.headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    })
    return Promise.resolve()
  }
}

export default {
  LanguageMiddleware,
  CorsMiddleware
}