// Firebase config and initialization 
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com", 
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

class Auth {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.inviteCodes = this.db.collection('inviteCodes');
    this.users = this.db.collection('users');
  }

  // Generate new invite code
  async generateInviteCode() {
    const code = Math.random().toString(36).substr(2, 9).toUpperCase();
    const ip = await this.getIP();
    
    // Store code in Firestore
    await this.inviteCodes.add({
      code,
      ip,
      used: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Send to Discord webhook
    await fetch('https://discord.com/api/webhooks/1345094023349538936/qJ-cL4OHe7cLBhlmEBkczo5wQRq7gH9rXRBiQcyroeN3FY_O_n_mR7gCKTLvJl4uYtyu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `New registration request\nIP: ${ip}\nInvite Code: ${code}`
      })
    });

    return code;
  }

  // Validate invite code
  async validateInviteCode(code) {
    const snapshot = await this.inviteCodes
      .where('code', '==', code)
      .where('used', '==', false)
      .get();

    if (snapshot.empty) {
      throw new Error('Invalid or expired invite code');
    }

    return snapshot.docs[0];
  }

  // Register new user
  async register(username, password, inviteCode) {
    // Validate invite code
    const inviteDoc = await this.validateInviteCode(inviteCode);

    // Create auth user
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      `${username}@skibidiware.cc`,
      password
    );

    // Mark invite code as used
    await inviteDoc.ref.update({ used: true });

    // Create user profile
    await this.users.doc(userCredential.user.uid).set({
      username,
      isAdmin: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      inviteCode
    });

    return userCredential.user;
  }

  // Login user
  async login(username, password) {
    const userCredential = await this.auth.signInWithEmailAndPassword(
      `${username}@skibidiware.cc`,
      password
    );

    return userCredential.user; 
  }

  // Get IP address
  async getIP() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  }

  logout() {
    return this.auth.signOut();
  }

  onAuthStateChanged(callback) {
    return this.auth.onAuthStateChanged(callback);
  }
}

window.auth = new Auth();