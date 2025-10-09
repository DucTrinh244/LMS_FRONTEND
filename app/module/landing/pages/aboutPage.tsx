import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>About Us</h1>
      <p>
        Welcome to our Learning Management System! Our mission is to provide high-quality educational resources and a seamless learning experience for everyone.
      </p>
      <section>
        <h2>Our Vision</h2>
        <p>
          Empower learners worldwide through accessible and innovative technology.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          For inquiries, please email us at <a href="mailto:info@lms.com">info@lms.com</a>.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;