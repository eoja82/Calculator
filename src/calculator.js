// to edit, paste in terminal for babel: npx babel --watch src --out-dir . --presets react-app/prod 
const originalState = {inputValue: "0", memory: ["0"], lastButtonEqual: false};

class Presentational extends React.Component {
  constructor(props) {
      super(props);
      this.state = originalState;
      this.digitClick = this.digitClick.bind(this);
      this.acClick = this.acClick.bind(this);
      this.dotClick = this.dotClick.bind(this);
      this.operatorClick = this.operatorClick.bind(this);
      this.equalClick = this.equalClick.bind(this);
      this.zeroClick = this.zeroClick.bind(this);
  }
  digitClick(event) {
    const inputRegEx = /[0-9]|\./;
    const inputRegEx2 = /\/|\*|\-|\+/;
    const x = this.state.inputValue[this.state.inputValue.length - 1];  
    if (this.state.lastButtonEqual) {
      this.setState({inputValue: event.target.value, memory: [event.target.value], lastButtonEqual: false});
    } else {
      if (this.state.inputValue[0] === "0" && this.state.inputValue.length === 1) { 
        if (this.state.memory.length === 1) {
          this.setState({inputValue: event.target.value, memory: [event.target.value]});
        } else {
          this.setState({memory: this.state.memory.pop()});
          this.setState({inputValue: event.target.value, memory: this.state.memory.concat(event.target.value)});
        }
      } else if (inputRegEx.test(x)) {
        this.setState({inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value)});
      } else if (inputRegEx2.test(x)) {
        this.setState({inputValue: event.target.value, memory: this.state.memory.concat(event.target.value)});
      }
    }
  }
  zeroClick(event) {
    const zeroRegEx1 = /[1-9]|\./;
    const zeroRegEx2 = /\/|\*|\-|\+/;
    const x = this.state.inputValue[this.state.inputValue.length - 1];
    if (this.state.lastButtonEqual) {
      this.setState(originalState);
    } else {
      if (this.state.inputValue[0] === "0" && 
          this.state.inputValue.length === 1 && 
          event.target.value === "0") {
        return;
      } else if (zeroRegEx1.test(x)) {
        this.setState({inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value)});
      } else if (zeroRegEx2.test(x)) {
        this.setState({inputValue: event.target.value, memory: this.state.memory.concat(event.target.value)});
      } else {
        this.setState({inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value)});
      }
    }
  }  
  acClick() {
    this.setState(originalState);
  }  
  dotClick(event) {
    const operatorRegEx = /\/|\*|\-|\+/;
    const x = this.state.inputValue[this.state.inputValue.length - 1];
    if (this.state.lastButtonEqual) {
      this.setState({inputValue: "0.", memory: ["0", "."], lastButtonEqual: false});
    } else {
      if (this.state.inputValue.indexOf(event.target.value) === -1) {
        if (operatorRegEx.test(x)) {
          this.setState({inputValue: this.state.inputValue.concat(`0${event.target.value}`), memory: this.state.memory.concat(["0", event.target.value])});
        } else {
          this.setState({inputValue: this.state.inputValue.concat(event.target.value), memory: this.state.memory.concat(event.target.value)});
        }
      }
    }
  }
  operatorClick(event) {
    const regEx = /\/|\*|\-|\+/i;
    const memoryLen = this.state.memory.length;
    const lastInput = this.state.memory[memoryLen - 1];
    const operator = event.target.value;
    this.setState({lastButtonEqual: false});
    if (this.state.memory[memoryLen - 1] === ".") {
      this.setState({memory: this.state.memory.pop()});
    }
    if (this.state.inputValue === "0" && memoryLen === 1 && operator === "-") {
      // for if first button pushed is the minus opperator
      this.setState({inputValue: "-", memory: ["-"]});
    } else if (regEx.test(this.state.memory) && memoryLen === 2 && 
                          this.state.memory[0] === 0 && operator === "-") {
      // this is for if /, *, or + is the first button pushed
      this.setState({inputValue: "-", memory: ["-"]});
    } else if (regEx.test(lastInput)) { 
      if (memoryLen === 1) {
        // if minus was first button pushed
        this.setState({inputValue: operator, memory: ["0"].concat(operator)});
        } else {
          this.state.memory.pop();
          this.setState({inputValue: operator, memory: this.state.memory.concat(operator)});
        }
    } else {
      this.setState({inputValue: operator, memory: this.state.memory.concat(operator)});
    }
  }
  equalClick() {
    const regEx = /\/|\*|\-|\+/i;
    const memoryLen = this.state.memory.length;
    const x = this.state.memory[memoryLen - 1];
    this.setState({lastButtonEqual: true});
    if (regEx.test(x)) {
      if (memoryLen === 1) {
        this.setState(originalState);
        return;
      } else {
        this.setState({memory: this.state.memory.pop()});
      }
    }
    const value = eval(this.state.memory.join(""));
    //convert value (a number) to a string and an array for state
    let inputValueResult = value.toString();
    let memoryResult = Array.from(inputValueResult);
    this.setState({inputValue: inputValueResult, memory: memoryResult});
  }
  render() {
    return (
      <div className="calculator container-fluid">
        <p className="text-center">Calculator</p>
        <div className="form-group">
          <h2 id="memory" className="form-control text-right">{this.state.memory}</h2>
          <h2 id="display" className="form-control text-right">
            {this.state.inputValue}
          </h2>
        </div>
        <div className="buttondiv">
          <div className="row">
            <div className="col-xs-3">
              <button id="clear" onClick={this.acClick} className="btn btn-block btn-danger btn-lg">AC</button>
            </div>
            <div className="col-xs-6">
              <button id="blank" class="btn btn-block btn-secondary btn-lg" disabled></button>
            </div>
            <div className="col-xs-3">
              <button id="divide" value="/" onClick={this.operatorClick} className="btn btn-block btn-info btn-lg">÷</button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <button id="seven" value="7" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">7</button>
            </div>
            <div className="col-xs-3">
              <button id="eight" value="8" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">8</button>
            </div>
            <div className="col-xs-3">
              <button id="nine" value="9" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">9</button>
            </div>
            <div className="col-xs-3">
              <button id="multiply" value="*" onClick={this.operatorClick} className="btn btn-block btn-info btn-lg">x</button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <button id="four" value="4" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">4</button>
            </div>
            <div className="col-xs-3">
              <button id="five" value="5" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">5</button>
            </div>
            <div className="col-xs-3">
              <button id="six" value="6" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">6</button>
            </div>
            <div className="col-xs-3">
              <button id="subtract" value="-" onClick={this.operatorClick} className="btn btn-block btn-info btn-lg">-</button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <button id="one" value="1" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">1</button>
            </div>
            <div className="col-xs-3">
              <button id="two" value="2" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">2</button>
            </div>
            <div className="col-xs-3">
              <button id="three" value="3" onClick={this.digitClick} className="btn btn-block btn-secondary btn-lg">3</button>
            </div>
            <div className="col-xs-3">
              <button id="add" value="+" onClick={this.operatorClick} className="btn btn-block btn-info btn-lg">+</button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <button id="zero" value="0" onClick={this.zeroClick} className="btn btn-block btn-secondary btn-lg">0</button>
            </div>
            <div className="col-xs-3">
              <button id="decimal" value="." onClick={this.dotClick} className="btn btn-block btn-secondary btn-lg">.</button>
            </div>
            <div className="col-xs-3">
              <button id="equals" value="=" onClick={this.equalClick} className="btn btn-block btn-success btn-lg">=</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
ReactDOM.render(<Presentational />, document.getElementById("app"));