import { WebClient } from '@slack/client'
import Esa from 'esa-node'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyCallback,
  // @ts-ignore
} from '@types/aws-lambda'

declare var process: {
  env: {
    SLACK_CLIENT_TOKEN: string
    ESA_TOKEN: string
  }
}

function getEsaPost(url: string) {
  // ["https://mottox2.esa.io/posts/1234", "mottox2", "1234"]
  const matched = url.match(/https?:\/\/(.+).esa.io\/posts\/(\d+)/)
  if (!matched || !matched[1] || !matched[2]) {
    return null
  }
  const teamName = matched[1]
  const number = matched[2]
  const esa = new Esa(process.env.ESA_TOKEN, teamName)
  return esa.post(number)
}

// https://api.slack.com/events/link_shared
interface LinkSharedEvent {
  type: 'link_shared'
  channel: string
  message_ts: string
  links: Array<{
    domain: string
    url: string
  }>
}

exports.handler = async (
  event: APIGatewayProxyEvent,
  context: any,
  callback: APIGatewayProxyCallback
) => {
  // console.log(JSON.stringify(event.body))
  if (!event.body) {
    callback(null, {
      statusCode: 200,
      body: 'Check your body'
    })
    return
  }
  const body = JSON.parse(event.body)
  if (body.event && body.event.type === 'link_shared') {
    const slackEvent: LinkSharedEvent = body.event
    const urls = slackEvent.links.map(link => link.url)

    const slack = new WebClient(process.env.SLACK_CLIENT_TOKEN)
    let unfurls: any = {}
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      const post = await getEsaPost(url)
      if (!post) {
        continue
      }
      unfurls[url] = {
        author_name: post.created_by.name,
        author_icon: post.created_by.icon,
        color: '#0a9b94',
        title: [post.category, post.name].join('/'),
        text: post.body_md,
        title_link: post.url
      }
    }
    slack.chat.unfurl({
      ts: slackEvent.message_ts,
      channel: slackEvent.channel,
      unfurls: unfurls
    })
    console.log(unfurls)
  }

  callback(null, {
    statusCode: 200,
    body: body.challenge
  })
}
