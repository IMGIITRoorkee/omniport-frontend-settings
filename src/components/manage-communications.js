import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Checkbox, Segment, Accordion, Icon, Button, Message } from "semantic-ui-react";

import CustomBreadcrumb from "core/common/src/components/custom-breadcrumb";
import { appDetails, Loading } from "formula_one";
import { getSubscriptionCategoryList, submitSubscription } from "../actions";
import Sublist from "./manage-communications/sublist";

import "../css/communications.css";
import { appBaseURL } from "../urls";
import { getTheme } from "../../../../formula_one/src/utils";
import { checkPropTypes } from "prop-types";

class ManageCommunications extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: -1,
      scope: {},
      innerScope: {},
      save: [],
      drop: [],
      error: false,
      succes: false,
    }
  }

  componentDidMount() {
    const {
      subscriptionCategoryList,
      GetSubscriptionCategoryList,
      medium
    } = this.props;
    if (!subscriptionCategoryList.loaded) {
      GetSubscriptionCategoryList(
        medium,
        this.successGetCallback,
        this.errGetCallback);
    }
  }
  functionCallback = (inscope) => {
    Object.assign(this.state.scope, inscope);
  }
  successGetCallback = res => {
    const { data } = res;
    data.results.filter(app => {
      return appDetails(app.slug).present || true;
    })
      .map((app) => {
        const pScope = this.state.scope;
        pScope[app.slug] = app.subscribed ? true : false;
        this.setState({
          scope: pScope
        })
      })
    data.results.filter(app => {
      return appDetails(app.slug).present.subcategories || true;
    })
      .map((category) => {
        const tScope = this.state.scope;
        tScope[category.slug] = category.subscribed ? true : false;
        this.setState({
          scope: tScope
        })
      })
  }

  handleCheckboxChange = (e, { checked }) => {
    const prevScope = this.state.scope
    const inscope = this.state.innerScope
    prevScope[e.target.id] = checked
    var regex = new RegExp(`${e.target.id}..*`);
    Object.keys(this.state.scope).some(function (key) {
      if (regex.test(key)) {
        prevScope[key] = checked;
        inscope[key] = checked;
      };
    })
    this.setState({
      scope: prevScope,
      innerScope: inscope
    })

  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  handleSubmit = () => {
    const { save, drop, scope } = this.state;
    const { medium } = this.props
    Object.keys(scope).forEach(function eachKey(key) {
      if (scope[key] == true) save.push(key);
      else if (scope[key] == false) drop.push(key);
    });
    console.log(this.state.save);
    console.log(this.state.drop);
    const data = { save, drop };
    this.props.SubmitSubscription(
      data,
      medium,
      this.successCallback,
      this.errCallback
    )
  }

  successCallback = res => {
    this.setState({
      success: true,
      error: false,
    })
  }
  errCallback = err => {
    this.setState({
      success: false,
      error: true,
    })
  }

  render() {
    const { subscriptionCategoryList, medium } = this.props;
    const { activeIndex, error, success } = this.state;
    return (
      <div>
        <CustomBreadcrumb
          list={[
            { name: "Settings", link: appBaseURL() },
            { name: "Manage " + _.startCase(_.toLower(medium)) }
          ]}
        />
        {error && (
          <Message
            negative
            header='Error'
            content={`Failed to update.`}
            icon='frown outline'
          />
        )}
        {success && (
          <Message
            positive
            header='Success'
            content={`Successfully updated subscriptions.`}
            icon='check'
          />
        )}
        <Accordion>
          {subscriptionCategoryList.loaded ? (
            subscriptionCategoryList.data &&
            subscriptionCategoryList.data
              .filter(app => {
                return appDetails(app.slug).present || true;
              })
              .map((app, index) => {
                return (
                  <>
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
                        onChange={this.handleCheckboxChange}
                      />
                      <Icon
                        name={
                          activeIndex === index ? "angle down" : "angle right"
                        }
                      />
                    </Accordion.Title>

                    <Accordion.Content
                      as={Segment}
                      active={activeIndex === index}
                      attached="bottom"
                    >
                      {app.subcategories && this.state.innerScope && (
                        <Sublist categories={app.subcategories} childScope={this.state.innerScope} scopeCallback={this.functionCallback} />
                      )}
                    </Accordion.Content>
                  </>
                );
              })
          ) : (
              <Loading />
            )}
        </Accordion>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriptionCategoryList: state.subscriptionCategoryList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetSubscriptionCategoryList: (medium, successGetCallback, errGetCallback) => {
      dispatch(getSubscriptionCategoryList(medium, successGetCallback, errGetCallback));
    },
    SubmitSubscription: (data, medium, successCallback, errCallback) => {
      dispatch(submitSubscription(data, medium, successCallback, errCallback));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCommunications);
