'use strict'

class BaseException extends Error {
  constructor(message, code) {
    super(message)
    this.code = typeof code !== 'undefined' ? code : 0
  }
}

export class BadRequestException extends BaseException {
  constructor(message, code) {
    super(message, code)
    this.statusCode = 400
    this.name = 'Bad Request'
  }
}

export class UnAuthorizedException extends BaseException {
  constructor(message, code) {
    super(message, code)
    this.statusCode = 401
    this.name = 'Unauthorized'
  }
}

export class NotFoundException extends Error {
  constructor(message, code) {
    super(message, code)
    this.statusCode = 404
    this.name = 'Not Found'
  }
}

export class DataValidationFailedException extends Error {
  constructor(message, body, code) {
    super(message, code)
    this.statusCode = 422
    this.name = 'Data Validation failed'
    this.body = body
  }
}

export default {
  BadRequestException,
  UnAuthorizedException,
  NotFoundException,
  DataValidationFailedException
}