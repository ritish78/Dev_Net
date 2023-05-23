import React from 'react';

const Landing = () => {
  return (
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">Developer Network</h1>
          <p class="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div class="buttons">
            <a href="register.html" class="btn btn-primary">Sign Up</a>
            <a href="login.html" class="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
  )
}

//Image credit for background page on Landing page
//Douglas Lopes (@douglasamarelo) on Unsplash.com
//https://unsplash.com/photos/OQT9s7fHeO0

export default Landing;