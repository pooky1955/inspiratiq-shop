const fetch = require("node-fetch")
exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const discordUrl = process.env.DISCORD_WEBHOOK
    const discordBody = `Mail from **${data.email}**\n----------------------------\n${data.message}\n-------------------------------------`
    fetch(discordUrl,{
      method: 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        embeds : [{
          title : `Mail from ${data.email}`,
          description : `${data.message}`,
          color : 16774122
        }]
      })
    })
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode : 500,
      body : error.toString()
    }
  }
};
