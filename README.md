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

#### Form

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

#### Inputs
As shown in the example above, inputs are defined by JSON objects.

##### Type
The type of the input is determined by the `type` property. By default the type is the default HTML text input. The types supported by the form builder are as follows:

* text
* password
* date
* email
* month
* number
* range
* color
* search
* time
* url
* week
* textarea
* checkbox
* select
* radio

##### Label (Optional)
The optional `label` property will render a label above the input with the given value as the text.

##### Placeholder (Optional)
The `placeholder` property will add a HTML placeholder to the input.

##### Filter (Optional)
Filters are ran on the input text, if the check fails the input is ignored. There are 3 way to add filters. Filters can be defined as Regex, either as a JavaScript RegExp or as a string wrapped in `//` for example `/^[0-9]*$/`. Another way of defining filters is by using present named rules. These rules are:

| Name | Description |
| --- | --- |
| numeric | Only numeric inputs are allowed |
| decimal | Only valid decimal numbers are allowed. (There must be a number before the first decimal place and only one decimal place) |

The final way to filter is to pass in a method. This method is called with the event as the first argument and is expected to return a boolean, if the input was valid or not.

##### Transformer (Optional)
Transformers are ran on and modify the input text. There are two types of transformers, `onChange` and `onBlur`. `onChange` transformers are executes on keypress and `onBlur` transformers are executed when the input loses focus. Much like filters one way to use filters are to use present named rules. These are as follows: 

| Name | Description |
| --- | --- |
| uppercase | All letters are made uppercase |
| lowercase | All letters are made lowercase |

Also as is with the case with filters a method can be passed in. The first argument is the event from the input, the expected return value is the input after being modified.

#### Submit Button

The `submitButton` prop expects an object in the following format.

```jsx
{
  className: 'submit-button-class',
  text: 'Submit form now!'
}
```

#### Loading

The `loading` prop expects a boolean indicating whether the form should display a loading
state. If set to `true`, a `loading` class is applied to the submit button. 

Alternatively, you can replace the submit button entirely when `loading` is set to true.
To do this, you must also set the `loadingElement` prop.

#### Loading Element

The `loadingElement` prop expects an element which will be rendered instead of the submit
button if the `loading` prop is set to `true`.
