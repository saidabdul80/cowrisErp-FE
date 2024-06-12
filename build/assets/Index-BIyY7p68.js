import{_ as x,u as S,L as C,e as P,T as R,c as T,b as c,a,w as t,F as V,r as d,o as u,f as r,t as o,g as L,h as N}from"./index-CNFcT6hl.js";import{D as E}from"./Table-DC0ZRuMS.js";const F={data(){return{name:"Admins",adminStore:S(),user:JSON.parse(C.get("auth.client")||"{}"),globals:P(),receives:{},searchInput:"",isLoading:!1,confirmDialog:!1,rowToSend:null,selectedProviderError:!1,selectedProvider:null,headers:[{title:"S/N",key:"sn"},{title:"Sender Amount",key:"sender_amount"},{title:"Receiver Amount",key:"receiver_amount"},{title:"Ex. Rate",key:"exchange_rate"},{title:"Re. Email",key:"recipient_email"},{title:"Re. Name",key:"recipient_full_name"},{title:"Cust. Email",key:"customer_email"},{title:"Cust. Name",key:"customer_full_name"},{title:"Description",key:"notes"},{title:"Status",key:"status"},{title:"Trx. Ref",key:"transaction_ref"},{title:"Trx. No.",key:"transaction_number"},{title:"#",key:"action"}]}},components:{TextField:R,DataTable:E},watch:{"globals.filters":{handler:function(i){(this.globals.activeTab==="Admins"||this.globals.activeTab===null)&&this.adminStore.fetchReceive(i)},deep:!0}},created(){this.adminStore.fetchReceive(),this.adminStore.fetchProviders()},methods:{confirmSendMoney(i){this.rowToSend=i,this.confirmDialog=!0},handleRowClick(i){console.log("Row clicked:",i)},handlePageChange(i){this.adminStore.fetchReceive(this.globals.filters,i)},async sendMoney(i){if(this.selectedProviderError=!1,this.selectedProvider==null){this.selectedProviderError=!0;return}this.isLoading=!0;const s={currency_symbol:i.receiver_currency.currency_symbol,transaction_id:i.id,payment_provider_id:this.selectedProvider,recipient_detail:i.recipient_detail,customer_detail:i.customer_detail,amount:parseFloat(i.sender_amount),description:i.notes||"",api_key:this.user.api_key,transaction_number:i.transaction_number||"",payment_number:i.provider_request_response.senderMemo||""};this.confirmDialog=!1,await this.adminStore.fullfil(s),this.adminStore.fetchReceive(),this.isLoading=!1}}},D={class:"tw-font-bold"},A={class:"tw-font-bold"},B={class:"tw-overflow-x-auto"},M={class:"tw-overflow-x-auto"},z={class:"tw-overflow-x-auto"},I={class:"tw-overflow-x-auto"},U={class:"tw-overflow-x-auto"},j={class:"tw-px-4"};function q(i,s,G,J,l,m){const _=d("v-btn"),f=d("v-chip"),v=d("DataTable"),p=d("v-card-title"),h=d("v-card-text"),g=d("v-select"),y=d("v-card-actions"),b=d("v-card"),k=d("v-dialog");return u(),T(V,null,[c("div",null,[c("div",{class:"tw-flex tw-place-content-end",onClick:s[0]||(s[0]=e=>l.adminStore.fetchReceive())},[a(_,{class:"tw-self-end",icon:"mdi-reload",flat:""})]),a(v,{loading:l.adminStore.receivesLoading,headers:l.headers,paginationData:l.adminStore.receives,onRowClick:m.handleRowClick,onPageChange:m.handlePageChange},{"td-sender_amount":t(({row:e})=>{var n;return[r(o((n=e.sender_currency)==null?void 0:n.currency_symbol)+" ",1),c("span",D,o(e==null?void 0:e.sender_amount),1)]}),"td-receiver_amount":t(({row:e})=>{var n;return[r(o((n=e.receiver_currency)==null?void 0:n.currency_symbol)+" ",1),c("span",A,o(e==null?void 0:e.receiver_amount),1)]}),"td-exchange_rate":t(({row:e})=>[r(o(parseFloat(e==null?void 0:e.exchange_rate).toFixed(2)),1)]),"td-recipient_email":t(({row:e})=>{var n;return[r(o((n=e.recipient_detail)==null?void 0:n.email),1)]}),"td-recipient_full_name":t(({row:e})=>{var n;return[r(o((n=e.recipient_detail)==null?void 0:n.full_name),1)]}),"td-customer_email":t(({row:e})=>{var n;return[c("div",B,o((n=e.customer_detail)==null?void 0:n.email),1)]}),"td-customer_full_name":t(({row:e})=>{var n;return[c("div",M,o((n=e.customer_detail)==null?void 0:n.full_name),1)]}),"td-description":t(({row:e})=>[c("div",z,o(e==null?void 0:e.notes),1)]),"td-status":t(({row:e})=>[a(f,{size:"small",color:e.status==="completed"?"#065F46":"#991B1B",class:"tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize"},{default:t(()=>[r(o(e==null?void 0:e.status),1)]),_:2},1032,["color"])]),"td-transaction_ref":t(({row:e})=>[c("div",I,o(e==null?void 0:e.transaction_ref),1)]),"td-transaction_number":t(({row:e})=>[c("div",U,o(e==null?void 0:e.transaction_number),1)]),"td-action":t(({row:e})=>{var n;return[((n=e==null?void 0:e.status)==null?void 0:n.toLowerCase())=="completed"&&!(e!=null&&e.fulfilled)?(u(),L(_,{key:0,onClick:O=>m.confirmSendMoney(e),loading:l.isLoading,color:"primary"},{default:t(()=>[r("Fulfil")]),_:2},1032,["onClick","loading"])):N("",!0)]}),_:1},8,["loading","headers","paginationData","onRowClick","onPageChange"])]),a(k,{modelValue:l.confirmDialog,"onUpdate:modelValue":s[4]||(s[4]=e=>l.confirmDialog=e),"max-width":"400"},{default:t(()=>[a(b,null,{default:t(()=>[a(p,null,{default:t(()=>[r("Confirmation")]),_:1}),a(h,null,{default:t(()=>[r(" Are you sure you want to confirm money sent? ")]),_:1}),c("div",j,[a(g,{"error-messages":"Please select a Provider",error:l.selectedProviderError,modelValue:l.selectedProvider,"onUpdate:modelValue":s[1]||(s[1]=e=>l.selectedProvider=e),items:l.adminStore.providers,"item-value":"id","item-title":"name",label:"Select Currency",variant:"solo",height:"20px",width:"100%",class:"tw-mb-0"},null,8,["error","modelValue","items"])]),a(y,null,{default:t(()=>[a(_,{color:"error",text:"",onClick:s[2]||(s[2]=e=>l.confirmDialog=!1)},{default:t(()=>[r("Cancel")]),_:1}),a(_,{color:"primary",onClick:s[3]||(s[3]=e=>m.sendMoney(l.rowToSend)),loading:l.isLoading},{default:t(()=>[r("Continue")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}const Q=x(F,[["render",q]]);export{Q as default};
