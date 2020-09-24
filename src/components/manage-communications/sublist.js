import React from "react"
import { Checkbox, List } from "semantic-ui-react"

import "../../css/communications.css"
import { appDetails } from "../../../../../formula_one/src/utils"

export default class Sublist extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      innerScope: {},
      currentScope: {},
      refState: {},
      indeterminate: {},
      trigger: 1
    }
  }

  componentDidMount() {
    this.props.categories.map(category => {
      const pScope = this.state.currentScope
      pScope[category.slug] = category.subscribed
      const childScope = this.props.childScope
      if (childScope[category.slug]) pScope[category.slug] = childScope[category.slug]

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
        const childScope = this.props.childScope
        tScope[category.slug] = category.subscribed ? true : false
        if (childScope[category.slug]) tScope[category.slug] = childScope[category.slug]
        this.setState({
          currentScope: tScope,
        })
      })
    this.props.scopeCallback(this.state.currentScope)
  }
  updateScope = () => {
    this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
    const childScope = this.props.childScope
    const newScope = {}
    const prevScope = this.state.currentScope
    const inscope = this.state.innerScope
    const head = this.props.categories
    const refState = this.state.refState
    Object.keys(head).forEach(function (key) {
      newScope[head[key].slug] = childScope[head[key].slug]
    })
    Object.keys(childScope).forEach(function (key) {
      Object.keys(head).forEach(function (key2) {
        if (head[key2].slug == key) {
          prevScope[head[key2].slug] = childScope[key]
          newScope[head[key2].slug] = childScope[key]
          inscope[head[key2].slug] = childScope[key]
          const subhead = head[key2].subcategories
          if (subhead) {
            Object.keys(subhead).forEach(function (key3) {
              prevScope[subhead[key3].slug] = childScope[key]
              newScope[subhead[key3].slug] = childScope[key]
              inscope[subhead[key3].slug] = childScope[key]
            })
          }
        }
      })
    })


    this.setState({
      currentScope: newScope,
      innerScope: inscope
    })
    Object.keys(childScope).forEach(function (key) {
      if (refState[key]) {
        if (refState[key].current)
          refState[key].current.updateScope()
      }
    })
    this.props.scopeCallback(newScope)

  }


  functionCallback = (inscope) => {
    this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
    const { currentScope, indeterminate, innerScope, refState, trigger } = this.state
    const { categories } = this.props
    Object.assign(this.state.currentScope, inscope)

    this.props.categories.map(category => {
      var indeter = false
      var allTrue = true
      var allFalse = false
      if (category.subcategories) {
        Object.keys(category.subcategories).forEach(function (key) {
          if (currentScope[category.subcategories[key].slug] == false) indeter = true
          allFalse = allFalse || currentScope[category.subcategories[key].slug]
          allTrue = allTrue && currentScope[category.subcategories[key].slug]
        })
        if ((allTrue !== undefined) && (!allFalse !== undefined) && (indeter !== undefined)) {
          if (allTrue) {
            currentScope[category.slug] = true
            innerScope[category.slug] = true
            indeterminate[category.slug] = false
          }
          if (!allFalse) {
            currentScope[category.slug] = false
            innerScope[category.slug] = false
            indeterminate[category.slug] = false
          }
          if (indeter && allFalse) {
            currentScope[category.slug] = false
            innerScope[category.slug] = false
            indeterminate[category.slug] = true
          }
        }
      }
      this.setState({
        currentScope: currentScope,
        indeterminate: indeterminate,
        innerScope: innerScope
      })
    })
    this.props.scopeCallback(this.state.currentScope)
  }

  handleCheckboxChange = (e, { checked }) => {
    this.setState({ trigger: this.state.trigger == 1 ? 0 : 1 })
    const prevScope = this.state.currentScope
    const newScope = {}
    const inscope = this.state.innerScope
    const indeterminate = this.state.indeterminate
    const categories = this.props.categories
    Object.keys(categories).forEach(function (key) {
      if (categories[key].slug != e.target.id) {
        newScope[categories[key].slug] = prevScope[categories[key].slug]
      }
    })

    if (indeterminate[e.target.id] == true) { indeterminate[e.target.id] = false }
    newScope[e.target.id] = checked
    const head = this.props.categories
    Object.keys(head).forEach(function (key) {
      if (head[key].slug == e.target.id) {
        const subhead = head[key].subcategories
        if (subhead) {
          Object.keys(subhead).forEach(function (key) {
            newScope[subhead[key].slug] = checked
            inscope[subhead[key].slug] = checked
          })
        }
      }
    })

    this.setState({
      currentScope: newScope,
      innerScope: inscope,
      indeterminate: indeterminate
    })
    if (this.state.refState[e.target.id].current) {
      this.state.refState[e.target.id].current.updateScope()
    }
    this.props.scopeCallback(newScope)
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
                    indeterminate={false || this.state.indeterminate[category.slug]}
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
