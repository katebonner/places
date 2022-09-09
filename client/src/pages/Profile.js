import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ProfileHeader from '../components/ProfileHeader';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = (props) => {

    //INSERT CONSTANTS 
    const [friends, setShowFriends] = useState(false);
    const [posts, setShowPosts] = useState(true);
    const [addPost, setAddPost] = useState(false);

  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 class='text margin'>
        access denied. please log in :)
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div>
      <div class='profile-card'> 
        <h4 class='profile-card-header'>{user.username}</h4>
      <ProfileHeader
        setShowFriends={setShowFriends}
        setShowPosts={setShowPosts}
        friends={friends}
        posts={posts}
        >
      </ProfileHeader>
      {userParam && (
          <button className="post-btn" onClick={handleClick}>
            add friend
          </button>)}
      </div>
      <div>
      <main>
        {friends && (<><FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
        ></FriendList></>)}
        <div class='profile-post-container'>
        {posts && (<><ThoughtList
            thoughts={user.thoughts} 
            title={`my posts`}
        ></ThoughtList></>)}
        </div>
        {(addPost && !userParam) && (<><ThoughtForm></ThoughtForm></>)}
      </main>
      </div>
    </div>
  );
};

export default Profile;
