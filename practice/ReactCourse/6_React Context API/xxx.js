import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function App() {
  const [count /*值*/, setCount /*更新函数*/] = useState(0);
  const add = () => {
    setCount(count + 1);
  };
  const minus = () => {
    //箭头函数，使处在执行环境中
    setCount(count - 1);
  };

  //userState()函数可用多次
  const [user, setUser] = useState({
    name: "frank",
    age: 18,
    hobbies: ["lol", "dog", "code"]
  });
  const old = () => {
    setUser({
      ...user, //...扩展运算符，把user中之前的所有状态数据拿过来，否则更新会把 新age 之外的数据弄没
      age: user.age + 1
    });
  };
  const addHobby = () => {
    let newHobby = Math.random(); //增加随机数
    setUser({
      ...user,
      hobbies: [...user.hobbies, newHobby]
    });
  };

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={add}>+1</button>
        <button onClick={minus}>-1</button>
      </div>

      <div>
        {user.name}, {user.age} <br />
        {user.hobbies.join(",")}
      </div>
      <div>
        <button onClick={old}>+1</button>
        <button onClick={addHobby}>增加爱好</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);







