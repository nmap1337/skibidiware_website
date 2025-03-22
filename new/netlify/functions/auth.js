const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const bcrypt = require('bcryptjs');

// Initialize database
const db = new JsonDB(new Config("auth/database/data", true, true, '/'));

exports.handler = async (event, context) => {
  const { path } = event;
  const method = event.httpMethod;

  try {
    switch (true) {
      case path.endsWith('/register'):
        return handleRegister(event);
      case path.endsWith('/login'):
        return handleLogin(event);
      case path.endsWith('/generateInvite'):
        return handleInviteGeneration(event);
      case path.endsWith('/validateInvite'):
        return handleInviteValidation(event);
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function handleRegister(event) {
  const { username, password, inviteCode } = JSON.parse(event.body);
  
  // Validate invite code
  const validInvite = await validateInviteCode(inviteCode);
  if (!validInvite) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid invite code' })
    };
  }

  // Create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const uid = await getNextUid();
  
  const user = {
    uid,
    username,
    password: hashedPassword,
    isAdmin: false,
    inviteCode,
    joinDate: new Date().toISOString(),
    ip: event.headers['client-ip'],
    subscription: {
      type: 'none',
      active: false
    },
    profile: {
      avatar: "https://i.imgur.com/default-avatar.png",
      bio: "",
      badges: []
    }
  };

  await db.push("/users[]", user);
  await markInviteUsed(inviteCode);

  return {
    statusCode: 201,
    body: JSON.stringify({ 
      message: 'User created successfully',
      uid
    })
  };
}

// Additional helper functions
async function getNextUid() {
  const users = await db.getData("/users");
  return users.length + 1;
}

async function validateInviteCode(code) {
  const invites = await db.getData("/inviteCodes");
  return invites.find(i => i.code === code && !i.used);
}

async function markInviteUsed(code) {
  const invites = await db.getData("/inviteCodes");
  const index = invites.findIndex(i => i.code === code);
  await db.push(`/inviteCodes[${index}]/used`, true);
}

async function handleLogin(event) {
  const { username, password } = JSON.parse(event.body);
  const users = await db.getData("/users");
  const user = users.find(u => u.username === username);

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid username or password' })
    };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid username or password' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: 'Login successful',
      uid: user.uid
    })
  };
}

async function handleInviteGeneration(event) {
  const inviteCode = Math.random().toString(36).substr(2, 9).toUpperCase();
  const ip = event.headers['client-ip'];
  const invite = {
    code: inviteCode,
    ip,
    used: false,
    createdAt: new Date().toISOString()
  };

  await db.push("/inviteCodes[]", invite);

  return {
    statusCode: 201,
    body: JSON.stringify({ 
      message: 'Invite code generated successfully',
      inviteCode
    })
  };
}

async function handleInviteValidation(event) {
  const { inviteCode } = JSON.parse(event.body);
  const validInvite = await validateInviteCode(inviteCode);

  if (!validInvite) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid invite code' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: 'Invite code is valid'
    })
  };
}