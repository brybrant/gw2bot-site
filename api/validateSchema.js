// return 0 = error
// return 1 = success
function validateType (target, schema) {
  if (target === undefined) {
    return schema.optional ? 1 : 0
  }

  switch (schema.type) {
    case Array:
      if (
        !Array.isArray(target) ||
        (target.length > schema.length.max) ||
        (target.length < schema.length.min)
      ) {
        return 0
      }
      for (const item of target) {
        if (validateType(item, schema.schema) === 0) { return 0 }
      }
      break

    case Boolean:
      if (typeof target !== 'boolean') { return 0 }
      break

    case Number:
      if (
        typeof target !== 'number' ||
        (!schema.float && parseInt(target) !== target)
      ) {
        return 0
      }
      break

    case Object:
      if (typeof target !== 'object') { return 0 }
      return validateSchema(target, schema.schema)

    case String:
      if (
        typeof target !== 'string' ||
        (schema.options && !schema.options.includes(target))
      ) {
        return 0
      }
  }

  return 1
}

// Recursive function to validate schema of user-submitted data
export function validateSchema (target, schema) {
  if (typeof target !== 'object' || target === null) {
    // console.error('Target not valid object')
    return 0
  }

  for (const [key, value] of Object.entries(schema)) {
    if (validateType(target[key], value) === 0) {
      // console.error(`"${key}" invalid value: `, target[key])
      return 0
    }
  }

  return 1
}
