import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
  return (
    <div>
      <div className="text">
        --------- thoughts ??? ---------
      </div>
      <div className="card-body">
        {reactions &&
          reactions.map(reaction => (
            <p className="text" key={reaction._id}>
              {/* //{' '} */}
              <Link to={`/profile/${reaction.username}`} style={{ fontWeight: 700 }}>
                {reaction.username}: 
              </Link> {reaction.reactionBody} 
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReactionList;
