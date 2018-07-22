const {
  WebClient
} = require('@slack/client');

exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event.body))
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  const urls = slackEvent.links.map(function (link) {
    return link.url
  })
  console.log(urls)

  const slack = new WebClient(process.env.SLACK_CLIENT_TOKEN);
  let unfurls = {}
  urls.map(function (url) {
    unfurl[url] = {
      "text": "Every day is the test."
    }
  })
  slack.chat.unfurl(slackEvent.message_ts, slackEvent.channel, unfurls)

  callback(null, {
    statusCode: 200,
    body: body.challenge
  });
}