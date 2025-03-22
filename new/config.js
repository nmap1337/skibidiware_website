// Configuration and settings
export const config = {
  // Discord webhook for invite codes
  DISCORD_WEBHOOK: "https://discord.com/api/webhooks/1345094023349538936/qJ-cL4OHe7cLBhlmEBkczo5wQRq7gH9rXRBiQcyroeN3FY_O_n_mR7gCKTLvJl4uYtyu",
  
  // Netlify API endpoints
  NETLIFY_API: {
    baseUrl: "/.netlify/functions",
    auth: "/auth",
    chat: "/chat",
    profile: "/profile"
  },

  // Chat settings
  CHAT_SETTINGS: {
    maxMessages: 50,
    refreshInterval: 3000,
    maxLength: 500
  },

  // Profile settings
  PROFILE_SETTINGS: {
    defaultAvatar: "https://i.imgur.com/default-avatar.png",
    maxBioLength: 500
  }
};