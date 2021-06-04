var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// to edit, paste in terminal for babel: npx babel --watch src --out-dir . --presets react-app/prod 
var originalState = { inputValue: "0", memory: ["0"], lastButtonEqual: false };

var Presentational = function (_React$Component) {
  _inherits(Presentational, _React$Component);

  function Presentational(props) {
    _classCallCheck(this, Presentational);

    var _this = _possibleConstructorReturn(this, (Presentational.__proto__ || Object.getPrototypeOf(Presentational)).call(this, props));

    _this.state = originalState;
    _this.digitClick = _this.digitClick.bind(_this);
    _this.acClick = _this.acClick.bind(_this);
    _this.dotClick = _this.dotClick.bind(_this);
    _this.operatorClick = _this.operatorClick.bind(_this);
    _this.equalClick = _this.equalClick.bind(_this);
    _this.zeroClick = _this.zeroClick.bind(_this);
    return _this;
  }

  _createClass(Presentational, [{
    key: "digitClick",
    value: function digitClick(event) {
      var inputRegEx = /[0-9]|\./;
      var inputRegEx2 = /\/|\*|\-|\+/;
      var x = this.state.inputValue[this.state.inputValue.length - 1];
      if (this.state.lastButtonEqual) {
        this.setState({ inputValue: event.target.value, memory: [event.target.value], lastButtonEqual: false });
      } else {
        if (this.state.inputValue[0] === "0" && this.state.inputValue.length === 1) {
          if (this.state.memory.length === 1) {
            this.setState({ inputValue: event.target.value, memory: [event.target.value] });
          } else {
            this.setState({ memory: this.state.memory.pop() });
            this.setState({ inputValue: event.target.value, memory: this.state.memory.concat(event.target.value) });
          }
        } else if (inputRegEx.test(x)) {
          this.setState({ inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value) });
        } else if (inputRegEx2.test(x)) {
          this.setState({ inputValue: event.target.value, memory: this.state.memory.concat(event.target.value) });
        }
      }
    }
  }, {
    key: "zeroClick",
    value: function zeroClick(event) {
      var zeroRegEx1 = /[1-9]|\./;
      var zeroRegEx2 = /\/|\*|\-|\+/;
      var x = this.state.inputValue[this.state.inputValue.length - 1];
      if (this.state.lastButtonEqual) {
        this.setState(originalState);
      } else {
        if (this.state.inputValue[0] === "0" && this.state.inputValue.length === 1 && event.target.value === "0") {
          return;
        } else if (zeroRegEx1.test(x)) {
          this.setState({ inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value) });
        } else if (zeroRegEx2.test(x)) {
          this.setState({ inputValue: event.target.value, memory: this.state.memory.concat(event.target.value) });
        } else {
          this.setState({ inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value) });
        }
      }
    }
  }, {
    key: "acClick",
    value: function acClick() {
      this.setState(originalState);
    }
  }, {
    key: "dotClick",
    value: function dotClick(event) {
      var operatorRegEx = /\/|\*|\-|\+/;
      var x = this.state.inputValue[this.state.inputValue.length - 1];
      if (this.state.lastButtonEqual) {
        this.setState({ inputValue: "0.", memory: ["0", "."], lastButtonEqual: false });
      } else {
        if (this.state.inputValue.indexOf(event.target.value) === -1) {
          if (operatorRegEx.test(x)) {
            this.setState({ inputValue: this.state.inputValue.concat("0" + event.target.value), memory: this.state.memory.concat(["0", event.target.value]) });
          } else {
            this.setState({ inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value) });
          }
        }
      }
    }
  }, {
    key: "operatorClick",
    value: function operatorClick(event) {
      var regEx = /\/|\*|\-|\+/i;
      var lastInput = this.state.memory[this.state.memory.length - 1];
      var operator = event.target.value;
      var memoryLen = this.state.memory.length;
      this.setState({ lastButtonEqual: false });
      if (this.state.memory[memoryLen - 1] === ".") {
        this.setState({ memory: this.state.memory.pop() });
      }
      if (this.state.inputValue === "0" && memoryLen === 1 && operator === "-") {
        // for if first button pushed is the minus opperator
        this.setState({ inputValue: "-", memory: ["-"] });
      } else if (regEx.test(this.state.memory) && memoryLen === 2 && this.state.memory[0] === 0 && operator === "-") {
        // this is for if /, *, or + is the first button pushed
        this.setState({ inputValue: "-", memory: ["-"] });
      } else if (regEx.test(lastInput)) {
        if (memoryLen === 1) {
          // if minus was first button pushed
          this.setState({ inputValue: operator, memory: ["0"].concat(operator) });
        } else {
          this.state.memory.pop();
          this.setState({ inputValue: operator, memory: this.state.memory.concat(operator) });
        }
      } else {
        this.setState({ inputValue: operator, memory: this.state.memory.concat(operator) });
      }
    }
  }, {
    key: "equalClick",
    value: function equalClick() {
      /* *************** fix first click is minus, second click equal causes error ********************** */
      var regEx = /\/|\*|\-|\+/i;
      var x = this.state.memory[this.state.memory.length - 1];
      this.setState({ lastButtonEqual: true });
      if (regEx.test(x)) {
        this.setState({ memory: this.state.memory.pop() });
      }
      var value = eval(this.state.memory.join(""));
      //convert value (a number) to a string and an array for state
      var inputValueResult = value.toString();
      var memoryResult = Array.from(inputValueResult);
      this.setState({ inputValue: inputValueResult, memory: memoryResult });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "calculator container-fluid" },
        React.createElement(
          "p",
          { className: "text-center" },
          "Calculator"
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "h2",
            { id: "memory", className: "form-control text-right" },
            this.state.memory
          ),
          React.createElement(
            "h2",
            { id: "display", className: "form-control text-right" },
            this.state.inputValue
          )
        ),
        React.createElement(
          "div",
          { className: "buttondiv" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "clear", onClick: this.acClick, className: "btn btn-block btn-danger btn-lg" },
                "AC"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement("button", { id: "blank", "class": "btn btn-block btn-secondary btn-lg", disabled: true })
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "divide", value: "/", onClick: this.operatorClick, className: "btn btn-block btn-info btn-lg" },
                "\xF7"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "seven", value: "7", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "7"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "eight", value: "8", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "8"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "nine", value: "9", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "9"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "multiply", value: "*", onClick: this.operatorClick, className: "btn btn-block btn-info btn-lg" },
                "x"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "four", value: "4", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "4"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "five", value: "5", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "5"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "six", value: "6", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "6"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "subtract", value: "-", onClick: this.operatorClick, className: "btn btn-block btn-info btn-lg" },
                "-"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "one", value: "1", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "1"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "two", value: "2", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "2"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "three", value: "3", onClick: this.digitClick, className: "btn btn-block btn-secondary btn-lg" },
                "3"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "add", value: "+", onClick: this.operatorClick, className: "btn btn-block btn-info btn-lg" },
                "+"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "button",
                { id: "zero", value: "0", onClick: this.zeroClick, className: "btn btn-block btn-secondary btn-lg" },
                "0"
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "decimal", value: ".", onClick: this.dotClick, className: "btn btn-block btn-secondary btn-lg" },
                "."
              )
            ),
            React.createElement(
              "div",
              { className: "col-xs-3" },
              React.createElement(
                "button",
                { id: "equals", value: "=", onClick: this.equalClick, className: "btn btn-block btn-success btn-lg" },
                "="
              )
            )
          )
        )
      );
    }
  }]);

  return Presentational;
}(React.Component);

;
ReactDOM.render(React.createElement(Presentational, null), document.getElementById("app"));