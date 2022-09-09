import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className="post">
        <div>
          <p class='single-post-title'>{thought.username}: {thought.thoughtText}</p>
        </div>
        {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />)}
        {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} class='margin-bottom' />}
      </div>
    </div>
  );
};

export default SingleThought;
