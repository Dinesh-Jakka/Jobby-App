import './index.css'

import {FaStar, FaAddressCard} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details
  // console.log(details)
  return (
    <li className="job-item">
      <div className="job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="header-content">
          <h1 className="job-head">{title}</h1>
          <div className="rating-container">
            <FaStar className="rating-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="details-container">
        <div className="location-container">
          <IoLocationSharp />
          <p className="location">{location}</p>
        </div>
        <div className="employment-type-container">
          <FaAddressCard />
          <p className="employment-type">{employmentType}</p>
        </div>
      </div>
      <hr />
      <h1 className="description-head">Description</h1>
      <p className="description">{jobDescription}</p>
    </li>
  )
}
export default SimilarJobs
