const AWS = require('aws-sdk')
const uuid = require('uuid').v4

const dynamoDB = new AWS.DynamoDB()

class AppApi {
    write(data) {
        return new Promise((resolve, reject) => {
            const buildWriteRecord = {
                id: uuid(),
                data: data['data'].toString()
            }

            const record = {
                id: {
                    S: buildWriteRecord.id
                },
                data: {
                  S: buildWriteRecord.data  
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
                            data: item['data'] && item['data']['S']
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
