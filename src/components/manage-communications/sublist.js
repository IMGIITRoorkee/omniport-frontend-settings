import React from "react";
import { Checkbox, List } from "semantic-ui-react";

import "../../css/communications.css";
import { appDetails } from "../../../../../formula_one/src/utils";

export default class Sublist extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      innerScope: {},
    }
  }
  componentDidMount() {
    this.props.categories.map(category => {
      const pScope = this.state.innerScope
      pScope[category.slug] = category.subscribed;
      this.setState({
        innerScope: pScope
      })
    })
    this.props.categories
      .filter(app => {
        return appDetails(app.slug).present.subcategories || true;
      })
      .map(category => {
        const tScope = this.state.innerScope;
        tScope[category.slug] = category.subscribed ? true : false;
        this.setState({
          innerScope: tScope
        })
      })
    this.props.scopeCallback(this.state.innerScope);
  }
  functionCallback = (inscope) => {
    Object.assign(this.state.innerScope, inscope);
    this.props.scopeCallback(this.state.innerScope);
    console.log(this.state.innerScope);
  }

  handleCheckboxChange = (e, { checked }) => {
    const prevScope = this.state.innerScope
    prevScope[e.target.id] = checked
    this.setState({
      innerScope: prevScope
    })
    console.log(this.state.innerScope)
    this.props.scopeCallback(this.state.innerScope);
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
              <List.Content>
                <Checkbox label={category.name} id={category.slug} defaultChecked={category.subscribed} onChange={this.handleCheckboxChange} />
                {category.subcategories && (
                  <Sublist categories={category.subcategories} scopeCallback={this.functionCallback} />
                )}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  }
}
