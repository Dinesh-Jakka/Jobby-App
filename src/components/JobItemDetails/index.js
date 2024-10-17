import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaStar, FaAddressCard} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarData: [],
    showJobs: 'initial',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const formattedData = {
        jobDetails: {
          companyLogoUrl: fetchedData.job_details.company_logo_url,
          companyWebsiteUrl: fetchedData.job_details.company_website_url,
          employmentType: fetchedData.job_details.employment_type,
          jobDescription: fetchedData.job_details.job_description,
          lifeAtCompany: fetchedData.job_details.life_at_company,
          location: fetchedData.job_details.location,
          packagePerAnnum: fetchedData.job_details.package_per_annum,
          rating: fetchedData.job_details.rating,
          skills: fetchedData.job_details.skills,
          title: fetchedData.job_details.title,
        },
        similarJobs: fetchedData.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({
        showJobs: 'success',
        jobDetails: formattedData.jobDetails,
        similarData: formattedData.similarJobs,
      })
    } else {
      this.setState({showJobs: 'failure'})
    }
  }

  onClickJobsRetry = () => {
    // console.log('onclick retry')
    this.setState({showJobs: 'initial'})
    this.getJobDetails()
  }

  renderJobItems = () => {
    const {showJobs} = this.state
    switch (showJobs) {
      case 'initial':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'success':
        return this.renderJobDetails()
      case 'failure':
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-img"
            />
            <h1 className="no-jobs-head">Oops! Something Went Wrong</h1>
            <p className="no-jobs-para">
              We cannot seem to find the page you are looking for
            </p>
            <button
              onClick={this.onClickJobsRetry}
              className="fail-btn"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    console.log(similarData)
    return (
      <div className="each-job-item">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="details-contain">
          <div className="location-container">
            <IoLocationSharp />
            <p className="location">{location}</p>
          </div>
          <div className="employment-type-container">
            <FaAddressCard />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="des-con">
          <h1 className="description-head">Description</h1>
          <a className="visit-anchor" href={companyWebsiteUrl}>
            Visit <BiLinkExternal />
          </a>
        </div>

        <p className="description">{jobDescription}</p>
        <h1 className="skills-head">Skills</h1>
        <ul className="skills-container">
          {skills.map(each => (
            <Skills details={each} key={each.name} />
          ))}
        </ul>
        <div className="life-at-company-container">
          <h1 className="life-at-company-container-head">Life at Company</h1>
          <div className="life-at-company-content">
            <p className="life-at-company-para">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="skills-head">Similar Jobs</h1>
        <ul className="similar-container">
          {similarData.map(each => (
            <SimilarJobs details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {showJobs} = this.state
    return (
      <div className="job-item-details-container">
        <Header />

        {showJobs === 'initial' ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          this.renderJobItems()
        )}
        {/* <li className="job-item">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <p className="lpa">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-head">Description</h1>
        <p className="description">{jobDescription}</p>
      </li> */}
      </div>
    )
  }
}

export default JobItemDetails
