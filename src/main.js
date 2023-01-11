const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
var Scraper = require('images-scraper');

const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});
const token = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });
var imagesRes;

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}.`);  
});

client.on('messageCreate', (message) => {
	if (message.author.id == client.user.id) return
	if (message.content == "behemoth" || message.content == "hippopotamus" || message.content == "🦛") {
		message.reply(imagesRes[Math.floor(Math.random() * 200)].url)
	}
	if (message.content == "behemoth->servericon") {
		message.guild.setIcon(imagesRes[Math.floor(Math.random() * 200)].url)
	}
});
(async () => {
	const results = await google.scrape('hippo', 200);
	imagesRes = results;
	client.login(token);
})();	