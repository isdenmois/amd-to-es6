'use strict'

const escodegen = require('escodegen')
const isDefineWithArrayAndCallback = require('./isDefineWithArrayAndCallback')

function getArrayExpressionValues (node) {
  return node.elements.map(element => element.value)
}

function getFunctionParameters (node) {
  return node.params.map(param => escodegen.generate(param))
}

module.exports = function (node) {
  if (!isDefineWithArrayAndCallback(node)) { return [] }
  var length = node.arguments.length
  var elements = getArrayExpressionValues(node.arguments[length - 2])
  var params = getFunctionParameters(node.arguments[length - 1])
  return elements.map((element, index) => {
    return {
      element: element,
      param: params[index]
    }
  })
}
