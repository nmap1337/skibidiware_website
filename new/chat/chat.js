class Chat {
  constructor() {
    this.db = firebase.firestore();
    this.messages = this.db.collection('messages');
    this.auth = firebase.auth();
    this.soundEnabled = localStorage.getItem('chatSound') !== 'false';
    this.setupListeners();
    this.pingSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dam9vc4CBgIYgICAgICAgICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  }

  setupListeners() {
    // Listen for new messages
    this.messages
      .orderBy('timestamp', 'desc')
      .limit(50)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.displayMessage(change.doc.data());
            if (this.soundEnabled && change.doc.data().uid !== this.auth.currentUser?.uid) {
              this.pingSound.play();
            }
          }
        });
      });
  }

  async sendMessage(message) {
    if (!this.auth.currentUser) {
      this.displayWarning('You must be logged in to chat');
      return false;
    }

    if (this.containsXSS(message)) {
      this.displayWarning('No XSS attacks allowed');
      return false;
    }

    try {
      const userDoc = await this.db.collection('users')
        .doc(this.auth.currentUser.uid).get();
      
      await this.messages.add({
        message: message,
        uid: this.auth.currentUser.uid,
        username: userDoc.data().username,
        avatar: userDoc.data().avatar,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }

  containsXSS(message) {
    const xssPattern = /<script|javascript:|onerror=|onload=|<img|<iframe|<style|<link|<object|<embed|<applet|<meta|<svg|<xml|<html|<body|<form/i;
    return xssPattern.test(message);
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('chatSound', this.soundEnabled);
    return this.soundEnabled;
  }

  displayMessage(data) {
    const chatbox = document.getElementById('chatbox');
    if (!chatbox) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    
    const avatar = document.createElement('img');
    avatar.src = data.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${data.username}`;
    avatar.className = 'chat-avatar';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const username = document.createElement('span');
    username.className = 'username';
    username.textContent = data.username;
    
    const message = document.createElement('span');
    message.className = 'message-text';
    message.textContent = data.message;
    
    content.appendChild(username);
    content.appendChild(message);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  displayWarning(message) {
    const chatbox = document.getElementById('chatbox');
    if (!chatbox) return;

    const warningDiv = document.createElement('div');
    warningDiv.className = 'chat-warning';
    warningDiv.textContent = message;
    
    chatbox.appendChild(warningDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
    
    setTimeout(() => {
      warningDiv.remove();
    }, 5000);
  }
}

// Initialize chat when Firebase is ready
firebase.auth().onAuthStateChanged(() => {
  if (document.querySelector('.chat-container')) {
    window.chat = new Chat();
  }
});