exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event.body))
  const body = event.body
  callback(null, {
    statusCode: 200,
    body: body.challenge
  });
}