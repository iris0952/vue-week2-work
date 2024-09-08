import{r as n,c,a as t,t as b,h as C,w as u,v as m,i as j,j as B,F as D,g as O,o as d,k as T}from"./index-BGm1sirQ.js";import{a as i}from"./axios-C8DqakIB.js";const F={class:"container"},K={class:"row justify-content-center"},M={class:"col-md-6"},N={class:"card mt-5"},R={key:0,class:"card-body"},I={class:"card-title text-center"},W={class:"mb-3"},G=t("label",{for:"account",class:"form-label"},"帳號",-1),H={class:"mb-3"},J=t("label",{for:"password",class:"form-label"},"密碼",-1),P={key:0,class:"mb-3"},Q=t("label",{for:"nickname",class:"form-label"},"暱稱",-1),X={class:"d-grid gap-2"},Y={key:1,class:"card-body"},Z=t("h3",{class:"card-title text-center"},"驗證",-1),tt={class:"mb-3"},et=t("label",{for:"account",class:"form-label"},"Token",-1),st={class:"d-grid gap-2"},ot={key:2,class:"card-body"},at=t("h3",{class:"card-title text-center"},"Todo List",-1),nt={class:"mb-3"},lt={class:"list-group"},it=["onUpdate:modelValue"],rt=["onClick"],ct=["onClick"],r="https://todolist-api.hexschool.io",pt={__name:"Week2View",setup(ut){const v=n(""),p=n(""),h=n(""),l=n(!1),_=n(!1),w=n(!1),a=n(""),V=async()=>{try{const e=await i.post(`${r}/users/sign_up`,{email:v.value,password:p.value,nickname:h.value});alert("註冊成功"),x()}catch(e){alert("註冊失敗:"+e.message)}},U=async()=>{try{const e=await i.post(`${r}/users/sign_in`,{email:v.value,password:p.value});a.value=e.data.token,alert("登入成功"),v.value="",p.value="",_.value=!0}catch(e){alert("登入失敗:"+e.message)}},E=async()=>{try{if(!a.value){alert("Token is missing");return}const e=await i.get(`${r}/users/checkout`,{headers:{Authorization:a.value}});w.value=!0,alert("驗證成功 UID: "+e.data.uid),y()}catch(e){alert("驗證失敗: "+e.message)}},S=async()=>{try{const e=await i.post(`${r}/users/sign_out`,{},{headers:{Authorization:a.value}});alert("登出成功"),a.value="",$()}catch(e){console.log(e),alert("登出失敗: "+e.message)}},f=n([]),y=async()=>{const e=await i.get(`${r}/todos`,{headers:{Authorization:a.value}});f.value=e.data.data.map(s=>({...s,isEditing:!1}))},g=n(""),z=async()=>{try{const e={content:g.value};await i.post(`${r}/todos`,e,{headers:{Authorization:a.value}}),alert("新增成功"),g.value="",y()}catch(e){alert("新增失敗:"+e.message)}},A=async e=>{try{await i.delete(`${r}/todos/${e}`,{headers:{Authorization:a.value}}),alert("刪除成功"),y()}catch(s){alert("刪除失敗:"+s.message)}},L=e=>{e.isEditing?q(e.id):e.isEditing=!0},q=async e=>{try{const s=f.value.find(o=>o.id===e);await i.put(`${r}/todos/${e}`,s,{headers:{Authorization:a.value}}),y(),alert("編輯成功")}catch(s){alert("編輯失敗:"+s.message)}},$=()=>{a.value="",l.value=!1,_.value=!1},x=()=>{l.value=!l.value,v.value="",p.value="",h.value=""};return(e,s)=>(d(),c("div",F,[t("div",K,[t("div",M,[t("div",N,[_.value?w.value?(d(),c("div",ot,[at,t("div",{class:"text-end mb-3"},[t("button",{type:"button",class:"btn btn-primary",onClick:S},"登出")]),t("div",nt,[u(t("input",{"onUpdate:modelValue":s[9]||(s[9]=o=>g.value=o),onKeyup:B(z,["enter"]),type:"text",class:"form-control",placeholder:"確認後按下enter"},null,544),[[m,g.value]])]),t("ul",lt,[(d(!0),c(D,null,O(f.value,o=>(d(),c("li",{key:o.id,class:"list-group-item d-flex justify-content-between align-items-center"},[u(t("span",null,b(o.content),513),[[T,!o.isEditing]]),u(t("input",{type:"text","onUpdate:modelValue":k=>o.content=k,class:""},null,8,it),[[m,o.content],[T,o.isEditing]]),t("div",null,[t("button",{onClick:k=>L(o),class:"btn btn-primary btn-sm"},b(o.isEditing?"確認":"編輯"),9,rt),t("button",{onClick:k=>A(o.id),class:"btn btn-danger btn-sm"},"刪除",8,ct)])]))),128))])])):(d(),c("div",Y,[Z,t("form",{onSubmit:s[8]||(s[8]=C((...o)=>e.handleSubmit&&e.handleSubmit(...o),["prevent"]))},[t("div",tt,[et,u(t("input",{type:"text",id:"account","onUpdate:modelValue":s[5]||(s[5]=o=>a.value=o),class:"form-control",required:""},null,512),[[m,a.value]])]),t("div",st,[t("button",{type:"submit",class:"btn btn-primary",onClick:s[6]||(s[6]=o=>E())},"驗證"),t("button",{type:"button",class:"btn btn-secondary",onClick:s[7]||(s[7]=o=>$())}," 返回登入 ")])],32)])):(d(),c("div",R,[t("h3",I,b(l.value?"註冊":"登入"),1),t("form",{onSubmit:s[4]||(s[4]=C((...o)=>e.handleSubmit&&e.handleSubmit(...o),["prevent"]))},[t("div",W,[G,u(t("input",{type:"text",id:"account","onUpdate:modelValue":s[0]||(s[0]=o=>v.value=o),class:"form-control",placeholder:"輸入信箱",required:""},null,512),[[m,v.value]])]),t("div",H,[J,u(t("input",{type:"password",id:"password","onUpdate:modelValue":s[1]||(s[1]=o=>p.value=o),class:"form-control",placeholder:"輸入密碼",required:""},null,512),[[m,p.value]])]),l.value?(d(),c("div",P,[Q,u(t("input",{type:"text",id:"nickname","onUpdate:modelValue":s[2]||(s[2]=o=>h.value=o),class:"form-control",placeholder:"輸入暱稱",required:""},null,512),[[m,h.value]])])):j("",!0),t("div",X,[t("button",{type:"submit",class:"btn btn-primary",onClick:s[3]||(s[3]=o=>l.value?V():U())},b(l.value?"註冊":"登入"),1),t("button",{type:"button",class:"btn btn-secondary",onClick:x},b(l.value?"返回登入":"註冊"),1)])],32)]))])])])]))}};export{pt as default};
