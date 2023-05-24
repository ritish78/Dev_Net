import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Network</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
            { console.log(`
                      Image credit for background page on Landing page
                      Douglas Lopes (@douglasamarelo) on Unsplash.com
                      https://unsplash.com/photos/OQT9s7fHeO0`
                      )
            }
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
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