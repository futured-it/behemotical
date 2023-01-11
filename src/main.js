const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
var Scraper = require('images-scraper');

function randomHippoUrl() {
	return imagesRes.hippos[Math.floor(Math.random() * 200)].url;
};

const google = new Scraper({
  puppeteer: {
    headless: false,
  },
});
const token = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });
var imagesRes = {
	hippos: [],
	hipposGifs: []
};

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}.`);  
});

client.on('messageCreate', (message) => {
	if (message.author.id == client.user.id) return;
	if (message.content == "behemoth" || message.content == "hippopotamus" || message.content == "🦛") {
		message.reply(randomHippoUrl())
	};
	if (message.content == "behemoth --gif") {
		message.reply(imagesRes.hipposGifs[Math.floor(Math.random() * 200)].url);
	}
	if (message.content == "behemoth > servericon") {
		message.guild.setIcon(randomHippoUrl())
	};
});

(async () => {
	const hippo = await google.scrape('hippo', 200);
	const hippoGif = await google.scrape('hippo gif', 200);

	imagesRes.hippos = hippo;
	imagesRes.hipposGifs = hippoGif;

	client.login(token);
})();	