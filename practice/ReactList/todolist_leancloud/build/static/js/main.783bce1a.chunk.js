(this.webpackJsonptodolist_leancloud=this.webpackJsonptodolist_leancloud||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(23)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(8),o=n.n(i),r=(n(15),n(2)),l=n(3),c=n(5),u=n(4),d=n(6);n(16),n(17);function h(e,t){"Enter"===t.key&&""!==t.target.value.trim()&&e.onSubmit(t)}function m(e,t){e.onChange(t)}var p=function(e){return s.a.createElement("input",{type:"text",value:e.content,className:"TodoInput",onChange:m.bind(null,e),onKeyPress:h.bind(null,e)})},f=(n(18),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"TodoItem"},s.a.createElement("input",{type:"checkbox",checked:"completed"===this.props.todo.status,onChange:this.toggle.bind(this)}),s.a.createElement("span",{className:"title"},this.props.todo.title),s.a.createElement("button",{onClick:this.delete.bind(this)},"Delete"))}},{key:"toggle",value:function(e){this.props.onToggle(e,this.props.todo)}},{key:"delete",value:function(e){this.props.onDelete(e,this.props.todo)}}]),t}(a.Component)),g=(n(19),n(20),n(21),n(9)),v=n(1),b=n.n(v);function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach((function(t){Object(g.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}b.a.init({appId:"v14NvWPzvoqzf1OAVFrlamua-gzGzoHsz",appKey:"4kTB4FACraYqwnn9IWrmlmHV",serverURLs:"https://v14nvwpz.lc-cn-n1-shared.com"});b.a;var w={getByUser:function(e,t,n){var a=new b.a.Query("Todo");a.equalTo("deleted",!1),a.find().then((function(e){var n=e.map((function(e){return O({id:e.id},e.attributes)}));t.call(null,n)}),(function(e){n&&n.call(null,e)}))},create:function(e,t,n){var a=e.status,s=e.title,i=e.deleted,o=new(b.a.Object.extend("Todo"));o.set("title",s),o.set("status",a),o.set("deleted",i);var r=new b.a.ACL;r.setPublicReadAccess(!1),r.setWriteAccess(b.a.User.current(),!0),r.setReadAccess(b.a.User.current(),!0),o.setACL(r),o.save().then((function(e){t.call(null,e.id)}),(function(e){n&&n.call(null,e)}))},update:function(e,t,n){var a=e.id,s=e.title,i=e.status,o=e.deleted,r=b.a.Object.createWithoutData("Todo",a);void 0!==s&&r.set("title",s),void 0!==i&&r.set("status",i),void 0!==o&&r.set("deleted",o),r.save().then((function(e){t&&t.call(null)}),(function(e){return n&&n.call(null,e)}))},destroy:function(e,t,n){w.update({id:e,deleted:!0},t,n)}};function E(){var e=b.a.User.current();return e?S(e):null}function S(e){return O({id:e.id},e.attributes)}var k=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"forgotPassword"},s.a.createElement("h3",null,"Reset Password"),s.a.createElement("form",{className:"forgotPassword",onSubmit:this.props.onSubmit}," ",s.a.createElement("div",{className:"row"},s.a.createElement("label",null,"Email"),s.a.createElement("input",{type:"text",value:this.props.formData.email,onChange:this.props.onChange.bind(null,"email")})),s.a.createElement("div",{className:"row actions"},s.a.createElement("button",{type:"submit"},"Send the Reset Mail"),s.a.createElement("a",{href:"#",onClick:this.props.onSignIn},"Back to Login"))))}}]),t}(a.Component),U=function(e){return s.a.createElement("form",{className:"signUp",onSubmit:e.onSubmit.bind(this)}," ",s.a.createElement("div",{className:"row"},s.a.createElement("label",null,"Email"),s.a.createElement("input",{type:"text",value:e.formData.email,onChange:e.onChange.bind(null,"email")})),s.a.createElement("div",{className:"row"},s.a.createElement("label",null,"User Name"),s.a.createElement("input",{type:"text",value:e.formData.username,onChange:e.onChange.bind(null,"username")})),s.a.createElement("div",{className:"row"},s.a.createElement("label",null,"Password"),s.a.createElement("input",{type:"password",value:e.formData.password,onChange:e.onChange.bind(null,"password")})),s.a.createElement("div",{className:"row actions"},s.a.createElement("button",{type:"submit"},"Sign Up")))},N=function(e){return s.a.createElement("form",{className:"signIn",onSubmit:e.onSubmit}," ",s.a.createElement("div",{className:"row"},s.a.createElement("label",null,"User Name"),s.a.createElement("input",{type:"text",value:e.formData.username,onChange:e.onChange.bind(null,"username")})),s.a.createElement("div",{className:"row"},s.a.createElement("label",null,"Password"),s.a.createElement("input",{type:"password",value:e.formData.password,onChange:e.onChange.bind(null,"password")})),s.a.createElement("div",{className:"row actions"},s.a.createElement("button",{type:"submit"},"Login"),s.a.createElement("a",{href:"#",onClick:e.onForgotPassword},"Do you forget the password?")))},j=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={selected:"signUp"},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"switch",value:function(e){this.setState({selected:e.target.value})}},{key:"render",value:function(){return s.a.createElement("div",{className:"signInOrSignUp"},s.a.createElement("nav",null,s.a.createElement("label",null,s.a.createElement("input",{type:"radio",value:"signUp",checked:"signUp"===this.state.selected,onChange:this.switch.bind(this)})," Register"),s.a.createElement("label",null,s.a.createElement("input",{type:"radio",value:"signIn",checked:"signIn"===this.state.selected,onChange:this.switch.bind(this)})," Login")),s.a.createElement("div",{className:"panes"},"signUp"===this.state.selected?s.a.createElement(U,{formData:this.props.formData,onSubmit:this.props.onSignUp,onChange:this.props.onChange}):null,"signIn"===this.state.selected?s.a.createElement(N,{formData:this.props.formData,onChange:this.props.onChange,onSubmit:this.props.onSignIn,onForgotPassword:this.props.onForgotPassword}):null))}}]),t}(a.Component),D=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={selectedTab:"signInOrSignUp",formData:{email:"",username:"",password:""}},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"signUp",value:function(e){var t=this;e.preventDefault();var n=this.state.formData;!function(e,t,n,a,s){var i=new b.a.User;i.setUsername(t),i.setPassword(n),i.setEmail(e),i.signUp().then((function(e){var t=S(e);a.call(null,t)}),(function(e){s.call(null,e)}))}(n.email,n.username,n.password,(function(e){t.props.onSignUp.call(null,e)}),(function(e){switch(e.code){case 202:alert("\u7528\u6237\u540d\u5df2\u88ab\u5360\u7528");break;default:alert(e)}}))}},{key:"signIn",value:function(e){var t=this;e.preventDefault();var n=this.state.formData;!function(e,t,n,a){b.a.User.logIn(e,t).then((function(e){var t=S(e);n.call(null,t)}),(function(e){a.call(null,e)}))}(n.username,n.password,(function(e){t.props.onSignIn.call(null,e),t.props.todoInit.call(null)}),(function(e){switch(e.code){case 210:alert("\u7528\u6237\u540d\u4e0e\u5bc6\u7801\u4e0d\u5339\u914d");break;default:alert(e)}}))}},{key:"changeFormData",value:function(e,t){var n=JSON.parse(JSON.stringify(this.state));n.formData[e]=t.target.value,this.setState(n)}},{key:"render",value:function(){return s.a.createElement("div",{className:"UserDialog-Wrapper"},s.a.createElement("div",{className:"UserDialog"},"signInOrSignUp"===this.state.selectedTab?s.a.createElement(j,{formData:this.state.formData,onSignIn:this.signIn.bind(this),onSignUp:this.signUp.bind(this),onChange:this.changeFormData.bind(this),onForgotPassword:this.showForgotPassword.bind(this)}):s.a.createElement(k,{formData:this.state.formData,onSubmit:this.resetPassword.bind(this),onChange:this.changeFormData.bind(this),onSignIn:this.returnToSignIn.bind(this)})))}},{key:"showForgotPassword",value:function(){var e=JSON.parse(JSON.stringify(this.state));e.selectedTab="forgotPassword",this.setState(e)}},{key:"returnToSignIn",value:function(){var e=JSON.parse(JSON.stringify(this.state));e.selectedTab="signInOrSignUp",this.setState(e)}},{key:"resetPassword",value:function(e){var t,n,a;e.preventDefault(),t=this.state.formData.email,b.a.User.requestPasswordReset(t).then((function(e){n.call()}),(function(e){a.call(null,e)}))}}]),t}(a.Component),C=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={user:E||{},newTodo:"",todoList:[]},n.initTodoGetByUser(),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state.todoList.filter((function(e){return!e.deleted})).map((function(t,n){return s.a.createElement("li",{key:n},s.a.createElement(f,{todo:t,onToggle:e.toggle.bind(e),onDelete:e.delete.bind(e)}))}));return s.a.createElement("div",{className:"App"},s.a.createElement("h1",null,this.state.username||"My"," Todos",this.state.user.id?s.a.createElement("button",{onClick:this.signOut.bind(this)},"SignOut"):null),s.a.createElement("div",{className:"inputWrapper"},s.a.createElement(p,{content:this.state.newTodo,onChange:this.changeTitle.bind(this),onSubmit:this.addTodo.bind(this)})),s.a.createElement("ol",{className:"todoList"},t),this.state.user.id?null:s.a.createElement(D,{onSignUp:this.onSignUpOrSignIn.bind(this),onSignIn:this.onSignUpOrSignIn.bind(this),todoInit:this.initTodoGetByUser.bind(this)}))}},{key:"signOut",value:function(){b.a.User.logOut();var e=JSON.parse(JSON.stringify(this.state));e.user={},this.setState(e)}},{key:"onSignUpOrSignIn",value:function(e){var t=JSON.parse(JSON.stringify(this.state));t.user=e,this.setState(t)}},{key:"componentDidUpdate",value:function(){}},{key:"initTodoGetByUser",value:function(){var e=this,t=E();t&&w.getByUser(t,(function(t){var n=JSON.parse(JSON.stringify(e.state));n.todoList=t,e.setState(n)}))}},{key:"toggle",value:function(e,t){var n=this,a=t.status;t.status="completed"===t.status?"":"completed",w.update(t,(function(){n.setState(n.state)}),(function(e){t.status=a,n.setState(n.state)}))}},{key:"changeTitle",value:function(e){this.setState({newTodo:e.target.value,todoList:this.state.todoList})}},{key:"addTodo",value:function(e){var t=this,n={title:e.target.value,status:"",deleted:!1};w.create(n,(function(e){n.id=e,t.state.todoList.push(n),t.setState({newTodo:"",todoList:t.state.todoList})}),(function(e){console.log(e)}))}},{key:"delete",value:function(e,t){var n=this;w.destroy(t.id,(function(){t.deleted=!0,n.setState(n.state)}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.783bce1a.chunk.js.map