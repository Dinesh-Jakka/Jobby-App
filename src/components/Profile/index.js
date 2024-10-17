import './index.css'

const Profile = props => {
  const {profileData} = props
  const {profileImageUrl, name, shortBio} = profileData
  return (
    <div className="profile-bg">
      <img src={profileImageUrl} className="profile-icon" alt="profile" />
      <h1 className="profile-head">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}

export default Profile
