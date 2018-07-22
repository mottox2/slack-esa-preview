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
    unfurls[url] = {
      "text": "Every day is the test."
    }
  })
  console.log(unfurls)
  slack.chat.unfurl({
    ts: slackEvent.message_ts,
    channel: slackEvent.channel,
    unfurls: unfurls,
  })

  callback(null, {
    statusCode: 200,
    body: body.challenge
  });
}