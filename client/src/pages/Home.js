import React from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];
  console.log("thoughts:"+thoughts);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div class='home-container'>
        <div class='post-container'>
          {loading ? (
            <div>loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title='[my personal arsenal of groovy places in nyc]'
            />
          )}
        </div>
        {loggedIn && (
          <div class='form-element fixed'>
            <ThoughtForm />
          </div>
        )}
        {!loggedIn && (
          <div class='form-element fixed'>
            <p class='home-subtext'>[ my personal arsenal of groovy places in nyc ]</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
