import React, { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext/UserContext';
import { usePosts } from '../../context/PostContext/PostContext';
import PostList from '../../components/Posts/PostList'
import CreatePost from '../../components/CreatePost';
import ImageSelector from '../../components/ImageSelector';
import Loader from '../../components/Loader';

const Profile = () => {
  const { user, profile, updateUserProfileImg, loading } = useUser();
  const { retrieveUserPosts, posts } = usePosts();
  const [openFileSystem, setOpenFileSystem] = useState();
  const [postOpen, setPostOpen] = useState(false);
  const handleProfileImageUpdate = async (e) => {
    console.log(e.target.files[0]);
    const img = e.target.files[0];
    updateUserProfileImg(img);
    setOpenFileSystem(false)
  }
  useEffect(() => {
    retrieveUserPosts()
  }, [])
  if(loading) return <Loader />
  return (
    <div className="container d-flex align-items-center justify-content-center flex-column mt-4">
      <ImageSelector openFileSystem={openFileSystem} onFileChange={handleProfileImageUpdate} />
      <header className="header d-flex align-items-center justify-content-center flex-column my-2">
        <div className="profile-img" onClick={() => setOpenFileSystem(true)}>
          <img src={profile?.profile_img || process.env.PUBLIC_URL + 'profile-img.jpg'} alt="profile img" style={{ width: '5rem', height: '5rem', borderRadius: '50%'}} />
        </div>
        <h3>{profile.name}</h3>
        <div className="profile-details d-flex align-items-center justify-content-evenly">
          <div className="followers bar">{profile.followers.length || 0}<strong> Followers</strong></div>
          <div className="following bar">{profile.following.length || 0}<strong> Following</strong></div>
          <div className="posts bar">{profile.posts.length || 0}<strong> Posts</strong></div>
        </div>
      </header>
      {postOpen ? <CreatePost setClose={() => setPostOpen(false)} /> : (<button className="bottomBtn" onClick={() => setPostOpen(true)}><i className="fas fa-feather text-primary"></i></button>)}
      <PostList posts={posts} />
    </div>
  )
}

export default Profile
