require('dotenv').config();
const {token} = process.env;


//GMO FX
//--------------------------------------------------------------------------------------------------------------
const axios = require('axios');
const endPoint = 'https://forex-api.coin.z.com/public';
const path = '/v1/ticker';
let askRate;
let objData;

//Discord
//--------------------------------------------------------------------------------------------------------------
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
});

//起動確認
client.once('ready', () => {
  console.log(`${client.user.tag} Ready`);
});

//返答
client.on('messageCreate', message => {
  if (message.author.bot) {
    return;
  }

  if (message.content == '!kawase') {
    axios.get(endPoint + path)
      .then(function (response) {
        objData = response.data.data[0];
        let thistime = response.data.responsetime;
        askRate = objData.ask;
        console.log(askRate);
        // message.channel.send('USDJPY: ' + askRate);
        message.channel.send(
          {
          embeds: [{
          author:{
            name: "Hawaii Bot",
            icon_url: client.user.avatarURL,
          },
          title: 'EXCHANGE RATE',
          description: 'GMOコイン 外国為替FXの最新レートです',
          footer: {
            text: "Developed by Risochaso"
          },
          image: {
            url: "https://advance.quote.nomura.co.jp/meigara/nomura2/chart21.exe?template=users/nomura/xsdayR&mode=D&basequote=XJPY/8_D"
          },
          fields: [
            {name: "USDJPY", value: "**1ドル " + askRate + "円**"},
            {name: "", value: "[詳細GMO証券為替レート](https://www.click-sec.com/corp/guide/fxneo/rate/)"}
          ],
          color: 4303284,
          timestamp: thistime,
          }]
          }

          /*
          {embed: [{
          author:{
            name: "Hawaii Bot"
          },
          title: "現在のレート",
          description: 'GMOコイン 外国為替FXの最新レートです',
          timestamp: response.data.responsetime,
          footer: {
            text: "Developed by Risochaso"
          },
          fields:[
            {
              name: "USDJPY",
              value: "USDJPY"
            }
          ]
          }]}*/
        );
      })
      .catch(function (error) {
        console.log(error);
        askRate = "ERROR CODE: " + error;
      });
      }
});

//Discordへの接続
client.login(token);
