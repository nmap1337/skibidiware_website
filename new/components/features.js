export const renderFeatures = () => {
  const featuresHtml = `
    <div class="feature-section" id="features">
      <h2 class="section-title">GoreBox Cheat Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Combat Features</h3>
          <ul>
            <li>Advanced Aimbot with Customization</li>
            <li>No Reload & Rapid Fire</li>
            <li>Big Bombs Exploit</li>
            <li>Weapon Modifications</li>
          </ul>
        </div>
        <div class="feature-card">
          <h3>Visual Features</h3>
          <ul>
            <li>ESP with Multiple Options</li>
            <li>Admin Hack (Client Side)</li>
            <li>Admin Hack (Server Side)</li>
            <li>Badge Spoofer</li>
          </ul>
        </div>
        <div class="feature-card">
          <h3>Protection Features</h3>
          <ul>
            <li>Anti-Ban System</li>
            <li>Anti-Kick Protection</li>
            <li>Exploit Protection</li>
            <li>Developer Badge Spoofer</li>
          </ul>
        </div>
      </div>
      <div class="beta-badge">
        <span>BETA</span>
        More features in development!
      </div>
    </div>
  `;

  document.getElementById('features').innerHTML = featuresHtml;
};

