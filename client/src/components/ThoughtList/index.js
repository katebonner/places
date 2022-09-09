import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3 class='text margin2'>no places yet</h3>;
  }

  return (
    <div>
      <div>
      {thoughts &&
        thoughts.map(thought => (
          <div key={thought._id} className="post position">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 100 }}
              >
                {thought.username}
              </Link>{' '}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="reaction-count">
                  {thought.reactionCount} ♥
                  {(thought.reactionCount === 1) ? ' ' : 's '}
                </p>
              </Link>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default ThoughtList;
