/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
// import Profile from '../Profile'
import JobItem from '../JobItem'
import JobItemDetails from '../JobItemDetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    profileData: {},
    jobItemsData: [],
    showProfile: 'initial',
    showJobItems: 'initial',
    checkboxInputs: [],
    radioOption: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({showProfile: 'success'})
      const fetchedData = await response.json()
      this.setState({
        profileData: {
          profileImageUrl: fetchedData.profile_details.profile_image_url,
          name: fetchedData.profile_details.name,
          shortBio: fetchedData.profile_details.short_bio,
        },
      })
    } else {
      this.setState({showProfile: 'failure'})
    }

    // const {profileData} = this.state
    // console.log(fetchedData.profile_details)
    // console.log(profileData)
  }

  getJobs = async () => {
    const {checkboxInputs, radioOption, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const empType = checkboxInputs.join(',')
    // console.log(empType, radioOption)
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${radioOption}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    const {jobs} = fetchedData
    if (response.ok === true) {
      this.setState({showJobItems: 'success'})
      if (jobs.length === 0) {
        this.setState({showJobItems: 'noJobs'})
      } else {
        // console.log(jobs)
        const formattedJobsData = jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))
        this.setState({jobItemsData: formattedJobsData})
      }

      // {company_logo_url,employment_type,id,job_description,location,package_per_annum,rating,title}
    } else {
      this.setState({showJobItems: 'failure'})
    }

    // const {profileData} = this.state
    // console.log(fetchedData.profile_details)
    // console.log(profileData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickJobsRetry = () => {
    this.getJobs()
  }

  onClickProfileRetry = () => {
    this.getProfile()
  }

  renderProfile = () => {
    const {showProfile, profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    switch (showProfile) {
      case 'initial':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'success':
        return (
          <div className="profile-bg">
            <img src={profileImageUrl} className="profile-icon" alt="profile" />
            <h1 className="profile-head">{name}</h1>
            <p className="profile-bio">{shortBio}</p>
          </div>
        )
      case 'failure':
        return (
          <button
            onClick={this.onClickProfileRetry}
            className="fail-btn"
            type="button"
          >
            Retry
          </button>
        )
      default:
        return null
    }
  }

  renderJobItems = () => {
    const {showJobItems, jobItemsData} = this.state
    switch (showJobItems) {
      case 'initial':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'success':
        return jobItemsData.map(each => (
          <JobItem
            onClickJobItem={this.onClickJobItem}
            jobDetails={each}
            key={each.id}
          />
        ))
      case 'failure':
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-img"
            />
            <h1 className="no-jobs-head">Oops! Something went wrong</h1>
            <p className="no-jobs-para">
              We cannot seem to find the page you are looking for.
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
      case 'noJobs':
        return (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-jobs-head">No Jobs Found</h1>
            <p className="no-jobs-para">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )
      default:
        return null
    }
  }

  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )

    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobs,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({checkboxInputs: filteredData}, this.getJobs)
    }
  }

  onGetRadioOption = event => {
    this.setState({radioOption: event.target.id}, this.getJobs)
  }

  renderTypeFilters = () => (
    <>
      <h1 className="filter-head">Type of Employment</h1>
      <ul className="check-boxes-container">
        {employmentTypesList.map(eachItem => (
          <li className="li-container" key={eachItem.employmentTypeId}>
            <input
              className="input-box"
              id={eachItem.employmentTypeId}
              type="checkbox"
              onChange={this.onGetInputOption}
            />
            <label className="label" htmlFor={eachItem.employmentTypeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  renderSalaryFilters = () => (
    <>
      <h1 className="filter-head">Salary Range</h1>
      <ul className="radio-button-container">
        {salaryRangesList.map(eachItem => (
          <li className="li-container" key={eachItem.salaryRangeId}>
            <input
              className="radio"
              id={eachItem.salaryRangeId}
              type="radio"
              name="radio"
              onChange={this.onGetRadioOption}
            />
            <label className="label" htmlFor={eachItem.salaryRangeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  onClickJobItem = id => {
    console.log(id)
    return <JobItemDetails />
  }

  onClickSearchBtn = () => this.getJobs()

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-route">
        <Header />
        <div className="jobs-route-content">
          <div className="left-part-container">
            {this.renderProfile()}
            <hr />
            {this.renderTypeFilters()}
            <hr />
            {this.renderSalaryFilters()}
          </div>
          <div className="right-part-container">
            <div className="search-container">
              <input
                onChange={this.onChangeSearchInput}
                onKeyPress={this.handleKeyPress}
                type="search"
                value={searchInput}
                placeholder="Search..."
                className="search"
              />
              <button
                onClick={this.onClickSearchBtn}
                type="button"
                data-testid="searchButton"
                className="search-btn"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <ul className="job-items-container">{this.renderJobItems()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
