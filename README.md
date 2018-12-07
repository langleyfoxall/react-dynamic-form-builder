# React Dynamic Form Builder

This package provide a React component that allows developers to quickly build
fully featured forms from a simple JSON configuration.

<p align="center">
    <img width="800" src="https://user-images.githubusercontent.com/650645/49640681-17274f00-fa06-11e8-8179-25bbc0246790.png"/>
</p>

## Features

* Build forms from JSON
* Field labels
* Default values
* Validation, including visual failure indicators
* Transformers
* Optional loading state

## Installation

To install this package, you can use `npm` or `yarn` as shown below.

```bash
npm install --save @langleyfoxall/react-dynamic-form-builder

yarn add @langleyfoxall/react-dynamic-form-builder
```

## Usage

For a quick overview of how to use the basic features of the React Dynamic Form
Builder, check out the [live demo](https://langleyfoxall.github.io/react-dynamic-form-builder/demo/).

### Props

### Form

The `form` prop expect an array that represents the fields to display within the form.
This is the main JSON configuration that is used to display, validate and transform
form fields.

The following example shows the expected format of the array passed to this prop.

```json
[
    {
        "name": "name",
        "label": "Name",
        "placeholder": "John Smith"
    },
    {
        "name": "username",
        "label": "Username",
        "placeholder": "john.smith",
        "validationRules": [
            "required"
        ]
    },
    {
        "name": "email",
        "label": "Email",
        "placeholder": "john.smith@example.com",
        "validationRules": [
            {
                "rule": "required",
                "message": "Email address is required"
            },
            {
                "rule": "email",
                "message": "Must be an email address"
            }
        ]
    },
    {
        "name": "numbers",
        "label": "Favourite number",
        "placeholder": "Numbers only",
        "filter": "numeric"
    },
    {
        "name": "uppercase",
        "label": "Uppercase word",
        "placeholder": "Uppercase transformer",
        "transformer": {
            "onChange": "uppercase"
        }
    }
]
```


### Submit Button

The `submitButton` prop expects an object in the following format.

```jsx
{
  className: 'submit-button-class',
  text: 'Submit form now!'
}
```

### Loading

The `loading` prop expects a boolean indicating whether the form should display a loading
message. If set to `true`, a loading message is displayed in place of the submit button. 
If set to `false`, the form is displayed normally.

To use the `loading` prop, you must have also set the `loadingElement` prop.

### Loading Element

The `loadingElement` prop expects an element which will be rendered instead of the submit
button if the `loading` prop is set to `true`.