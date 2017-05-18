import React from 'react'

import * as localDb from '../localDb'

// Controlled component form
// https://facebook.github.io/react/docs/forms.html#controlled-components
export default React.createClass({

  itemModel: {
    name: '',
    description: '',
    color: 'aliceblue'
  },

  componentWillReceiveProps ({ editItem }) {
    if (editItem) {
      this.setState({ item: editItem })
    }
  },

  getInitialState () {
    return {
      errors: {
        isRequired: 'This field cannot be empty.',
        isNotChartreuse: 'Nobody likes chartreuse.'
      },
      item: { ...this.itemModel },
      invalid: {},
      validation: {
        name: [ 'isRequired' ],
        color: [ 'isNotChartreuse' ]
      },
      validators: {
        isRequired: val => val && val.length,
        isNotChartreuse: color => color !== 'chartreuse'
      }
    }
  },

  handleSubmit (evt) {
    evt.preventDefault()

    if (this.validate()) {
      this.props.saveItem(this.state.item)
      this.resetForm()
    }
  },

  handleChange (evt) {
    // select lists have no 'name' attribute
    const field = evt.target.name || 'color'
    this.setState({
      item: {
        ...this.state.item,
        [field]: evt.target.value
      }
    })
  },

  resetForm (evt) {
    if (evt) evt.preventDefault()

    this.setState({
      item: { ...this.itemModel },
      invalid: {}
    })
  },

  validate () {
    const invalid = { ...this.state.invalid }
    for (const field in this.state.item) {
      const validators = this.state.validation[field] || []
      validators.forEach(v => {
        if (!this.state.validators[v](this.state.item[field])) {
          invalid[field] = this.state.errors[v]
        } else {
          delete invalid[field]
        }
      })
    }
    this.setState({ invalid })
    return !Object.keys(invalid).length
  },

  render () {
    return (
      <form onSubmit={this.handleSubmit}>

        <label htmlFor="title">Title</label>
        <input type="text" className="u-full-width" name="title" value={this.state.item.title} onChange={this.handleChange} />
        {this.state.invalid.title ? (<div className="error">{this.state.invalid.title}</div>) : null}

        <label htmlFor="description">Message</label>
        <textarea className="u-full-width" name="message" value={this.state.item.message} onChange={this.handleChange} />
        {this.state.invalid.message ? (<div className="error">{this.state.invalid.message}</div>) : null}

        <label htmlFor="color">Colour</label>
        <select value={this.state.item.color} onChange={this.handleChange} className="u-full-width">
          {this.itemColors.map((color, i) => (
            <option key={i} value={color}>{color}</option>
          ))}
        </select>
        {this.state.invalid.color ? (<div className="error">{this.state.invalid.color}</div>) : null}

        <input type="submit" className="button-primary" type="submit" value={this.props.editItem ? 'Save' : 'Add'} />
        <button className="button-warning" onClick={(evt) => this.resetForm(evt)}>Reset</button>
      </form>
    )
  }
})
