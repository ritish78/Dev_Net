import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/register" class="btn btn-primary">Sign Up</Link>
            <Link to="/login" class="btn btn-light">Login</Link>
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