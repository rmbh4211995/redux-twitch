import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = formProps => {
    const { input, label, meta } = formProps
    const fieldClassName = `field ${meta.error && meta.touched ? 'error' : ''}`
    
    return (
      <div className={fieldClassName}>
        <label>{label}</label>
        <input 
          {...input} 
          placeholder={`Enter a ${label.toLowerCase()}`} 
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    // this.props.createStream(formValues)
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Title" />
        <Field 
          name="description" 
          component={this.renderInput} 
          label="Description" 
        />
      
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = formValues => {
  const errors = {}

  if (!formValues.title) {
    errors.title = "Please enter a title"
  } 
  
  if (!formValues.description) {
    errors.description = "Please enter a description"
  }

  return errors
}

 export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm)

// const wrappedForm = reduxForm({
//   form: 'streamCreate',
//   validate
// })(StreamCreate)

// export default connect(null, { createStream })(wrappedForm)