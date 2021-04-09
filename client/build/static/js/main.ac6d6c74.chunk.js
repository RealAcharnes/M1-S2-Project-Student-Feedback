(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{132:function(e,t,n){},134:function(e,t,n){},341:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n(37),i=n.n(s),c=n(25),r=(n(132),n(6)),o=n(7),l=n(9),u=n(13),d=n(12),h=n(11),j=(n(133),n(134),n(17)),b=n.n(j),m="https://neuroeducation-feedback.herokuapp.com/api/",O=new(function(){function e(){Object(r.a)(this,e)}return Object(o.a)(e,[{key:"login",value:function(e,t){return b.a.post(m+"signin",{email:e,password:t}).then((function(e){return console.log(e.data),e.data.token&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(e,t,n,a,s){return b.a.post(m+"signup",{firstname:e,lastname:t,email:n,password:a,password_confirmation:s})}},{key:"adminRegister",value:function(e,t,n){return b.a.post(m+"adminsignup",{username:e,email:t,roles:n})}},{key:"getCurrentUser",value:function(){return JSON.parse(localStorage.getItem("user"))}}]),e}()),x=n(32),p=n.n(x),g=n(16),v=n.n(g),f=n(38),C=n.n(f),k=n(0),N=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Ce champ est obligatoire !"})},y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).handleLogin=a.handleLogin.bind(Object(l.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(l.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(l.a)(a)),a.state={email:"",password:"",loading:!1,message:""},a}return Object(o.a)(n,[{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleLogin",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?O.login(this.state.email,this.state.password).then((function(){t.props.history.push("/profile"),window.location.reload()}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:n})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(k.jsx)("div",{className:"col-md-12",children:Object(k.jsx)("div",{className:"card card-container",children:Object(k.jsxs)(p.a,{onSubmit:this.handleLogin,ref:function(t){e.form=t},children:[Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"email",children:"Email de l'utilisateur"}),Object(k.jsx)(v.a,{type:"email",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[N]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"password",children:"Mot de passe"}),Object(k.jsx)(v.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[N]})]}),Object(k.jsx)("div",{className:"form-group",children:Object(k.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(k.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(k.jsx)("span",{children:"Se connecter"})]})}),this.state.message&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:this.state.message})}),Object(k.jsx)(C.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})})})}}]),n}(a.Component),S=n(58),w=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Ce champ est obligatoire !"})},q=function(e){if(!Object(S.isEmail)(e))return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Adresse email non valide."})},_=function(e){if(e.length<3||e.length>50)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Le nom d'utilisateur doit contenir entre 3 et 50 charact\xe8res."})},E=function(e){if(e.length<3||e.length>50)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Le nom d'utilisateur doit contenir entre 3 et 50 charact\xe8res."})},A=function(e){if(e.length<6||e.length>50)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Le mot de passe doit contenir entre 6 et 50 charact\xe8res."})},F=function(e){if(e.length<3||e.length>50)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Le nom d'utilisateur doit contenir entre 3 et 50 charact\xe8res."})},R=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).handleRegister=a.handleRegister.bind(Object(l.a)(a)),a.onChangeFirstname=a.onChangeFirstname.bind(Object(l.a)(a)),a.onChangeLastname=a.onChangeLastname.bind(Object(l.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(l.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(l.a)(a)),a.onChangePasswordConfirmation=a.onChangePasswordConfirmation.bind(Object(l.a)(a)),a.state={lastname:"",firstname:"",email:"",password:"",password_confirmation:"",successful:!1,message:""},a}return Object(o.a)(n,[{key:"onChangeFirstname",value:function(e){this.setState({firstname:e.target.value})}},{key:"onChangeLastname",value:function(e){this.setState({lastname:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onChangePasswordConfirmation",value:function(e){this.setState({password_confirmation:e.target.value})}},{key:"handleRegister",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",successful:!1}),this.form.validateAll(),0===this.checkBtn.context._errors.length&&O.register(this.state.firstname,this.state.lastname,this.state.email,this.state.password,this.state.password_confirmation).then((function(e){t.setState({message:e.data.message,successful:!0}),console.log(t.state)}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({successful:!1,message:n}),console.log(t.state)}))}},{key:"render",value:function(){var e=this;return Object(k.jsx)("div",{className:"col-md-12",children:Object(k.jsx)("div",{className:"card card-container",children:Object(k.jsxs)(p.a,{onSubmit:this.handleRegister,ref:function(t){e.form=t},children:[!this.state.successful&&Object(k.jsxs)("div",{children:[Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"firstname",children:"Prenom"}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"firstname",value:this.state.firstname,onChange:this.onChangeFirstname,validations:[w,E]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"lastname",children:"Nom"}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"lastname",value:this.state.lastname,onChange:this.onChangeLastname,validations:[w,_]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"email",children:"Email"}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[w,q]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"password",children:"Mot de passe"}),Object(k.jsx)(v.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[w,A]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"password_confirmation",children:"Confirmer Mot de passe"}),Object(k.jsx)(v.a,{type:"password",className:"form-control",name:"password_confirmation",value:this.state.password_confirmation,onChange:this.onChangePasswordConfirmation,validations:[w,F]})]}),Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("button",{className:"btn btn-primary btn-block",children:"Cr\xe9er le compte"})})]}),this.state.message&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:this.state.successful?"alert alert-success":"alert alert-danger",role:"alert",children:this.state.message})}),Object(k.jsx)(C.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})})})}}]),n}(a.Component),P=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={content:""},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.setState({content:"Bienvenue dans votre application de Neuro\xe9ducation"})}},{key:"render",value:function(){return Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("header",{className:"jumbotron",children:Object(k.jsx)("h3",{children:this.state.content})})})}}]),n}(a.Component),Q=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={title:"",description:""},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.setState({title:"Bienvenue dans votre application de Neuro\xe9ducation",description:"Cette application permet aux \xe9l\xe8ves de prendre conscience de leurs strat\xe9gies de r\xe9ussite et des potentielles origines de leurs erreurs"})}},{key:"render",value:function(){return Object(k.jsxs)("div",{children:[Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("header",{className:"jumbotron",children:Object(k.jsx)("h3",{children:this.state.title})})}),Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("h5",{children:this.state.description})})]})}}]),n}(a.Component),L=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={currentUser:O.getCurrentUser()},a}return Object(o.a)(n,[{key:"render",value:function(){var e=this.state.currentUser;return Object(k.jsxs)("div",{className:"container",children:[Object(k.jsx)("header",{className:"jumbotron",children:Object(k.jsxs)("h3",{children:["Profile : ",Object(k.jsxs)("strong",{children:[e.message.firstname," ",e.message.lastname]})]})}),Object(k.jsxs)("p",{children:[Object(k.jsx)("strong",{children:"Token:"})," ",e.token.substring(0,20)," ..."," ",e.token.substr(e.token.length-20)]}),Object(k.jsxs)("p",{children:[Object(k.jsx)("strong",{children:"Id:"})," ",e.message._id]}),Object(k.jsxs)("p",{children:[Object(k.jsx)("strong",{children:"Email:"})," ",e.message.email]}),Object(k.jsx)("strong",{children:"Authorities:"}),Object(k.jsx)("ul",{children:e.roles&&e.roles.map((function(e,t){return Object(k.jsx)("li",{children:e},t)}))})]})}}]),n}(a.Component);function U(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.token?{"x-access-token":e.token}:{}}var B="https://neuroeducation-feedback.herokuapp.com/api/test/",z=new(function(){function e(){Object(r.a)(this,e)}return Object(o.a)(e,[{key:"getPublicContent",value:function(){return b.a.get(B+"all")}},{key:"getUserBoard",value:function(){return b.a.get(B+"user",{headers:U()})}},{key:"getAdminBoard",value:function(){return b.a.get(B+"admin",{headers:U()})}}]),e}()),T=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={content:""},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;z.getUserBoard().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("header",{className:"jumbotron",children:Object(k.jsx)("h3",{children:this.state.content})})})}}]),n}(a.Component),D=n(35),I=n(363),M=n(10),V=new(function(){function e(){Object(r.a)(this,e)}return Object(o.a)(e,[{key:"submit",value:function(e,t){return b.a.post("https://neuroeducation-feedback.herokuapp.com/api/postform/submit",{title:e,questions:t}).then((function(e){return e.data}))}}]),e}()),J=Object(M.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",borderRadius:15,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",margin:"5px 15px"},label:{textTransform:"none"}})(I.a),G=Object(M.a)({root:{background:"linear-gradient(45deg, #00BCFF 30%, #5355FF 90%)",borderRadius:15,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",margin:"5px 15px"},label:{textTransform:"none"}})(I.a),H=Object(M.a)({root:{background:"linear-gradient(45deg, #FF8700 30%, #FF1E1E 90%)",borderRadius:15,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",margin:"5px 15px"},label:{textTransform:"none"}})(I.a),Y=Object(M.a)({root:{background:"linear-gradient(45deg, #FF1D1D 30%, #4C4C4C 90%)",borderRadius:15,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",margin:"5px 15px"},label:{textTransform:"none"}})(I.a),Z=Object(M.a)({root:{background:"linear-gradient(45deg, #11FF00 30%, #00FF82 90%)",borderRadius:15,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",margin:"5px 15px"},label:{textTransform:"none"}})(I.a),K=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Ce champ est obligatoire !"})},W=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).onChangeQuestion=a.onChangeQuestion.bind(Object(l.a)(a)),a.onClickAddExplanation=a.onClickAddExplanation.bind(Object(l.a)(a)),a.state={explanations:!1},a}return Object(o.a)(n,[{key:"onChangeQuestion",value:function(e){this.props.onQuestionChange(e.target.value)}},{key:"onChangeExplanation",value:function(e,t){this.props.onExplanationChange(e,t.target.value)}},{key:"onClickRemoveExplanation",value:function(e){this.props.onRemoveExplanationClick(e)}},{key:"onClickAddExplanation",value:function(){this.props.onAddExplanationClick(),this.setState({explanations:!0})}},{key:"createExplanationUI",value:function(){var e=this;return Object(k.jsx)("div",{children:this.props.explanations?this.props.explanations.map((function(t,n){return Object(k.jsxs)("div",{children:[Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"explanation",children:"Explication"}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"explanation",value:t.options_text||"",onChange:e.onChangeExplanation.bind(e,n),validations:[K],autoComplete:"off"})]},n),Object(k.jsx)(H,{variant:"contained",onClick:e.onClickRemoveExplanation.bind(e,n),children:"Supprimer cette explication"})]})})):Object(k.jsx)("h3",{children:"No Explanation props"})})}},{key:"render",value:function(){var e=this.state.question;return Object(k.jsx)("div",{children:Object(k.jsxs)(p.a,{children:[Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"question",children:Object(k.jsx)("strong",{children:"Question"})}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"question",value:e,onChange:this.onChangeQuestion,validations:[K],autoComplete:"off"})]}),Object(k.jsx)(J,{variant:"contained",onClick:this.onClickAddExplanation,children:"Ajouter une explication"}),this.state.explanations&&this.createExplanationUI()]})})}}]),n}(a.Component),X=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).onClickAddQuestion=a.onClickAddQuestion.bind(Object(l.a)(a)),a.onChangeTitle=a.onChangeTitle.bind(Object(l.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(l.a)(a)),a.state={title:"",questions:[{question_id:"",question_title:"",question_options:[]}],message:""},a}return Object(o.a)(n,[{key:"handleQuestionChange",value:function(e,t){var n=Object(D.a)(this.state.questions);n[e].question_title=t,n[e].question_id=e+1,this.setState({questions:n})}},{key:"handleExplanationChange",value:function(e,t,n){var a=Object(D.a)(this.state.questions);a[e].question_options[t].options_text=n;var s=String.fromCharCode(96+(t+1));a[e].question_options[t].options_id=s,this.setState({questions:a})}},{key:"onChangeTitle",value:function(e){var t=e.target.value;this.setState({title:t})}},{key:"onClickAddQuestion",value:function(){this.setState((function(e){return{questions:[].concat(Object(D.a)(e.questions),[{question_title:"",question_options:[]}])}}))}},{key:"handleAddExplanationClick",value:function(e){var t=Object(D.a)(this.state.questions);t[e].question_options.push({options_text:""}),this.setState({questions:t})}},{key:"handleRemoveExplanationClick",value:function(e,t){var n=Object(D.a)(this.state.questions);n[e].question_options.splice(t,1),this.setState({questions:n})}},{key:"onClickDelQuestion",value:function(e){var t=Object(D.a)(this.state.questions);t.splice(e,1),this.setState({questions:t})}},{key:"handleSubmit",value:function(){var e=this;V.submit(this.state.title,this.state.questions).then((function(){e.props.history.push("/postSubmitForm"),window.location.reload()}),(function(t){var n=t.response&&t.response.data&&t.response.data.message||t.message||t.toString();e.setState({message:n,questions:[{question_title:"",question_options:[]}]})}))}},{key:"createQuestionUI",value:function(){var e=this;return this.state.questions.map((function(t,n){return Object(k.jsx)("div",{className:"questionContainer",children:Object(k.jsxs)("div",{className:"container",children:[Object(k.jsx)(W,{onQuestionChange:e.handleQuestionChange.bind(e,n),onTitleChange:e.handleTitleChange,onExplanationChange:e.handleExplanationChange.bind(e,n),onAddExplanationClick:e.handleAddExplanationClick.bind(e,n),onRemoveExplanationClick:e.handleRemoveExplanationClick.bind(e,n),explanations:e.state.questions[n].question_options}),Object(k.jsx)("div",{className:"delQuestion",children:Object(k.jsx)(Y,{variant:"contained",onClick:e.onClickDelQuestion.bind(e,n),children:"Supprimer cette question"})})]},n)})}))}},{key:"render",value:function(){var e=this.state.title;return Object(k.jsx)("div",{className:"mainTeacherForm",children:Object(k.jsxs)("div",{className:"container pt-3",children:[Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("header",{className:"jumbotron",children:Object(k.jsx)("h3",{children:"Cr\xe9ation de nouvelles questions"})})}),Object(k.jsxs)(p.a,{children:[Object(k.jsx)("div",{className:"container",children:Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"form-title",children:Object(k.jsx)("strong",{children:"Titre du formulaire"})}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"form-title",value:e,onChange:this.onChangeTitle,validations:[K],autoComplete:"off"})]})}),this.createQuestionUI(),Object(k.jsxs)("div",{className:"container",children:[Object(k.jsx)("br",{}),Object(k.jsx)(G,{variant:"contained",onClick:this.onClickAddQuestion,children:"Ajouter une question"}),Object(k.jsx)("br",{}),Object(k.jsx)("br",{}),Object(k.jsx)(Z,{variant:"contained",onClick:this.handleSubmit,children:"Valider"})]})]}),this.state.message&&Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("div",{className:"itsanerror",children:Object(k.jsx)("h3",{children:"Une erreur est survenu lors de l'envoi du formulaire"})})})]})})}}]),n}(a.Component),$=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(k.jsx)("div",{children:Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("header",{className:"jumbotron",children:Object(k.jsx)("div",{className:"success",children:Object(k.jsx)("h3",{children:"Formulaire envoy\xe9 avec succ\xe8s !"})})})})})}}]),n}(a.Component),ee=n(28),te=n(34),ne=n(78),ae=n(19),se=n(62),ie=n(365),ce=n(368),re=n(369),oe=n(367),le=n(366),ue=n(79),de=n.n(ue),he=n(61),je=function(e){var t=e.explanationLabels,n=e.explanationValues;return Object(k.jsx)("div",{children:Object(k.jsx)(he.Bar,{data:{labels:t,datasets:[{data:n,backgroundColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"]}]},options:{maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]},legend:{display:!1}}})})},be=n(364),me=function(e){var t=e.labels,n=e.answerValues;return Object(k.jsx)("div",{children:Object(k.jsx)(he.Doughnut,{data:{labels:t,datasets:[{data:n,backgroundColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)"]}]},options:{maintainAspectRatio:!1}})})},Oe=function(){var e=Object(a.useState)([]),t=Object(ae.a)(e,2),n=t[0],s=t[1],i=Object(a.useState)(null),c=Object(ae.a)(i,2),r=c[0],o=c[1],l=Object(a.useState)(-1),u=Object(ae.a)(l,2),d=(u[0],u[1]),h=Object(a.useState)(null),j=Object(ae.a)(h,2),m=j[0],O=j[1],x=Object(a.useState)(),p=Object(ae.a)(x,2),g=p[0],v=p[1],f=Object(a.useState)(),C=Object(ae.a)(f,2),N=C[0],y=C[1],S=Object(a.useState)(null),w=Object(ae.a)(S,2),q=w[0],_=w[1],E=Object(a.useState)(null),A=Object(ae.a)(E,2),F=A[0],R=A[1];Object(a.useEffect)((function(){b.a.get("https://neuroeducation-feedback.herokuapp.com/api/findAllAnswered").then((function(e){console.log(e.data),s(e.data)})).catch((function(e){console.log(e)}))}),[]);var P=function(e){b.a.get("https://neuroeducation-feedback.herokuapp.com/api/groupStats/".concat(e)).then((function(e){e&&(v(e.data[0]._id.answer),console.log(e.data[0]._id.answer),y(e.data[0]._id.explanation),console.log(e.data[0]._id.explanation))})).catch()},Q=function(e,t){var n=[];return t.forEach((function(t){n.push(e[t])})),n},L=function(e,t){var n=[];return t.forEach((function(t){n.push(e[t])})),n},U=function(e){return Object.keys(e)};return Object(k.jsxs)("div",{className:"container-questions",children:[Object(k.jsx)("h4",{children:"All Answered List"}),Object(k.jsx)("div",{className:"quiz",children:n&&n.map((function(e,t){return Object(k.jsxs)("h4",{onClick:function(){return function(e,t,n){console.log(e),o(e),d(t),P(n),_(null),R(null),O(null)}(e,t,e.quiz_id)},children:[" ",e.quiz_id," ","",Object(k.jsx)(se.a,{style:{color:"red",cursor:"pointer"}})]})}))}),Object(k.jsx)("div",{children:r?Object(k.jsxs)("div",{children:[Object(k.jsx)("center",{children:Object(k.jsxs)("h4",{children:["You Selected Quiz : ",r.quiz_id]})}),Object(k.jsxs)("div",{children:[Object(k.jsx)("h4",{children:"Student List : "}),r.quiz_answers&&r.quiz_answers.map((function(e,t){return Object(k.jsx)("div",{children:Object(k.jsx)("h4",{onClick:function(){return t=e,console.log(t),void _(t);var t},children:e.student_id})})}))]}),Object(k.jsx)("div",{children:q?Object(k.jsxs)("div",{children:[Object(k.jsxs)("h4",{children:["Showing Answers of  : ",q.student_id]}),q&&q.student_answers.map((function(e,t){return Object(k.jsxs)("div",{children:[Object(k.jsxs)("h4",{children:[e.question_answer_id," .",e.answer]}),Object(k.jsxs)("h4",{children:["Explanation : ",e.explanation]})]})}))]}):Object(k.jsx)("h4",{})}),Object(k.jsx)(I.a,{disableElevation:!0,variant:"contained",onClick:function(){console.log(m),console.log(F)},children:"Log"})," ",Object(k.jsx)("span",{}),Object(k.jsx)(I.a,{disableElevation:!0,variant:"contained",onClick:function(){var e=g[0].map((function(e,t){var n=[e];if(e)for(var a=1;a<g.length;a++)n.push(g[a][t]);return console.log(n),n}));console.log(e);var t=N[0].map((function(e,t){var n=[e];if(e)for(var a=1;a<N.length;a++)n.push(N[a][t]);return n}));console.log(t);var n=e.map((function(e,t){console.log(m);var n,a={Oui:0,"Plutot Oui":0,"Plutot Non":0,Non:0},s=Object(ne.a)(e);try{var i=function(){var t=n.value;a=Object(te.a)(Object(te.a)({},a),{},Object(ee.a)({},t,e.filter((function(e){return e===t})).length))};for(s.s();!(n=s.n()).done;)i()}catch(c){s.e(c)}finally{s.f()}return a}));O(n);var a=t.map((function(e,t){console.log(e);var n,a={a:0,b:0,c:0,d:0,e:0},s=Object(ne.a)(e);try{var i=function(){var t=n.value;a=Object(te.a)(Object(te.a)({},a),{},Object(ee.a)({},t,e.filter((function(e){return e===t})).length))};for(s.s();!(n=s.n()).done;)i()}catch(c){s.e(c)}finally{s.f()}return a}));R(a)},children:"Click for Stats"}),Object(k.jsxs)(be.a,{children:[m?Object(k.jsx)("div",{children:Object(k.jsx)(ie.a,{container:!0,spacing:3,children:m&&m.map((function(e,t){return Object(k.jsx)(ie.a,{item:!0,sm:12,md:6,lg:4,children:Object(k.jsxs)(ce.a,{elevation:2,children:[Object(k.jsx)(re.a,{action:Object(k.jsx)(le.a,{children:Object(k.jsx)(de.a,{})}),title:"Graphique en anneau",subheader:"Question. "+(t+1)}),Object(k.jsx)(oe.a,{children:Object(k.jsx)(me,{labels:U(e),answerValues:L(e,U(e))})})]})})}))})}):Object(k.jsx)("h4",{}),F?Object(k.jsx)("div",{children:Object(k.jsx)(ie.a,{container:!0,spacing:3,children:F&&F.map((function(e,t){return Object(k.jsx)(ie.a,{item:!0,sm:12,md:6,lg:4,children:Object(k.jsxs)(ce.a,{elevation:2,children:[Object(k.jsx)(re.a,{action:Object(k.jsx)(le.a,{children:Object(k.jsx)(de.a,{})}),title:"Diagramme \xe0 bandes",subheader:"Question. ".concat(t+1)}),Object(k.jsx)(oe.a,{children:Object(k.jsx)(je,{explanationLabels:U(e),explanationValues:Q(e,U(e))})})]})})}))})}):Object(k.jsx)("h4",{})]})]}):Object(k.jsx)("h4",{children:"Please Select A Quiz to view Answers"})})]})},xe=function(){var e=Object(a.useState)([]),t=Object(ae.a)(e,2),n=t[0],s=t[1],i=Object(a.useState)(null),c=Object(ae.a)(i,2),r=c[0],o=c[1],l=Object(a.useState)(-1),u=Object(ae.a)(l,2),d=(u[0],u[1]),h=Object(a.useState)({}),j=Object(ae.a)(h,2),m=j[0],x=j[1],p=Object(a.useState)([]),g=Object(ae.a)(p,2),v=g[0],f=g[1],C=Object(a.useState)(O.getCurrentUser()),N=Object(ae.a)(C,2),y=N[0];N[1];Object(a.useEffect)((function(){b.a.get("https://neuroeducation-feedback.herokuapp.com/api/findAllQ").then((function(e){console.log(e.data),s(e.data)})).catch((function(e){console.log(e)}))}),[]);var S=function(e,t){return!!m[e]&&m[e]===t},w=function(e,t){x((function(n){return console.log(n),Object(te.a)(Object(te.a)({},n),{},Object(ee.a)({},e,t))}))};return Object(k.jsxs)("div",{className:"container-questions",children:[Object(k.jsx)("h4",{children:"Quiz List"}),Object(k.jsx)("div",{className:"quiz",children:n&&n.map((function(e,t){return Object(k.jsxs)("h4",{onClick:function(){return function(e,t){console.log(e),o(e),d(t)}(e,t)},children:[" ",e.quiz," ","",Object(k.jsx)(se.a,{style:{color:"red",cursor:"pointer"}})]})}))}),Object(k.jsx)("div",{children:r?Object(k.jsxs)("div",{children:[Object(k.jsxs)("center",{children:[Object(k.jsx)("h4",{children:r.quiz}),Object(k.jsx)("br",{})]}),r.questions&&r.questions.map((function(e,t){return Object(k.jsxs)("div",{children:[Object(k.jsxs)("h4",{children:[e.question_id,". ",e.question_title]}),Object(k.jsxs)("div",{children:[Object(k.jsx)("input",{type:"radio",value:"Oui",checked:S(e.question_id,"Oui"),onChange:function(t){return w(e.question_id,t.target.value)}})," Oui",Object(k.jsx)("input",{type:"radio",value:"Plutot Oui",checked:S(e.question_id,"Plutot Oui"),onChange:function(t){return w(e.question_id,t.target.value)}})," Plutot Oui",Object(k.jsx)("input",{type:"radio",value:"Plutot Non",checked:S(e.question_id,"Plutot Non"),onChange:function(t){return w(e.question_id,t.target.value)}})," Plutot Non",Object(k.jsx)("input",{type:"radio",value:"Non",checked:S(e.question_id,"Non"),onChange:function(t){return w(e.question_id,t.target.value)}})," Non"]}),"Plutot Non"===m[e.question_id]||"Plutot Oui"===m[e.question_id]||"Non"===m[e.question_id]?Object(k.jsx)("div",{children:e.question_options&&e.question_options.map((function(t,n){return Object(k.jsx)("div",{children:Object(k.jsxs)("label",{children:[Object(k.jsx)("input",{type:"checkbox",value:t.options_id,checked:v[t.option_text],onChange:function(t){return function(e,t,n,a,s){var i=v.map((function(e){return Object(te.a)({},e)})),c=i.find((function(e){return e.question_answer_id===n}));console.log(c),c?(i.find((function(e){return e.question_answer_id===n})).explanation=e,f(i)):f([].concat(Object(D.a)(v),[{question_answer_id:n,answer:m[n],explanation:e}]))}(t.target.value,t.target.checked,e.question_id,e.question_id,r.quiz_id)}}),Object(k.jsxs)("span",{children:["  ",t.options_id,". ",t.options_text]})]})})}))}):Object(k.jsx)("span",{children:"No Explanation Needed"})]},e.question_id)}))]}):Object(k.jsx)("h4",{children:"Please click on a quiz"})}),Object(k.jsx)("button",{className:"btn",onClick:function(){var e={quiz_id:r.quiz_id,quiz_answers:{student_id:y.message.firstname+" "+y.message.lastname,student_answers:v}};console.log("Radio Answer: ",m),console.log("CheckedItems: ",v),console.log("Final: ",e),b.a.post("https://neuroeducation-feedback.herokuapp.com/api/history",{answers:e}).then((function(e){console.log(e),e&&(f([]),x({}))})).catch((function(e){console.log(e)}))},children:"Submit Answers"})]})},pe=function(e){if(!e)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Ce champ est obligatoire !"})},ge=function(e){if(!Object(S.isEmail)(e))return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Adresse email non valide."})},ve=function(e){if(e.length<3||e.length>50)return Object(k.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Le nom d'utilisateur doit contenir entre 3 et 50 charact\xe8res."})},fe=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).handleRegister=a.handleRegister.bind(Object(l.a)(a)),a.onChangeUsername=a.onChangeUsername.bind(Object(l.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(l.a)(a)),a.onChangeCheckbox=a.onChangeCheckbox.bind(Object(l.a)(a)),a.state={username:"",email:"",admin:!1,teacher:!1,roles:[],successful:!1,message:"",noRoleError:!1},a}return Object(o.a)(n,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangeCheckbox",value:function(e){var t,n=e.target,a=n.checked,s=n.name;this.setState((t={},Object(ee.a)(t,s,a),Object(ee.a)(t,"noRoleError",!1),t))}},{key:"handleRegister",value:function(e){var t=this;if(e.preventDefault(),this.setState({message:"",successful:!1}),this.form.validateAll(),!this.state.admin&&!this.state.teacher)return this.setState({noRoleError:!0});var n=this.state.roles;this.state.admin&&n.push("ROLE_ADMIN"),this.state.teacher&&n.push("ROLE_TEACHER"),this.setState({roles:n}),0===this.checkBtn.context._errors.length&&O.adminRegister(this.state.username,this.state.email,this.state.roles).then((function(e){t.setState({message:e.data.message,successful:!0})}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({successful:!1,message:n})}))}},{key:"render",value:function(){var e=this;return Object(k.jsx)("div",{className:"col-md-12",children:Object(k.jsx)("div",{className:"card card-container",children:Object(k.jsxs)(p.a,{onSubmit:this.handleRegister,ref:function(t){e.form=t},children:[!this.state.successful&&Object(k.jsxs)("div",{children:[Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"username",children:"Nom d'utilisateur"}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[pe,ve]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsx)("label",{htmlFor:"email",children:"Email"}),Object(k.jsx)(v.a,{type:"text",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[pe,ge]})]}),Object(k.jsxs)("div",{className:"form-group",children:[Object(k.jsxs)("div",{className:"form-check",children:[Object(k.jsx)(v.a,{type:"checkbox",className:"form-check-input",name:"teacher",checked:this.state.teacher,onChange:this.onChangeCheckbox}),Object(k.jsx)("label",{className:"form-check-label",children:"Professeur"})]}),Object(k.jsxs)("div",{className:"form-check",children:[Object(k.jsx)(v.a,{type:"checkbox",className:"form-check-input",name:"admin",checked:this.state.admin,onChange:this.onChangeCheckbox}),Object(k.jsx)("label",{className:"form-check-label",children:"Administrateur"})]}),this.state.noRoleError&&Object(k.jsx)("div",{className:"container",children:Object(k.jsx)("div",{className:"itsanerror",children:"Vous devez s\xe9lectionner au moins un r\xf4le"})})]}),Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("button",{className:"btn btn-primary btn-block",children:"Cr\xe9er le compte"})})]}),this.state.message&&Object(k.jsx)("div",{className:"form-group",children:Object(k.jsx)("div",{className:this.state.successful?"alert alert-success":"alert alert-danger",role:"alert",children:this.state.message})}),Object(k.jsx)(C.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})})})}}]),n}(a.Component),Ce=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).logOut=a.logOut.bind(Object(l.a)(a)),a.state={showAdminBoard:!1,currentUser:void 0},a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=O.getCurrentUser();e&&this.setState({currentUser:e,showAdminBoard:"ROLE_ADMIN"})}},{key:"logOut",value:function(){O.logout()}},{key:"render",value:function(){var e=this.state,t=e.currentUser,n=e.showAdminBoard;return Object(k.jsxs)("div",{children:[Object(k.jsxs)("nav",{className:"navbar navbar-expand navbar-dark bg-dark",children:[Object(k.jsx)(c.b,{to:"/",className:"navbar-brand",children:"Outsmarted"}),Object(k.jsxs)("div",{className:"navbar-nav mr-auto",children:[Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/home",className:"nav-link",children:"Accueil"})}),n&&Object(k.jsx)("div",{children:Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/admin",className:"nav-link",children:"Tableau Administrateur"})})}),n&&Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/adminRegister",className:"nav-link",children:"Ajouter un compte"})}),n&&Object(k.jsx)("div",{children:Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/questions",className:"nav-link",children:"Questions Page"})})}),n&&Object(k.jsx)("div",{children:Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/answers",className:"nav-link",children:"Answers Page"})})}),t&&Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/user",className:"nav-link",children:"Utilisateur"})})]}),t?Object(k.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/profile",className:"nav-link",children:t.username})}),Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)("a",{href:"/login",className:"nav-link",onClick:this.logOut,children:"D\xe9connexion"})})]}):Object(k.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/login",className:"nav-link",children:"Se connecter"})}),Object(k.jsx)("li",{className:"nav-item",children:Object(k.jsx)(c.b,{to:"/register",className:"nav-link",children:"Cr\xe9er un compte"})})]})]}),Object(k.jsxs)(h.c,{children:[Object(k.jsx)(h.a,{exact:!0,path:"/",component:P}),Object(k.jsx)(h.a,{exact:!0,path:"/home",component:Q}),Object(k.jsx)(h.a,{exact:!0,path:"/login",component:y}),Object(k.jsx)(h.a,{exact:!0,path:"/register",component:R}),Object(k.jsx)(h.a,{exact:!0,path:"/adminRegister",component:fe}),Object(k.jsx)(h.a,{exact:!0,path:"/profile",component:L}),Object(k.jsx)(h.a,{path:"/user",component:T}),Object(k.jsx)(h.a,{path:"/questions",component:xe}),Object(k.jsx)(h.a,{path:"/answers",component:Oe}),Object(k.jsx)(h.a,{path:"/admin",component:X}),Object(k.jsx)(h.a,{path:"/postSubmitForm",component:$})]})]})}}]),n}(a.Component),ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,370)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),i(e),c(e)}))};i.a.render(Object(k.jsx)(c.a,{children:Object(k.jsx)(Ce,{})}),document.getElementById("root")),ke()}},[[341,1,2]]]);
//# sourceMappingURL=main.ac6d6c74.chunk.js.map