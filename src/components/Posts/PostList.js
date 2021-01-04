import React from 'react'

const PostList = ({ posts }) => {
  /**
   * post object
   * {"postId":"GYiPTZwlSl8gsJ54SefU","likes":0,"createdOn":1609713009930,"user":"N2jicupfkmciZrt63r5Ac19uXQZ2","post":"Anyone want to go fishing","profile":{"following":[],"posts":["posts/GYiPTZwlSl8gsJ54SefU"],"followers":[],"uid":"N2jicupfkmciZrt63r5Ac19uXQZ2","username":"samlider","name":"sam lider"}}
   */
  const PostItems = posts.map(post => (
    <div className="row col-sm-12 px-1 my-1 mx-auto" key={post.postId}>
      <div className="card flex-fill">
        <div className="card-body bg-light flex-fill">
          <div className="d-flex flex-row justify-content-evenly align-items-center">

            <img src={post.profile.profile_img || process.env.PUBLIC_URL + 'profile-img.jpg'} alt='profile img' className='avatar align-self-start' onClick />
            <div className="flex-fill">
              <h5 className='car-title' style={{ marginBottom: 0, lineHeight: '100%'}}>{post.profile.name}</h5>
              <small style={{ fontSize: '0.5rem', lineHeight: '0.5rem', fontStyle: 'italic' }}>{new Date(post.createdOn).toLocaleString()}</small>
              <p>{post.post}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
  return (
    <div className='row m-2'>
      {PostItems}
    </div>
  )
}

export default PostList
