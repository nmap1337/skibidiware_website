// Profile management and customization logic
class Profile {
  constructor() {
    this.netlifyApi = config.NETLIFY_API;
  }

  async updateProfile(userId, data) {
    const response = await fetch(`${this.netlifyApi.profile}/update`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        ...data
      })
    });
    
    return response.json();
  }

  async getProfile(userId) {
    const response = await fetch(`${this.netlifyApi.profile}/${userId}`);
    return response.json();
  }
}

export const profile = new Profile();

