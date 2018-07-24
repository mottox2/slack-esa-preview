const {
  WebClient
} = require('@slack/client');
const Esa = require('node-esa').Esa;

async function getEsaPost(url) {
  // ["posts/1234", "1234"]
  const matched = url.match(/posts\/(\d+)/)
  if (!matched) {
    return null
  }
  const number = matched[1]
  const esa = new Esa(process.env.ESA_TEAM_NAME, process.env.ESA_TOKEN);

  const res = await esa.teams.post(number)
  return res
}

exports.handler = async function (event, context, callback) {
  // console.log(JSON.stringify(event.body))
  const body = JSON.parse(event.body)
  const slackEvent = body.event
  const urls = slackEvent.links.map(link => link.url)

  const slack = new WebClient(process.env.SLACK_CLIENT_TOKEN);
  let unfurls = {}
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const post = await getEsaPost(url)
    unfurls[url] = {
      "author_name": post.updated_by.name,
      "color": "#0a9b94",
      "title": post.name
    }
  }
  slack.chat.unfurl({
    ts: slackEvent.message_ts,
    channel: slackEvent.channel,
    unfurls: unfurls,
  })
  console.log(unfurls)

  callback(null, {
    statusCode: 200,
    body: body.challenge
  });
}