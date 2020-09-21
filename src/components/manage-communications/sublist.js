import React from "react"
import { Checkbox, List } from "semantic-ui-react"

import "../../css/communications.css"
import { appDetails } from "../../../../../formula_one/src/utils"

export default class Sublist extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      innerScope: {},
      outerScope: this.props.childScope,
      currentScope: {},
      refState: {},
      trigger: 1
    }
  }

  componentDidMount() {
    this.props.categories.map(category => {
      const pScope = this.state.currentScope
      pScope[category.slug] = category.subscribed

      this.transRef = React.createRef()
      const refState = this.state.refState
      refState[category.slug] = this.transRef

      this.setState({
        currentScope: pScope,
        refState: refState
      })
      if (!this.state.refState[category.slug].current) {
        this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
      }
    })
    this.props.categories
      .filter(app => {
        return appDetails(app.slug).present.subcategories || true
      })
      .map(category => {
        const tScope = this.state.currentScope

        tScope[category.slug] = category.subscribed ? true : false
        this.setState({
          currentScope: tScope,
        })
      })
    this.props.scopeCallback(this.state.currentScope)
  }
  updateScope = () => {
    this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
    const childScope = this.props.childScope
    const newScope = this.state.currentScope
    const inscope = this.state.innerScope
    const head = this.props.categories
    const refState = this.state.refState
    Object.keys(childScope).forEach(function (key) {
      newScope[key] = childScope[key]
      inscope[key] = childScope[key]
      Object.keys(head).forEach(function (key2) {
        if (head[key2].slug == key) {
          const subhead = head[key2].subcategories
          if (subhead) {
            Object.keys(subhead).forEach(function (key3) {
              newScope[subhead[key3].slug] = childScope[key]
              inscope[subhead[key3].slug] = childScope[key]
            })
          }
        }
        if (refState[key]) {
          if (refState[key].current)
            refState[key].current.updateScope()
        }
      })
    })

    this.setState({
      currentScope: newScope,
      innerScope: inscope
    })
  }


  functionCallback = (inscope) => {
    Object.assign(this.state.currentScope, inscope)
    this.props.scopeCallback(this.state.currentScope)
  }

  handleCheckboxChange = (e, { checked }) => {
    this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
    const prevScope = this.state.currentScope
    const inscope = this.state.innerScope
    prevScope[e.target.id] = checked
    const head = this.props.categories
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
      currentScope: prevScope,
      innerScope: inscope
    })
    if (this.state.refState[e.target.id].current) {
      this.state.refState[e.target.id].current.updateScope()
    }
    this.props.scopeCallback(this.state.currentScope)
  }
  render() {
    const { categories } = this.props
    return (
      <List>
        {categories.map(category => {
          return (
            <List.Item key={category.slug} styleName={"list-item"}>
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
                  />

                  {category.subcategories && this.state.innerScope && (
                    <Sublist
                      categories={category.subcategories}
                      childScope={this.state.innerScope}
                      scopeCallback={this.functionCallback}
                      ref={this.state.refState[category.slug]}
                    />
                  )}
                </List.Content>
              )
              }
            </List.Item>
          )
        })}
      </List>
    )
  }
}
