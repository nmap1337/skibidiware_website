export const renderAbout = () => {
  const aboutHtml = `
    <div class="about-section" id="about">
      <h2 class="section-title">About Us</h2>
      <div class="about-content">
        <div class="about-card">
          <h3>Our Story</h3>
          <p>Founded by passionate developers, SkibidiWare has grown into a leading provider of premium gaming solutions. Our team combines years of experience in game development and security to deliver exceptional products.</p>
        </div>
        <div class="about-card">
          <h3>Our Mission</h3>
          <p>We strive to enhance gaming experiences through innovative solutions while maintaining the highest standards of security and reliability. Our commitment to quality and customer satisfaction drives everything we do.</p>
        </div>
        <div class="about-card">
          <h3>Our Team</h3>
          <p>Our team consists of skilled developers, security experts, and customer support specialists working together to provide you with the best possible service and product experience.</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('about').innerHTML = aboutHtml;
};

