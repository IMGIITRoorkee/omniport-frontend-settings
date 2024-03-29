import React from 'react'
import { connect } from 'react-redux'
import { startCase, toLower } from 'lodash'
import { Checkbox, Segment, Accordion, Icon, Button, Pagination } from 'semantic-ui-react'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { appDetails, Loading, getTheme } from 'formula_one'

import Sublist from './manage-communications/sublist'
import { appBaseURL } from '../urls'
import { getSubscriptionCategoryList, submitSubscription } from '../actions'

class ManageCommunications extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: -1,
      scope: {},
      innerScope: {},
      refState: {},
      indeterminate: {},
      save: [],
      drop: [],
      error: false,
      succes: false,
      trigger: 1,
      activePage: 1
    }
  }

  componentDidMount() {
    const {
      subscriptionCategoryList,
      GetSubscriptionCategoryList,
      medium
    } = this.props
    if (!subscriptionCategoryList.loaded) {
      GetSubscriptionCategoryList(
        medium,
        this.state.activePage,
        this.successGetCallback,
        this.errGetCallback
      )
    }
  }
  functionCallback = (inscope, indeterchild) => {
    this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
    const { scope, indeterminate, innerScope } = this.state
    Object.assign(this.state.scope, inscope)
    this.props.subscriptionCategoryList.data
      .filter(app => {
        return appDetails(app.slug).present || true
      })
      .map(app => {
        let indeter = false
        let allTrue = true
        let allFalse = false
        if (app.subcategories) {
          Object.keys(app.subcategories).forEach(function (key) {
            if (scope[app.subcategories[key].slug] == true) indeter = true
            if (indeterchild[app.subcategories[key].slug]) indeter = true
            allFalse = allFalse || scope[app.subcategories[key].slug]
            allTrue = allTrue && scope[app.subcategories[key].slug]
          })
          if ((allTrue !== undefined) && (!allFalse !== undefined) && (indeter !== undefined)) {
            if (allTrue) {
              scope[app.slug] = true
              innerScope[app.slug] = true
              indeterminate[app.slug] = false
            }
            if (!allFalse) {
              scope[app.slug] = false
              innerScope[app.slug] = false
              indeterminate[app.slug] = false
            }
            if ((indeter && allFalse && !allTrue) || (indeter && !allFalse)) {
              scope[app.slug] = false
              innerScope[app.slug] = false
              indeterminate[app.slug] = true
            }
          }
        }
      })
    this.setState({
      scope: scope,
      indeterminate: indeterminate,
      innerScope: innerScope
    })
  }
  successGetCallback = res => {
    const { data } = res
    data.results.filter(app => {
      return appDetails(app.slug).present || true
    })
      .map((app) => {
        const pScope = this.state.scope
        pScope[app.slug] = app.subscribed ? true : false
        this.setState({
          scope: pScope
        })
        this.transRef = React.createRef()
        const refState = this.state.refState
        refState[app.slug] = this.transRef

        this.setState({
          refState: refState
        })
        if (!this.state.refState[app.slug].current) {
          this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
        }
      })
    data.results.filter(app => {
      return appDetails(app.slug).present.subcategories || true
    })
      .map((category) => {
        const tScope = this.state.scope
        const inscope = this.state.innerScope
        tScope[category.slug] = category.subscribed ? true : false
        inscope[category.slug] = category.subscribed ? true : false
        this.setState({
          scope: tScope,
          innerScope: inscope
        })
      })
  }

  handleCheckboxChange = (e, { checked }) => {
    this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
    const prevScope = this.state.scope
    const inscope = this.state.innerScope
    const indeterminate = this.state.indeterminate
    if (indeterminate[e.target.id] == true) indeterminate[e.target.id] = false
    prevScope[e.target.id] = checked
    const head = this.props.subscriptionCategoryList.data
    Object.keys(head).forEach(function (key) {
      if (head[key].slug == e.target.id) {
        const subhead = head[key].subcategories
        if (subhead) {
          Object.keys(subhead).forEach(function (key) {
            prevScope[subhead[key].slug] = checked
            inscope[subhead[key].slug] = checked
          })
        }
      }
    })
    this.setState({
      scope: prevScope,
      innerScope: inscope,
      indeterminate: indeterminate
    })
    if (this.state.refState[e.target.id]) {
      if (this.state.refState[e.target.id].current) {
        this.state.refState[e.target.id].current.updateScope()
      }
    }
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
  handleChildClick = e => {
    e.stopPropagation()
  }
  handleSubmit = () => {
    const { save, drop, scope } = this.state
    const { medium } = this.props
    Object.keys(scope).forEach(function eachKey(key) {
      if (scope[key] == true) save.push(key)
      else if (scope[key] == false) drop.push(key)
    })
    const data = { save, drop }
    this.props.SubmitSubscription(
      data,
      medium,
      this.successCallback,
      this.errCallback
    )
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({ activePage })
    const { medium, GetSubscriptionCategoryList } = this.props
    GetSubscriptionCategoryList(
      medium,
      activePage,
      this.successGetCallback,
      this.errGetCallback
    )
  }

  successCallback = res => {
    this.setState({
      success: true,
      error: false,
      save: [],
      drop: []
    })
  }
  errCallback = err => {
    this.setState({
      success: false,
      error: true,
      save: [],
      drop: []
    })
  }

  render() {
    const { subscriptionCategoryList, medium, header } = this.props
    const { activeIndex, error, success } = this.state
    return (
      <div>
        <CustomBreadcrumb
          list={[
            { name: "Settings", link: appBaseURL() },
            { name: "Manage " + startCase(toLower(header)) }
          ]}
        />
        <Accordion>
          {subscriptionCategoryList.loaded ? (
            subscriptionCategoryList.data &&
            subscriptionCategoryList.data
              .filter(app => {
                return appDetails(app.slug).present || true
              })
              .map((app, index) => {
                return (
                  <React.Fragment key={index}>
                    <Accordion.Title
                      as={Segment}
                      color={getTheme()}
                      attached="top"
                      index={index}
                      onClick={this.handleClick}
                    >
                      <Checkbox
                        label={app.name}
                        id={app.slug}
                        defaultChecked={app.subscribed}
                        checked={this.state.scope[app.slug]}
                        indeterminate={false || this.state.indeterminate[app.slug]}
                        onChange={this.handleCheckboxChange}
                        onClick={this.handleChildClick}
                      />
                      {app.subcategories && (
                        <Icon
                          name={
                            activeIndex === index ? "angle down" : "angle right"
                          }
                        />
                      )}

                    </Accordion.Title>
                    {app.subcategories && this.state.innerScope && (
                      <Accordion.Content
                        as={Segment}
                        active={activeIndex === index}
                        attached="bottom"
                      >
                        <Sublist
                          categories={app.subcategories}
                          childScope={this.state.innerScope}
                          scopeCallback={this.functionCallback}
                          ref={this.state.refState[app.slug]}
                        />
                      </Accordion.Content>
                    )}
                  </React.Fragment>
                )
              })
          ) : (
              <Loading />
            )}
        </Accordion>
        {subscriptionCategoryList.loaded && (
          <Segment basic vertical textAlign="center">
            <Pagination
              boundaryRange={1}
              siblingRange={1}
              activePage={this.state.activePage}
              totalPages={Math.ceil(subscriptionCategoryList.count / 10)}
              onPageChange={this.handlePageChange}
            />
          </Segment>
        )}
        <Segment vertical>
          <Button
            basic
            icon="check"
            color={getTheme()}
            onClick={this.handleSubmit}
            content="Save"
          />
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    subscriptionCategoryList: state.subscriptionCategoryList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GetSubscriptionCategoryList: (
      medium,
      page,
      successGetCallback,
      errGetCallback
    ) => {
      dispatch(
        getSubscriptionCategoryList(
          medium,
          page,
          successGetCallback,
          errGetCallback
        )
      )
    },
    SubmitSubscription: (data, medium, successCallback, errCallback) => {
      dispatch(submitSubscription(data, medium, successCallback, errCallback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCommunications)
