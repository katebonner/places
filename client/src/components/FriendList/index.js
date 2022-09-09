import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <p class="center bottom-margin"> [ {username} has no friends ]</p>;
  }

  return (
    <div>
      <p class='center'>
        friend{friendCount === 1 ? '' : 's'}: {friendCount}
      </p>
      <div class='friendList'>
      {friends.map(friend => (
        <button className="btn-login transparent friend" key={friend._id}>
          <Link to={`/profile/${friend.username}`}> {friend.username}</Link>
        </button>
      ))}
      </div>
    </div>
  );
};

export default FriendList;
