import React from 'react';

function ProfileNav(props) {
    const {
        setShowFriends,
        setShowPosts,
        friends,
        posts,
      } = props;

    return (
        <header>
            <div class='profile-nav'>
                <ul class='profile-nav-list'>
                    <li class={`${friends && `selected`}`}>
                        <p class='profile-nav-element' id="friends" onClick={() => {
                            setShowFriends(true)
                            setShowPosts(false)
                        }}>friends</p>
                    </li>
                    <li class={`${posts && `selected`}`}>
                        <p class='profile-nav-element' id='posts' onClick={() => {
                            setShowFriends(false)
                            setShowPosts(true)
                        }}>posts</p>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default ProfileNav;