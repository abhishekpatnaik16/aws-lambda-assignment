# AWS Lambda Assignment


To create a new entry
```
POST /assignment/data HTTP/1.1
Content-Type: application/json
Host: huamo21q44.execute-api.us-east-2.amazonaws.com
Content-Length: 31

{
	"data": "Some string data"
}
```

To fetch an entry by Id
```
GET /assignment/data?id=4bb0ad1f-1f43-43be-b0e8-3e9c2d947bdb HTTP/1.1
Content-Type: application/json
Host: huamo21q44.execute-api.us-east-2.amazonaws.com

```

