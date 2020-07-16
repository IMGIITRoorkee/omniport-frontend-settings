import React from "react";
import { Checkbox, List } from "semantic-ui-react";

import "../../css/communications.css";
import { appDetails } from "../../../../../formula_one/src/utils";

export default class Sublist extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      innerScope: {},
      outerScope: this.props.childScope,
      currentScope: {}
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.childScope !== state.outerScope) {
      return {
        outerScope: props.childScope
      };
    }
    console.log(props.childScope)
    Object.assign(state.currentScope, props.childScope)
    return null;
  }
  componentDidMount() {
    this.props.categories.map(category => {
      const pScope = this.state.currentScope
      pScope[category.slug] = category.subscribed;
      this.setState({
        currentScope: pScope
      })
    })
    this.props.categories
      .filter(app => {
        return appDetails(app.slug).present.subcategories || true;
      })
      .map(category => {
        const tScope = this.state.currentScope;
        tScope[category.slug] = category.subscribed ? true : false;
        this.setState({
          currentScope: tScope
        })
      })
    this.props.scopeCallback(this.state.currentScope);
  }


  functionCallback = (inscope) => {
    Object.assign(this.state.currentScope, inscope);
    this.props.scopeCallback(this.state.currentScope);
  }


  handleCheckboxChange = (e, { checked }) => {
    const prevScope = this.state.currentScope
    const inscope = this.state.innerScope
    prevScope[e.target.id] = checked
    var regex = new RegExp(`${e.target.id}..*`);
    Object.keys(this.state.currentScope).some(function (key) {
      if (regex.test(key)) {
        prevScope[key] = checked;
        inscope[key] = checked;
      };
    })
    this.setState({
      currentScope: prevScope,
      innerScope: inscope
    })
    console.log(this.state.currentScope)
    this.props.scopeCallback(this.state.currentScope);
  }
  render() {
    const { categories } = this.props;
    return (
      <List>
        {categories.map(category => {
          return (
            <List.Item styleName={"list-item"}>
              <List.Icon name={"angle right"} style={{ opacity: 0 }} />{" "}
              {/*Sorry*/}
              {this.state.currentScope && (
                <List.Content>
                  <Checkbox
                    label={category.name}
                    id={category.slug}
                    defaultChecked={category.subscribed}
                    checked={this.state.currentScope[category.slug]}
                    onChange={this.handleCheckboxChange}
                    disabled={this.props.childScope[category.slug]}
                  />
                  {category.subcategories && (
                    <Sublist categories={category.subcategories} childScope={this.state.innerScope} scopeCallback={this.functionCallback} />
                  )}
                </List.Content>
              )
              }
            </List.Item>
          );
        })}
      </List>
    );
  }
}
