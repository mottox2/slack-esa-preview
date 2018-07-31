# Slack esa preview

esa.ioのリンクがSlackに入力されると、内容が表示されるSlack App。
Netlify functionsでホスティングする前提で書いています。

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mottox2/slack-esa-preview)

## Setup
### Slack Appの設定

### esa.ioのアクセストークンの取得

https://[あなたのチーム名].esa.io/user/applications にアクセスし ` Personal access tokens`の横にある`Personal access tokens`をクリックしてください。

トークン生成画面に遷移するので、Token descriptionに適当な説明(ex.`slack-esa-preview`)を記入、Select scopesに`Read`がチェックがついているのを確認してSaveをクリックしてください。

そうすると一度だけアクセストークンが表示されるので、それを次のステップで使います。

### Netlifyにデプロイ
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mottox2/slack-esa-preview)

をクリックし、最初の画面でGitHub連携を行います。

TODO: 環境変数を入力するスクショと説明

