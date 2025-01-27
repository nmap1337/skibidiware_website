class Auth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users')) || {};
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    this.tips = [
      "If your account got hacked, contact our support in Discord for help!",
      "Remember to keep your password safe and never share it with anyone.",
      "Enable 2FA for extra account security!",
      "Check our Discord for the latest updates and announcements.",
      "Having technical issues? Our support team is here to help!"
    ];
  }

  generateUID() {
    return 'uid_' + Math.random().toString(36).substr(2, 9);
  }

  register(username, password, accessCode) {
    if (this.users[username]) {
      throw new Error('Username already exists');
    }

    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 8 characters');
    }

    if (!this.validateAccessCode(accessCode)) {
      throw new Error('Access code must be 4 digits');
    }

    const user = {
      username,
      password: this.hashPassword(password),
      accessCode,
      uid: this.generateUID(),
      avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}`,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    this.users[username] = user;
    this.saveUsers();
    return user;
  }

  login(username, password) {
    const user = this.users[username];
    if (!user || user.password !== this.hashPassword(password)) {
      throw new Error('Invalid username or password');
    }

    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  resetPassword(username, accessCode, newPassword) {
    const user = this.users[username];
    if (!user || user.accessCode !== accessCode) {
      throw new Error('Invalid username or access code');
    }

    if (!this.validatePassword(newPassword)) {
      throw new Error('Password must be at least 8 characters');
    }

    user.password = this.hashPassword(newPassword);
    this.saveUsers();
  }

  validatePassword(password) {
    return password.length >= 8;
  }

  validateAccessCode(code) {
    return /^\d{4}$/.test(code);
  }

  hashPassword(password) {
    // In a real app, use proper password hashing
    return btoa(password);
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getRandomTip() {
    return this.tips[Math.floor(Math.random() * this.tips.length)];
  }
}

window.auth = new Auth();