const {
  WebClient
} = require('@slack/client');

exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event.body))
  const body = JSON.parse(event.body)
  const event = body.event
  const urls = event.links.map(function (link) {
    return link.url
  })

  const slack = new WebClient(process.env.SLACK_CLIENT_TOKEN);
  let unfurls = {}
  urls.map(function (url) {
    unfurl[url] = {
      "text": "Every day is the test."
    }
  })
  slack.chat.unfurl(event.message_ts, event.channel, unfurls)

  callback(null, {
    statusCode: 200,
    body: body.challenge
  });
}