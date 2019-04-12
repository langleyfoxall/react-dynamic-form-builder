"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _flatten = _interopRequireDefault(require("core-js/fn/array/flatten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DynamicFormBuilder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DynamicFormBuilder, _React$Component);

  function DynamicFormBuilder(props) {
    var _this;

    _classCallCheck(this, DynamicFormBuilder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicFormBuilder).call(this, props));
    _this.state = {
      form: _objectSpread({}, props.defaultValues),
      inputs: _objectSpread({}, props.inputs),
      canRender: [],
      validationErrors: {},
      randomisedFields: {}
    };
    _this.filterRules = {
      numeric: function numeric(value) {
        return /^$|^[0-9]+$/.test(value);
      },
      decimal: function decimal(value) {
        return /^$|^[\d.]+$/.test(value);
      }
    };
    _this.transformerRules = {
      uppercase: function uppercase(value) {
        return value.toUpperCase();
      },
      lowercase: function lowercase(value) {
        return value.toLowerCase();
      }
    };
    _this.validationRules = {
      required: function required(value) {
        if (_typeof(value) === 'object') {
          value = Object.keys(value);
        }

        if (typeof value === 'string' || Array.isArray(value)) {
          return !!value.length;
        }

        return value !== null && value !== undefined;
      },
      email: function email(value) {
        return !value || /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
      },
      decimal: function decimal(value) {
        return !value || /^$|^\d+$|^\.\d+|^\d+\.\d+$/.test(value);
      }
    };
    _this.validateForm = _this.validateForm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.submitForm = _this.submitForm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.propagateChange = _this.propagateChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DynamicFormBuilder, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var ppValues = prevProps.values;
      var pValues = this.props.values;

      if (pValues) {
        if (JSON.stringify(pValues) !== JSON.stringify(ppValues)) {
          var form = _objectSpread({}, ppValues, pValues);

          this.propagateChange(form);
        }
      }

      return null;
    }
  }, {
    key: "applyFilter",
    value: function applyFilter(event, filter) {
      switch (filter.constructor) {
        case RegExp:
          return filter.test(event.target.value);

        case Function:
          return filter(event);

        case String:
          //Might be regex if it has been stored as JSON
          if (filter[0] === '/' && filter[filter.length - 1] === '/') {
            var regex = new RegExp(filter.substring(1, filter.length - 1));
            return regex.test(event.target.value);
          }

          try {
            return this.filterRules[filter](event.target.value);
          } catch (e) {
            console.error("Invalid filter rule ".concat(filter, " used on input ").concat(event.target.name));
            return true;
          }

        default:
          console.error("Invalid filter type of ".concat(filter.constructor, " on input ").concat(event.target.name));
          return true;
      }
    }
  }, {
    key: "applyTransformer",
    value: function applyTransformer(event, transformer) {
      switch (transformer.constructor) {
        case Function:
          return transformer(event);

        case String:
          return this.transformerRules[transformer](event.target.value);

        default:
          console.error("Invalid transformer type of ".concat(transformer.constructor, " on input ").concat(event.target.name));
          return event.target.value;
      }
    }
  }, {
    key: "validateInput",
    value: function validateInput(name, value, rules) {
      var _this2 = this;

      var valid = true;
      var errorMessage = null;

      if (!Array.isArray(rules)) {
        rules = [rules];
      }

      rules.forEach(function (rule) {
        var ruleMessage = null;

        if (rule.constructor === Object) {
          ruleMessage = rule.message;
          rule = rule.rule;
        }

        switch (rule.constructor) {
          case Function:
            if (!rule(name, value)) {
              errorMessage = ruleMessage;
              valid = false;
            }

            break;

          case RegExp:
            if (!rule.test(value)) {
              errorMessage = ruleMessage;
              valid = false;
            }

            break;

          case String:
            //Might be regex if it has been stored as JSON
            if (rule[0] === '/' && rule[rule.length - 1] === '/') {
              var regex = new RegExp(rule.substring(1, rule.length - 1));

              if (!regex.test(value)) {
                errorMessage = ruleMessage;
                valid = false;
                break;
              }
            }

            try {
              if (!_this2.validationRules[rule](value)) {
                errorMessage = ruleMessage;
                valid = false;
              }
            } catch (e) {
              console.error("Invalid filter rule ".concat(rule, " used on input ").concat(name));
            }

            break;

          default:
            console.error("Invalid validation type of ".concat(rule.constructor, " on input ").concat(name));
        }
      });

      var validationError = _defineProperty({}, name, valid ? false : errorMessage || true);

      return [valid, validationError];
    }
  }, {
    key: "applyValidation",
    value: function applyValidation(event, validation) {
      var onlyValid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var validationErrors = this.state.validationErrors;

      var _this$validateInput = this.validateInput(event.target.name, event.target.value, validation),
          _this$validateInput2 = _slicedToArray(_this$validateInput, 2),
          valid = _this$validateInput2[0],
          validationError = _this$validateInput2[1];

      validationErrors = _objectSpread({}, validationError);

      if (onlyValid && valid || !onlyValid) {
        this.setState({
          validationErrors: validationErrors
        });
      }

      return validationErrors;
    }
  }, {
    key: "propagateChange",
    value: function propagateChange(form, validationErrors) {
      var _this3 = this;

      var onChange = this.props.onChange;

      var callback = function callback() {
        var _this3$validateForm = _this3.validateForm(false),
            _this3$validateForm2 = _slicedToArray(_this3$validateForm, 2),
            valid = _this3$validateForm2[0],
            errors = _this3$validateForm2[1];

        validationErrors = errors || validationErrors;
        onChange({
          valid: valid,
          data: {
            form: form,
            validationErrors: validationErrors
          }
        });
      };

      this.setState({
        form: _objectSpread({}, form)
      }, callback);
    }
  }, {
    key: "handleInput",
    value: function handleInput(input, event) {
      var _this4 = this;

      event.persist();
      clearTimeout(this.timer);
      var validationErrors = {};

      if (input.filter && !this.applyFilter(event, input.filter)) {
        return;
      }

      var value = event.target.value;

      if (input.type === 'checkbox') {
        value = event.target.checked;
      }

      if (input.transformer && input.transformer.onChange) {
        value = this.applyTransformer(event, input.transformer.onChange);
      }

      if (input.validationRules) {
        var validationTimeout = this.props.validationTimeout; // The third parameter, true, means that the input will not show as invalid
        // while the user is typing

        validationErrors = this.applyValidation(event, input.validationRules, true);
        this.timer = setTimeout(function () {
          return _this4.applyValidation(event, input.validationRules);
        }, validationTimeout);
      }

      var form = this.state.form;
      form[input.name] = value && _typeof(value) === 'object' && !Array.isArray(value) ? value.value : value;
      this.propagateChange(form, validationErrors);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(input, event) {
      clearTimeout(this.timer);
      var form = this.state.form;
      var value = event.target.value;
      var validationErrors = {};

      if (input.transformer && input.transformer.onBlur) {
        value = this.applyTransformer(event, input.transformer.onBlur);
      }

      if (input.validationRules) {
        validationErrors = this.applyValidation(event, input.validationRules);
      }

      if (form[input.name] !== value) {
        form[input.name] = value;
        this.propagateChange(form, validationErrors);
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var _this5 = this;

      var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var form = this.props.form;
      var invalid = false;
      var _this$state = this.state,
          validationErrors = _this$state.validationErrors,
          stateForm = _this$state.form;
      (0, _flatten.default)(form).forEach(function (input) {
        if (!input.validationRules) {
          return;
        }

        var _this5$validateInput = _this5.validateInput(input.name, stateForm[input.name], input.validationRules),
            _this5$validateInput2 = _slicedToArray(_this5$validateInput, 2),
            valid = _this5$validateInput2[0],
            validationError = _this5$validateInput2[1];

        validationErrors = _objectSpread({}, validationErrors, validationError);

        if (!valid) {
          invalid = true;
        }
      });

      if (display) {
        this.setState({
          validationErrors: validationErrors
        });
        return [!invalid, validationErrors];
      }

      return [!invalid, validationErrors];
    }
  }, {
    key: "getInputValidationError",
    value: function getInputValidationError(inputName) {
      var validationErrors = this.state.validationErrors;
      var formErrors = this.props.formErrors;
      var validationError = validationErrors[inputName];
      var propError = formErrors[inputName];
      return validationError && validationError !== true ? validationError : propError;
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var form = this.state.form;
      var onSubmit = this.props.onSubmit;

      if (onSubmit) {
        var _this$validateForm = this.validateForm(),
            _this$validateForm2 = _slicedToArray(_this$validateForm, 2),
            valid = _this$validateForm2[0],
            validationErrors = _this$validateForm2[1];

        onSubmit({
          valid: valid,
          data: {
            form: form,
            validationErrors: validationErrors
          }
        });
      }
    }
  }, {
    key: "renderCustomInput",
    value: function renderCustomInput(input) {
      var form = this.state.form;

      if (typeof input.render !== 'function') {
        if (!_react.default.isValidElement(input.render)) {
          return input.render;
        }

        return _react.default.cloneElement(input.render, {
          name: input.name,
          placeholder: input.placeholder,
          value: form[input.name] || '',
          onChange: this.handleBlur.bind(this, input),
          onBlur: this.handleBlur.bind(this, input),
          invalid: !!this.getInputValidationError(input.name) || undefined
        });
      }

      return input.render(input, form[input.name] || '', this.handleInput.bind(this, input), this.handleBlur.bind(this, input), this.getInputValidationError(input.name), this.state);
    }
  }, {
    key: "renderInput",
    value: function renderInput(input) {
      var _this6 = this;

      if (input.constructor === Array) {
        return this.renderInputs(input);
      }

      var _this$state2 = this.state,
          form = _this$state2.form,
          validationErrors = _this$state2.validationErrors,
          randomisedFields = _this$state2.randomisedFields;
      var _this$props = this.props,
          formErrors = _this$props.formErrors,
          classPrefix = _this$props.classPrefix,
          defaultInputClass = _this$props.defaultInputClass,
          invalidInputClass = _this$props.invalidInputClass,
          validInputClass = _this$props.validInputClass;

      if (input.render) {
        return this.renderCustomInput(input);
      }

      var props = _objectSpread({
        className: "".concat(classPrefix, "-").concat(input.inputClass || defaultInputClass || '', " ").concat(validationErrors[input.name] || formErrors[input.name] ? invalidInputClass : validationErrors[input.name] === false ? validInputClass : ''),
        name: randomisedFields[input.name] || input.name,
        value: form[input.name] || input.defaultValue || '',
        placeholder: input.placeholder,
        id: input.name,
        onChange: this.handleInput.bind(this, input),
        onBlur: this.handleBlur.bind(this, input)
      }, input.htmlProps);

      switch (input.type) {
        case "custom":
          return this.renderCustomInput(input);

        case "textarea":
          return _react.default.createElement("textarea", props);

        case "checkbox":
          return _react.default.createElement("input", _extends({}, props, {
            type: input.type,
            onBlur: undefined,
            defaultChecked: props.defaultValue,
            checked: props.value
          }));

        case "select":
          return _react.default.createElement("select", props, input.defaultOptionText && _react.default.createElement("option", {
            hidden: true,
            selected: true,
            value: true
          }, input.defaultOptionText), (input.options || []).map(function (option) {
            return _react.default.createElement("option", {
              value: option.value
            }, option.text);
          }));

        case "radio":
          return _react.default.createElement(_react.Fragment, null, input.options.map(function (option, i) {
            return _react.default.createElement("div", {
              key: i,
              className: "".concat(classPrefix, "-").concat(input.radioContainerClass || '')
            }, _react.default.createElement("input", {
              name: input.name,
              value: option.value,
              type: "radio",
              onChange: _this6.handleInput.bind(_this6, input)
            }), _react.default.createElement("label", null, option.text));
          }));

        default:
          return _react.default.createElement("input", _extends({
            type: input.type
          }, props));
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(input) {
      if (!input.label) {
        return;
      }

      var _this$props2 = this.props,
          classPrefix = _this$props2.classPrefix,
          defaultLabelClass = _this$props2.defaultLabelClass;
      var props = {
        className: classPrefix + '-' + (input.label.className || defaultLabelClass || ''),
        htmlFor: input.name
      };

      if (typeof input.label === 'function') {
        return input.label(props);
      }

      if (input.label) {
        return _react.default.createElement("label", props, input.label.text || input.label);
      }
    }
  }, {
    key: "renderValidationErrors",
    value: function renderValidationErrors(input) {
      var _this$props3 = this.props,
          classPrefix = _this$props3.classPrefix,
          defaultValidationErrorClass = _this$props3.defaultValidationErrorClass;
      var validationError = this.getInputValidationError(input.name);

      if (validationError) {
        return _react.default.createElement("p", {
          className: "".concat(classPrefix, "-").concat(defaultValidationErrorClass || '')
        }, validationError);
      }
    }
  }, {
    key: "renderSubmitButton",
    value: function renderSubmitButton() {
      var _this$props4 = this.props,
          submitButton = _this$props4.submitButton,
          classPrefix = _this$props4.classPrefix,
          defaultSubmitClass = _this$props4.defaultSubmitClass,
          loading = _this$props4.loading;

      if (submitButton) {
        return _react.default.createElement("button", {
          className: "".concat(classPrefix, "-").concat(submitButton.className || defaultSubmitClass || '', " ").concat(this.validateForm(false) ? '' : 'invalid', " ").concat(loading ? 'loading' : ''),
          onClick: this.submitForm
        }, this.renderSubmitButtonContents());
      }
    }
  }, {
    key: "renderSubmitButtonContents",
    value: function renderSubmitButtonContents() {
      var _this$props5 = this.props,
          submitButton = _this$props5.submitButton,
          loading = _this$props5.loading,
          loadingElement = _this$props5.loadingElement;

      if (loading && loadingElement) {
        return loadingElement;
      }

      return submitButton.text;
    }
  }, {
    key: "renderInputs",
    value: function renderInputs(inputs) {
      var _this7 = this;

      var canRender = this.state.canRender;
      var _this$props6 = this.props,
          classPrefix = _this$props6.classPrefix,
          defaultContainerClass = _this$props6.defaultContainerClass;
      inputs = inputs.filter(function (input) {
        return canRender.includes(input.name) || input.constructor === Array;
      });
      return _react.default.createElement(_react.Fragment, null, inputs.map(function (input, i) {
        var isArray = input.constructor === Array;
        var containerClass = isArray ? "".concat(classPrefix, "-row") : "".concat(classPrefix, "-").concat(input.containerClass || defaultContainerClass || '');
        return _react.default.createElement(_react.Fragment, {
          key: i
        }, _react.default.createElement("div", {
          className: containerClass
        }, !isArray && _this7.renderLabel(input), _this7.renderInput(input), !isArray && _this7.renderValidationErrors(input)));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      try {
        var inputs = this.state.inputs;
        return _react.default.createElement(_react.Fragment, null, this.renderInputs(inputs), this.renderSubmitButton());
      } catch (e) {
        console.error(e);
        return _react.default.createElement("p", null, "Error rendering form");
      }
    }
  }], [{
    key: "flatInputs",
    value: function flatInputs(entity) {
      return entity.flat();
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref, state) {
      var form = _ref.form;
      var values = state.form,
          errors = state.validationErrors,
          randomisedFields = state.randomisedFields;
      var inputs = DynamicFormBuilder.flatInputs(form);

      var newRandomisedFields = _objectSpread({}, randomisedFields);

      var newValues = _objectSpread({}, values);

      var newErrors = _objectSpread({}, errors);

      var canRender = [];
      inputs.forEach(function (_ref2) {
        var name = _ref2.name,
            renderIf = _ref2.renderIf,
            autocomplete = _ref2.autocomplete;

        if (typeof renderIf === 'function' && !renderIf(state)) {
          delete newValues[name];
          delete newErrors[name];
        } else {
          canRender.push(name);
        }

        if (autocomplete === false) {
          if (!newRandomisedFields[name]) {
            newRandomisedFields[name] = Math.random().toString(36).substring(7);
          }

          return;
        }

        delete newRandomisedFields[name];
      });
      return _objectSpread({}, state, {
        inputs: form,
        canRender: canRender,
        form: newValues,
        validationErrors: newErrors,
        randomisedFields: newRandomisedFields
      });
    }
  }]);

  return DynamicFormBuilder;
}(_react.default.Component);

DynamicFormBuilder.defaultProps = {
  defaultValues: {},
  values: null,
  classPrefix: 'rdf',
  defaultContainerClass: 'container',
  defaultInputClass: 'input',
  defaultValidationErrorClass: 'error-label',
  defaultLabelClass: 'label',
  form: [],
  defaultSubmitClass: 'submit',
  invalidInputClass: 'invalid',
  validInputClass: 'valid',
  loading: false,
  loadingElement: null,
  formErrors: {},
  validationTimeout: 1000,
  onChange: function onChange() {
    return null;
  }
};
DynamicFormBuilder.propTypes = {
  defaultValues: _propTypes.default.object,
  values: _propTypes.default.object,
  defaultInputClass: _propTypes.default.string,
  defaultLabelClass: _propTypes.default.string,
  defaultContainerClass: _propTypes.default.string,
  defaultValidationErrorClass: _propTypes.default.string,
  form: _propTypes.default.array.isRequired,
  submitButton: _propTypes.default.object,
  validationTimeout: _propTypes.default.number,
  classPrefix: _propTypes.default.string,
  loading: _propTypes.default.bool,
  defaultSubmitClass: _propTypes.default.string,
  invalidInputClass: _propTypes.default.string,
  validInputClass: _propTypes.default.string,
  loadingElement: _propTypes.default.element,
  formErrors: _propTypes.default.object,
  onChange: _propTypes.default.func
};
var _default = DynamicFormBuilder;
exports.default = _default;