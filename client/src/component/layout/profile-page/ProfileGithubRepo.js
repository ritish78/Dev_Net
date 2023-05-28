import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserGithubRepo } from '../../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileGithubRepo = props => {
    const { githubusername , repos, getUserGithubRepo } = props;
    useEffect(() => {
        getUserGithubRepo(githubusername);
    }, [getUserGithubRepo, githubusername]);


    console.log('Github repos:', repos);


    return (
        <div>
            <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          
            { repos && repos.length > 0 ? repos.map(repo => {
              return (
                <div key={repo.id} className="repo bg-white p-1 my-1">
                  <div>
                    <h4><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a> </h4>
                    <p>
                      {repo.description}
                    </p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary"><i className="fa-solid fa-star"></i>  Stars: <span>{repo.stargazers_count}</span></li>
                      <li className="badge badge-dark"><i className="fa-solid fa-eye"></i>  Watchers: <span>{repo.watchers_count}</span></li>
                      <li className="badge badge-light"><i className="fa-solid fa-code-fork"></i>  Forks: <span>{repo.forks_count}</span></li>
                    </ul>
                  </div>
                </div>

              )}) : (
                <h3>No Repo in user's profile.</h3>
              )}
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