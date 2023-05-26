import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserGithubRepo } from '../../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileGithubRepo = props => {
    const {  profile: { githubusername }, repos, getUserGithubRepo } = props;
    useEffect(() => {
        getUserGithubRepo(githubusername);
    }, [getUserGithubRepo, githubusername]);


    console.log('Github repos:', repos);


    return (
        <div>
            <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4><Link to="#" target="_blank"
                  rel="noopener noreferrer">Repo One</Link></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo Two</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
            </div>
        </div>
    )
}

ProfileGithubRepo.propTypes = {
    repos: PropTypes.array.isRequired,
    githubusername: PropTypes.string.isRequired,
    getUserGithubRepo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, { getUserGithubRepo })(ProfileGithubRepo);