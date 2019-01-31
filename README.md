<h1 align="center">
  <br />
  <br />
  Form Builder
  <br />
  <br />
  <br />
</h1>

<h5 align="center"><code>form-builder</code> aims to help make dynamic react forms easier.</h5>
<p align="center">
  <a href="https://www.npmjs.com/package/@langleyfoxall/react-dynamic-form-builder">
    <img src="https://badgen.net/npm/v/@langleyfoxall/react-dynamic-form-builder" />
  </a>
  <a href="https://www.npmjs.com/package/@langleyfoxall/react-dynamic-form-builder">
    <img src="https://badgen.net/npm/dt/@langleyfoxall/react-dynamic-form-builder" />
  </a>
  <a href="https://www.npmjs.com/package/@langleyfoxall/react-dynamic-form-builder">
    <img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@langleyfoxall/react-dynamic-form-builder@latest/" />
  </a>
</p>

<br />
<br />

#### Contents

* [Installation](#installation)
* [Basic Example](#basic-example)
* [Usage](#usage)
  * [Props](#props)
    * [`defaultInputClass`](#defaultInputClass)
    * [`defaultLabelClass`](#defaultLabelClass)
    * [`defaultContainerClass`](#defaultContainerClass)
    * [`defaultValidationErrorClass`](#defaultValidationErrorClass)
    * [`defaultSubmitClass`](#defaultSubmitClass)
    * [`defaultValues`](#defaultValues)
    * [`classPrefix`](#classPrefix)
    * [`invalidInputClass`](#invalidInputClass)
    * [`validInputClass`](#validInputClass)
    * [`validationTimeout`](#validationTimeout)
    * [`submitButton`](#submitButton)
    * [`loading`](#loading)
    * [`loadingElement`](#loadingElement)
    * [`formErrors`](#formErrors)
    * [`form`](#form)
  * [Schema](#schema)
    * [`name`](#name)
    * [`placeholder`](#placeholder)
    * [`label`](#label)
    * [`type`](#type)
    * [`render`](#render)
    * [`options`](#options)
    * [`radioContainerClass`](#radioContainerClass)
    * [`containerClass`](#containerClass)
    * [`inputClass`](#inputClass)
    * [`defaultValue`](#defaultValue)
    * [`defaultOptionText`](#defaultOptionText)
    * [`validationRules`](#validationRules)
    * [`transformer`](#transformer)
    * [`filter`](#filter)
* [Addons](#addons)
  * [Make your own](#make-your-own)
* [Similar Packages](#similar-packages)

## Installation

`form-builder` can be installed with [NPM][npm] or [Yarn][yarn].

```bash
# Installing with NPM
npm i --save @langleyfoxall/react-dynamic-form-builder
```

```bash
# Installing with Yarn
yarn add @langleyfoxall/react-dynamic-form-builder
```

<hr />
<br />

## Basic Example

```jsx
// ./forms/create-user.js
export default [
    {
        name: 'first_name',
        label: 'First Name'
    },
    {
        name: 'last_name',
        label: 'Last Name'
    },
    {
        name: 'email_address',
        label: 'Email Address',
        type: 'email'
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password'
    },
    {
        name: 'confirmation_password',
        label: 'Confirm Password',
        type: 'password'
    },
];
```

```jsx
// ./components/create-user-modal.jsx
import React from 'react';
import axios from 'axios';

import FormBuilder from '@langleyfoxall/react-dynamic-form-builder';

import Modal from './modal';
import Form from '../forms/create-user';

class CreateUserModal extends React.Component {
    onSubmit(submission) {
        return new Promise(resolve => (
            axios
                .post('/api/register', submission.data.form)
                .then(() => console.log('Successfully signed up'))
                .catch(() => console.log('Unable to sign up'))
                .finally(resolve)
        ))
    }

    render() {
        return (
            <Modal>
                <FormBuilder
                    form={Form}
                    onSubmit={this.onSubmit}
                    submitButton={{
                        text: 'Sign Up'
                    }}
                />
            </Modal>
        )
    }
}

export default CreateUserModal;
```

<hr />
<br />

## Usage

`form-builder` makes it easier to create dynamic react forms by handling most of the logic involved. Check out the [demo][demo].

### Props

The following props can be passed:

* `defaultInputClass` (string, default: `input`)
* `defaultLabelClass` (string, default: `label`)
* `defaultContainerClass` (string, default: `container`)
* `defaultValidationErrorClass` (string, default: `error-label`)
* `defaultSubmitClass` (string, default `submit`)
* `defaultValues` (object, default: `{}`)
* `classPrefix` (string, default: `rdf`)
* `invalidInputClass` (string, default: `invalid`)
* `validInputClass` (string, default: `valid`)
* `validationTimeout` (number, default: `1000`)
* `submitButton` (object, `{ text, className? }`)
* `loading` (bool, default `false`)
* `loadingElement` (element, default `null`)
* `formErrors` (object, default: `{}`)
* `form` (array)

#### `defaultInputClass`

`defaultInputClass` is appended to `classPrefix` on inputs.

```js
// With default value
'rdf-input'
```

#### `defaultLabelClass`

`defaultLabelClass` is appended to `classPrefix` on labels.

```js
// With default value
'rdf-label'
```

#### `defaultContainerClass`

`defaultContainerClass` is appended to `classPrefix` on input containers.

```js
// With default value
'rdf-container'
```

#### `defaultValidationErrorClass`

`defaultValidationErrorClass` is appended to `classPrefix` on error texts.

```js
// With default value
'rdf-error-label'
```

#### `defaultSubmitClass`

`defaultSubmitClass` is appended to `classPrefix` on the managed submit button.

```js
// With default value
'rdf-submit'
```

#### `defaultValues`

`defaultValues` is used to pre-populate the inputs. It matches the property name against an input name.

```js
// With default value
{}

// With custom value
{
    first_name: 'John',
    last_name: 'Doe',
}
```

#### `classPrefix`

`classPrefix` is used to prefix the majority of the class names.

```js
// With default value
'rdf'
```

#### `invalidInputClass`

`invalidInputClass` is appended to `classPrefix` on invalid inputs.

```js
// With default value
'rdf-invalid'
```

#### `validInputClass`

`validInputClass` is appended to `classPrefix` on valid inputs.

```js
// With default value
'rdf-valid'
```

#### `submitButton`

`submitButton` can be used to pass a managed submit button into the form.
`className` is optional and gets appended to `classPrefix`.

```js
// With custom value
{
    text: 'Sign up'
    // className: 'secondary-button'
    // > 'rdf-secondary-button'
}
```

#### `loading`

`loading` is used to trigger a loading state on the form which is used to show the loading state
on the managed submit button when a `loadingElement` has been passed.

```js
// With default value
false
```

#### `loadingElement`

`loadingElement` is shown when `loading` is `true` and a `submitButton` has been passed.

```jsx
// With default value
null

// With custom value
<p>Loading...</p>
```

#### `formErrors`

`formErrors` is used to display extra errors that cannot be managed internally by the form builder.

```js
// With default value
{}

// With custom value
{
    first_name: '\'John\' is an invalid first name',
}
```

#### `form`

`form` is used to pass the schema used to build the form. This will be explained in more detail [here](#schema).

```js
// With custom value
[
    {
        name: 'first_name',
    },
]
```

<hr />
<br />

### Schema

A form schema can be passed into the `form` prop. This is used to build the form and display the inputs correctly. The schema consists of an array and child elements. A child can be an `array` or `object`. If an `array` is found then any `objects` inside will be put on the same row as each other (or wrapped in the same parent container).

Each `object` child needs at least a `name`, but can also become more complex and custom:

* `name` (string)
* `placeholder` (string)
* `label` (string, function, string{})
* `type` (string, default `string`)
* `render` (function/node)
* `options` (object[])
* `radioContainerClass` (string)
* `containerClass` (string)
* `inputClass` (string)
* `defaultValue` (mixed)
* `defaultOptionText` (string)
* `validationRules` (string, string[], object, object[], RegExp, RegExp[], function, function[])
* `transformer` (function{})
* `filter` (string)


#### `name`

`name` is used for when data is submitted and passed back to the `onSubmit` callback.

```js
// With custom value
{
    name: 'first_name',
}
```

#### `placeholder`

`placeholder` is used to add placeholder text on empty text inputs.

```js
// With custom value
{
    name: 'first_name',
    placeholder: 'Enter a first name',
}
```

#### `label`

`label` is used to add a label above the input.
If an object is passed then at least `text` is required. `className` is optional.

```js
// With custom value
{
    name: 'fist_name',
    label: 'First Name',
}

{
    name: 'first_name',
    label: {
        text: 'First Name',
        className: 'first-name-label'
    }
}

{
    name: 'first_name',
    label: props => (
        <label {...props}>
            First Name
        </label>
    )
}
```

#### `type`

`type` is used to change what type of input is rendered. Valid types input:

* text
* custom
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

```js
// With default value
{
    name: 'first_name',
    type: 'string',
}
```

If `custom` is passed then it is recommended that `render` is also set.

#### `render`

`render` is used when a normal input is not enough. This can be used to completely customize an input.

When using a function it recieves the following parameters:

* `input` (current input object)
* `value` (current input value)
* `onChange` (onChange handler)
* `onBlur` (onBlur handler)
* `errors` (current input errors)
* `state` (form state)

When using a node it recieves the following props:

* `name` (current input name)
* `placeholder` (current input placeholder)
* `onChange` (onChange handler)
* `onBlur` (onBlur handler)
* `invalid` (invalid boolean)

```js
// With custom value
{
    name: 'first_name',
    render: () => (
        <h1>Custom Render</h1>
    ),
}

{
    name: 'first_name',
    render: <h1>Custom Render</h1>,
}
```

It works great with community addons, such as `form-select`.

```jsx
// With form select
{
    name: 'custom',
    label: 'custom',
    render: (
        <Select
            options={[
                { label: 'a', value: 'a' },
                { label: 'b', value: 'b' },
            ]}
        />
    ),
}

{
    name: 'custom',
    label: 'custom',
    render: ({ name, placeholder }, value, onChange) => (
        <Select
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            options={[
                { label: 'a', value: 'a' },
                { label: 'b', value: 'b' },
            ]}
        />
    ),
}
```

#### `options`

`options` are used for `type`s `select` or `radio`.
It should be an array of objects containing: `text` and `value`.

```js
{
    name: 'gender',
    type: 'select',
    options: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
        { text: 'Other', value: 'other' },
    ],
}
```

#### `radioContainerClass`

`radioContainerClass` is appended to `classPrefix` on the container when `type` is `radio`.

```js
// With default value
'rdf-'
```

#### `conatinerClass`

`containerClass` is appended to `classPrefix` on the container when `type` is not `radio`.

```js
// With default value
'rdf-container'
```

#### `inputClass`

`inputClass` is appended to `classPrefix` on the input.

```js
// With default value
'rdf-input'
```

#### `defaultValue`

`defaultValue` is inserted as the default value when the input has text, if `type` is `checkbox` then a truthy/falsey should be passed.

```js
// With custom value
{
    name: 'first_name',
    defaultValue: 'John',
}
```

#### `defaultOptionText`

`defaultOptionText` is used to select a _placeholder option_ for when `type` is `select`.

```js
// With custom value
{
    name: 'gender',
    defaultOptionText: 'Select a gender...',
}
```

#### `validationRules`

`validationRules` is used when wanting to validate the content of the input. Valid validation rules:

* `required` (not empty)
* `email` (valid email)
* `decimal` (numeric with optional decimal points)

```js
// With custom value
{
    name: 'first_name',
    validationRules: 'required',
}

{
    name: 'age',
    validationRule: /^\d+$/,
}

{
    name: 'age',
    validationRule: '/^\d+$/',
}

{
    name: 'color',
    validationRule: this.isValidColor
}

{
    name: 'email_address',
    validationRules: [
        'required', 'email',
    ],
}
```

_Note: Validation rule types can also be mixed._

#### `transformer`

`tranformer` is used to tranform the data before it gets validated/stored.
It should be an object with the keys which define functions:

* `onChange`
* `onBlur`

```js
// With custom value
{
    name: 'first_name',
    transformer: {
        onChange: this.uppercaseWords
    }
}
```

<hr />
<br />

## Addons

A list of community addons, designed to work flawlessly with `form-builder`.

* [`react-dynamic-form-select`][form-select]
* [`react-dynamic-form-date-picker`][form-date-picker]

### Make your own

Check out [`schema.render`](#render) on how to format your component to work well with `form-builder`. When creating your component be mindful of what props are passed.

When using a function it recieves the following parameters:

* `input` (current input object)
* `value` (current input value)
* `onChange` (onChange handler)
* `onBlur` (onBlur handler)
* `errors` (current input errors)
* `state` (form state)

When using a node it recieves the following props:

* `name` (current input name)
* `placeholder` (current input placeholder)
* `onChange` (onChange handler)
* `onBlur` (onBlur handler)
* `invalid` (invalid boolean)

<hr />
<br />
<br />
<br />

#### Similar Packages

* [`react-dynamic-data-table`][data-table]

[demo]: https://langleyfoxall.github.io/react-dynamic-form-builder/demo/
[npm]: https://npmjs.com
[yarn]: https://yarnpkg.com
[data-table]: https://github.com/langleyfoxall/react-dynamic-data-table
[form-select]: https://github.com/ninetynine/react-dynamic-form-select
[form-date-picker]: https://github.com/ninetynine/react-dynamic-form-date-picker