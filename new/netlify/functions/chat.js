const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

// Initialize database for chat messages
const db = new JsonDB(new Config("chat/messages", true, true, '/'));

exports.handler = async (event, context) => {
  const { path } = event;
  const method = event.httpMethod;

  try {
    switch (method) {
      case 'GET':
        return getMessages(event);
      case 'POST':
        return postMessage(event);
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function getMessages(event) {
  const messages = await db.getData("/messages") || [];
  return {
    statusCode: 200,
    body: JSON.stringify(messages.slice(-50)) // Get last 50 messages
  };
}

async function postMessage(event) {
  const { message, userId } = JSON.parse(event.body);
  
  // Get user info
  const userDb = new JsonDB(new Config("auth/database/data", true, true, '/'));
  const user = await userDb.getData(`/users[${userId}]`);
  
  if (!user) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  const chatMessage = {
    id: Date.now(),
    userId,
    username: user.username,
    avatar: user.profile.avatar,
    message,
    timestamp: new Date().toISOString()
  };

  await db.push("/messages[]", chatMessage);

  return {
    statusCode: 201,
    body: JSON.stringify(chatMessage)
  };
}