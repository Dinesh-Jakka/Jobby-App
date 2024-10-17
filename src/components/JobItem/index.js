import {Link, withRouter} from 'react-router-dom'

import {FaStar, FaAddressCard} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  // console.log(jobDetails)
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-img"
          />
          <div className="job-header-content">
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
          <div>
            <p className="lpa">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-head">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default withRouter(JobItem)
