exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event))
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  });
}