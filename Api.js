const AWS = require('aws-sdk')
const uuid = require('uuid').v4

const dynamoDB = new AWS.DynamoDB()

class AppApi {
    write(data) {
        return new Promise((resolve, reject) => {
            const buildWriteRecord = {
                id: uuid(),
                key: data['key'].toString()
            }

            const record = {
                'id': {
                    S: buildWriteRecord.id
                },
                'key': {
                  S: buildWriteRecord.key  
                }
            }
            
            console.log('Record to write', record)
    
            dynamoDB.putItem({
                TableName: 'Assignment',
                Item: record,
                ReturnConsumedCapacity: 'TOTAL',
            }, (err, data) => {
                console.log('Write operation callback', err, data)

                if (err) {
                    return reject(err)
                } else {
                    return resolve(buildWriteRecord)
                }
            })
        })
    }
    
    read(itemId) {
        return new Promise((resolve, reject) => {
            dynamoDB.getItem({
                Key: {
                    id: {
                        S: itemId
                    }
                },
                TableName: 'Assignment'
            }, (err, data) => {
                if (err) {
                    return reject(err)
                } else {
                    const item = data['Item']
                    if(item) {
                        return resolve({
                            id: item['id'] && item['id']['S'],
                            key: item['key'] && item['key']['S']
                        })
                    } else {
                        reject({
                            httpStatus: 404,
                            message: `No record found for Id(${itemId})`
                        })
                    }
                    
                }
            })
        })
    }
}

module.exports = {
    AppApi
}
