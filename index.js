const env = process.env
const envObj = {}

// convert key to camelCase
const toCamelCase = (key) => {
    if (key === key.toLowerCase()) return key

    const udsAtStart = key.charAt(0) === '_'
    const keyParts = key.split('_').filter((e) => { return e !== '' })

    keyParts.forEach((keyPart, i) => {
        keyParts[i] = i === 0 ? keyPart.toLowerCase() : keyPart.charAt(0).toUpperCase() + keyPart.slice(1).toLowerCase()
    })

    return (udsAtStart ? '_' : '') + keyParts.join('')
}

// foreach env vars
Object.keys(env).forEach((key) => {
    let value = env[key]
    let lastObj = envObj

    const keyParts = key.split('__').filter((e) => { return e !== '' })
    const isArray = keyParts.length > 1 && key.slice(-2) === '__'

    if (isArray) value = value.split(',').map((e) => { return e.trim() })

    // foreach key's parts
    keyParts.forEach((keyPart, i) => {
        const isLastKey = i === keyParts.length - 1
        const keyPartKeys = []
        let lastObj2

        // add keys variation (original, camelCase)
        keyPartKeys.push(keyPart)
        keyPartKeys.push(toCamelCase(keyPart))

        // foreach part's keys variation
        keyPartKeys.forEach((keyPartKey, i2) => {
            if (i2 > 0) lastObj[keyPartKey] = lastObj2
            else {
                if (!lastObj[keyPartKey]) lastObj[keyPartKey] = isLastKey ? value : {}

                lastObj2 = lastObj[keyPartKey]
            }
        })

        lastObj = lastObj2
    })
})

module.exports = envObj