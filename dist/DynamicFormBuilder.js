"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _flatten = _interopRequireDefault(require("core-js/fn/array/flatten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      validation_errors: {}
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
        if (value) {
          return true;
        } else {
          return false;
        }
      },
      email: function email(value) {
        return /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
      },
      decimal: function decimal(value) {
        return /^$|^\d+$|^\.\d+|^\d+\.\d+$/.test(value);
      }
    };
    _this.validateForm = _this.validateForm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.submitForm = _this.submitForm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.propagateChange = _this.propagateChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DynamicFormBuilder, [{
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
      var error_message = null;

      if (!Array.isArray(rules)) {
        rules = [rules];
      }

      rules.forEach(function (rule) {
        var rule_message = null;

        if (rule.constructor === Object) {
          rule_message = rule.message;
          rule = rule.rule;
        }

        switch (rule.constructor) {
          case Function:
            if (!rule(name, value)) {
              error_message = rule_message;
              valid = false;
            }

            break;

          case RegExp:
            if (!rule.test(value)) {
              error_message = rule_message;
              valid = false;
            }

            break;

          case String:
            //Might be regex if it has been stored as JSON
            if (rule[0] === '/' && rule[rule.length - 1] === '/') {
              var regex = new RegExp(rule.substring(1, rule.length - 1));

              if (!regex.test(value)) {
                error_message = rule_message;
                valid = false;
                break;
              }
            }

            try {
              if (!_this2.validationRules[rule](value)) {
                error_message = rule_message;
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

      var validation_error = _defineProperty({}, name, valid ? false : error_message || true);

      return [valid, validation_error];
    }
  }, {
    key: "applyValidation",
    value: function applyValidation(event, validation) {
      var only_display_if_valid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var validation_errors;

      var _this$validateInput = this.validateInput(event.target.name, event.target.value, validation),
          _this$validateInput2 = _slicedToArray(_this$validateInput, 2),
          valid = _this$validateInput2[0],
          validation_error = _this$validateInput2[1];

      validation_errors = _objectSpread({}, this.state.validation_errors, validation_error);

      if (only_display_if_valid && valid || !only_display_if_valid) {
        this.setState({
          validation_errors: validation_errors
        });
      }

      return validation_errors;
    }
  }, {
    key: "propagateChange",
    value: function propagateChange(form, validation_errors) {
      this.setState({
        form: form
      });

      if (this.props.onChange) {
        this.props.onChange({
          valid: this.validateForm(false),
          data: {
            form: form,
            validation_errors: validation_errors
          }
        });
      }
    }
  }, {
    key: "handleInput",
    value: function handleInput(input, event) {
      var _this3 = this;

      event.persist();
      clearTimeout(this.timer);
      var validation_errors = {};

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
        // The third parameter, true, means that the input will not show as invalid
        // while the user is typing
        validation_errors = this.applyValidation(event, input.validationRules, true);
        this.timer = setTimeout(function () {
          _this3.applyValidation(event, input.validationRules);
        }, this.props.validationTimeout);
      }

      var form = this.state.form;
      form[event.target.name] = value;
      this.propagateChange(form, validation_errors);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(input, event) {
      clearTimeout(this.timer);
      var value = event.target.value;
      var validation_errors = {};

      if (input.transformer && input.transformer.onBlur) {
        value = this.applyTransformer(event, input.transformer.onBlur);
      }

      if (input.validationRules) {
        validation_errors = this.applyValidation(event, input.validationRules);
      }

      if (this.state.form[event.target.name] !== value) {
        var form = this.state.form;
        form[event.target.name] = value;
        this.propagateChange(form, validation_errors);
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var _this4 = this;

      var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var invalid = false;
      var validation_errors = this.state.validation_errors;
      (0, _flatten.default)(this.props.form).forEach(function (input) {
        if (!input.validationRules) {
          return;
        }

        var _this4$validateInput = _this4.validateInput(input.name, _this4.state.form[input.name], input.validationRules),
            _this4$validateInput2 = _slicedToArray(_this4$validateInput, 2),
            valid = _this4$validateInput2[0],
            validation_error = _this4$validateInput2[1];

        validation_errors = _objectSpread({}, validation_errors, validation_error);

        if (!valid) {
          invalid = true;
        }
      });

      if (display) {
        this.setState({
          validation_errors: validation_errors
        });
        return [!invalid, validation_errors];
      }

      return !invalid;
    }
  }, {
    key: "getInputValidationError",
    value: function getInputValidationError(inputName) {
      var validationError = this.state.validation_errors[inputName];
      var propError = this.props.formErrors[inputName];
      return validationError && validationError !== true ? validationError : propError;
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      if (this.props.onSubmit) {
        var _this$validateForm = this.validateForm(),
            _this$validateForm2 = _slicedToArray(_this$validateForm, 2),
            valid = _this$validateForm2[0],
            validation_errors = _this$validateForm2[1];

        this.props.onSubmit({
          valid: valid,
          data: {
            form: this.state.form,
            validation_errors: validation_errors
          }
        });
      }
    }
  }, {
    key: "renderCustomInput",
    value: function renderCustomInput(input) {
      if (typeof input.render !== 'function') {
        if (!_react.default.isValidElement(input.render)) {
          return input.render;
        }

        return _react.default.cloneElement(input.render, {
          name: input.name,
          placeholder: input.placeholder,
          value: this.state.form[input.name] || '',
          onChange: this.handleBlur.bind(this, input),
          onBlur: this.handleBlur.bind(this, input),
          invalid: !!this.getInputValidationError(input.name) || undefined
        });
      }

      return input.render(input, this.state.form[input.name] || '', this.handleInput.bind(this, input), this.handleBlur.bind(this, input), this.getInputValidationError(input.name), this.state);
    }
  }, {
    key: "renderInput",
    value: function renderInput(input) {
      var _this5 = this;

      if (input.constructor === Array) {
        return this.renderInputs(input);
      }

      if (input.render) {
        return this.renderCustomInput(input);
      }

      var props = _objectSpread({
        className: "".concat(this.props.classPrefix, "-").concat(input.inputClass || this.props.defaultInputClass || '', " ").concat(this.state.validation_errors[input.name] || this.props.formErrors[input.name] ? this.props.invalidInputClass : this.state.validation_errors[input.name] === false ? this.props.validInputClass : ''),
        name: input.name,
        value: this.state.form[input.name] || input.defaultValue || '',
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
              className: "".concat(_this5.props.classPrefix, "-").concat(input.radioContainerClass || '')
            }, _react.default.createElement("input", {
              name: input.name,
              value: option.value,
              type: "radio",
              onChange: _this5.handleInput.bind(_this5, input)
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

      var props = {
        className: this.props.classPrefix + '-' + (input.label.className || this.props.defaultLabelClass || ''),
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
      var validationError = this.getInputValidationError(input.name);

      if (validationError) {
        return _react.default.createElement("p", {
          className: "".concat(this.props.classPrefix, "-").concat(this.props.defaultValidationErrorClass || '')
        }, validationError);
      }
    }
  }, {
    key: "renderSubmitButton",
    value: function renderSubmitButton() {
      if (this.props.submitButton) {
        return _react.default.createElement("button", {
          className: "".concat(this.props.classPrefix, "-").concat(this.props.submitButton.className || this.props.defaultSubmitClass || '', " ").concat(this.validateForm(false) ? '' : 'invalid', " ").concat(this.props.loading ? 'loading' : ''),
          onClick: this.submitForm
        }, this.renderSubmitButtonContents());
      }
    }
  }, {
    key: "renderSubmitButtonContents",
    value: function renderSubmitButtonContents() {
      if (this.props.loading && this.props.loadingElement) {
        return this.props.loadingElement;
      } else {
        return this.props.submitButton.text;
      }
    }
  }, {
    key: "renderInputs",
    value: function renderInputs(inputs) {
      var _this6 = this;

      return _react.default.createElement(_react.Fragment, null, inputs.map(function (input, i) {
        var containerClass = input.constructor === Array ? "".concat(_this6.props.classPrefix, "-row") : "".concat(_this6.props.classPrefix, "-").concat(input.containerClass || _this6.props.defaultContainerClass || '');
        return _react.default.createElement(_react.Fragment, {
          key: i
        }, _react.default.createElement("div", {
          className: containerClass
        }, _this6.renderLabel(input), _this6.renderInput(input), _this6.renderValidationErrors(input)));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      try {
        return _react.default.createElement(_react.Fragment, null, this.renderInputs(this.props.form), this.renderSubmitButton());
      } catch (e) {
        console.error(e);
        return _react.default.createElement("p", null, "Error rendering form");
      }
    }
  }]);

  return DynamicFormBuilder;
}(_react.default.Component);

var _default = DynamicFormBuilder;
exports.default = _default;
DynamicFormBuilder.defaultProps = {
  defaultValues: {},
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
  validationTimeout: 1000
};
DynamicFormBuilder.propTypes = {
  defaultInputClass: _propTypes.default.string,
  defaultLabelClass: _propTypes.default.string,
  defaultContainerClass: _propTypes.default.string,
  defaultValidationErrorClass: _propTypes.default.string,
  defaultValues: _propTypes.default.object,
  form: _propTypes.default.array.isRequired,
  submitButton: _propTypes.default.object,
  validationTimeout: _propTypes.default.number,
  classPrefix: _propTypes.default.string,
  loading: _propTypes.default.bool,
  defaultSubmitClass: _propTypes.default.string,
  invalidInputClass: _propTypes.default.string,
  validInputClass: _propTypes.default.string,
  loadingElement: _propTypes.default.element,
  formErrors: _propTypes.default.object
};