const {AppApi} = require('./Api');

const appApi = new AppApi()

const parseJSON = (rawString) => {
    try {
        return JSON.parse(rawString)
    } catch (err) {
        const error = new Error('Unable to parse json body')
        error.metadata = err
        throw error
    }
}

exports.writeFromRequest = async (event) => {
    try {
        const data = parseJSON(event.body)

        console.log('Received json payload', data)

        const record = await appApi.write(data)

        return {
            status: 200,
            record
        }
    } catch (error) {
        return {
            status: 500,
            error: error.message
        }
    }
}

exports.readFromRequest = async (event) => {
    try {
        console.log('Read request', event)
        const id = event['queryStringParameters'] && event['queryStringParameters']['id']
        
        if (id == null || id === '') {
            throw 'Invalid id'
        }
        
        const record = await appApi.read(id)
        
        return {
            status: 200,
            record
        }
    } catch (error) {
        return {
            status: error['httpStatus'] || 500,
            error: error.message
        }
    }
}
