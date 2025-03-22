export const renderPricing = () => {
  const pricingHtml = `
    <div class="pricing-section" id="pricing"> 
      <h2 class="section-title">Pricing Plans</h2>
      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Weekly</h3>
          <div class="price">299₽</div>
          <ul>
            <li>Full Feature Access</li>
            <li>Basic Discord Role</li>
            <li>24/7 Support</li>
            <li>Weekly Updates</li>
          </ul>
          <button class="buy-btn" onclick="window.location.href='pricing.html'">Purchase</button>
        </div>
        <div class="pricing-card featured">
          <h3>Monthly</h3>
          <div class="price">699₽</div>
          <ul>
            <li>All Weekly Features</li>
            <li>Premium Discord Role</li> 
            <li>Priority Support</li>
            <li>Beta Features Access</li>
          </ul>
          <button class="buy-btn" onclick="window.location.href='pricing.html'">Purchase</button>
        </div>
        <div class="pricing-card">
          <h3>Lifetime</h3>
          <div class="price">2999₽</div>
          <ul>
            <li>All Monthly Features</li>
            <li>VIP Discord Role</li>
            <li>Instant Support</li>
            <li>Early Access Features</li>
          </ul>
          <button class="buy-btn" onclick="window.location.href='pricing.html'">Purchase</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('pricing').innerHTML = pricingHtml;
};

