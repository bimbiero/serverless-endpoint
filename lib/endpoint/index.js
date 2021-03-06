'use strict';

const eventMapper = require('./mappers');

/**
  This is a handler function that is invoked by cloud trigger.
  AWS Example function handler
  [Lambda Function Handler (Node.js) Docs](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)
  @name CloudFunctionHandler
  @function
*/

/**
  HOC function that maps the ApiGateway CloudEndpoint, Azure HttpTrigger  event api to
  Req and Res similar to that of Express
  @function
  @param {CloudFunctionHandler} func - Google, AWS, Azure Function Handler
  @returns {endpointHandler} endpointHandler - Converts event,
    context to req, res api for Lambda Function Handler
*/
function endpoint(func) {

  /**
    runs endpoint handler, use res.send(statusCode, body) finish api call successfully
    @name endpointHandler
    @function
    @param {req} req
    @param {res} res

  */
  return function endpointHandler() {
    // call mapper with endpointHandlers args
    const input = eventMapper.apply(this, arguments);
    const req = input.req;
    const res = input.res;

    return func(req, res);
  };
}

module.exports = endpoint;
