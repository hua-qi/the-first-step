import { Component } from "react";

// Person
class Person extends Component {
  constructor(props) {
    super(props);
    console.log("Hello, this is a preson");
  }
  componentDidMount() {
    console.log("Person did mount");
  }
  eat() {
    // 吃饭
  }
  sleep() {
    // 睡觉
  }
  render() {
    return <div>hello everyone, this is a person</div>;
  }
}

// Programmer
class Programmer extends Person {
  constructor(props) {
    super(props);
    console.log("hello, this is also a programmer");
  }
  componentDidMount() {
    console.log(this);
  }
  code() {
    // 敲代码
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        {super.render()}
        this alson a programmer
      </div>
    );
  }
}

export default Programmer;
