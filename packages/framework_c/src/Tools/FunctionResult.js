export const FunctionResultMessageTypes = {
  Info: 'Info',
  Warning: 'Warning',
  Error: 'Error',
  Authentication: 'Authentication',
  Rule: 'Rule',
  Authorization: 'Authorization',
  ModelFieldTypeError: 'ModelFieldTypeError'
}

export const FunctionResultStatus = {
  Success: 'Success',
  Failure: 'Failure'
}

export const MessageBuilder = {
  Error: function (message, section) {
    return { Message: message, Type: FunctionResultMessageTypes.Error, Section: section }
  },

  Warning: function (message, section) {
    return { Message: message, Type: FunctionResultMessageTypes.Warning, Section: section }
  },

  Info: function (message, section) {
    return { Message: message, Type: FunctionResultMessageTypes.Info, Section: section }
  },

  Rule: function (message, field, section) {
    return { Message: message, Type: FunctionResultMessageTypes.Rule, Field: field, Section: section }
  },

  Authorization: function (message) {
    return { Message: message, Type: FunctionResultMessageTypes.Authorization }
  },

  Authentication: function (message) {
    return { Message: message, Type: FunctionResultMessageTypes.Authentication }
  }
}
