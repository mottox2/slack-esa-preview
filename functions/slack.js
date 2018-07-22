exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event.body))
  const body = JSON.parse(event.body)
  callback(null, {
    statusCode: 200,
    body: body.challenge
  });
}