import './index.css'

const Skills = props => {
  const {details} = props
  const imageUrl = details.image_url
  const {name} = details
  return (
    <li className="item">
      <img src={imageUrl} className="skill-img" alt={name} />
      <p className="skill">{name}</p>
    </li>
  )
}
export default Skills
