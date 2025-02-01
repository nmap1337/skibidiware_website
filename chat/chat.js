/*
class Chat {
  constructor() {
    this.room = new WebsimSocket();
    this.soundEnabled = localStorage.getItem('chatSound') !== 'false';
    this.setupRoom();
    this.pingSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Dam9vc4CBgIYgICAgICAgICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  }

  setupRoom() {
    this.room.onmessage = (event) => {
      const data = event.data;
      if (data.type === 'chat') {
        this.displayMessage(data);
        if (this.soundEnabled && data.clientId !== this.room.party.client.id) {
          this.pingSound.play();
        }
      }
    };
  }

  sendMessage(message) {
    // Check for XSS
    if (this.containsXSS(message)) {
      this.displayWarning("Hold on right there buddy, no XSS attacks in our chat.");
      return false;
    }

    this.room.send({
      type: 'chat',
      message: message,
      timestamp: new Date().toISOString()
    });
    return true;
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
    avatar.src = data.avatarUrl || `https://api.dicebear.com/6.x/avataaars/svg?seed=${data.username}`;
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

window.chat = new Chat();
*/