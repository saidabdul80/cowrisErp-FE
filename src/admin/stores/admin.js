import axios from 'axios';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

import { useClient } from '@/stores/client';
import router from '@/router';
const useAdminStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;
    return defineStoreFunc({
        id: 'admin',
        state: () => ({
            currentUser: {
                password:'password',
                email:''
            },            
            currentAbilities: [],
            userForm: {},
            creating:false,
            usersDashboardData:[],
            dashboardLoading:true,
            sents:{},
            sentsLoading:true,
            receives:{},
            receivesLoading:true,
            providers:[],
            users: {},
            usersLoading: false,
            alert: {
                show: false,
                text: '',
                title: '',
                imgpath:null,
                cancelBtnText: '',
                confirmBtnText: '',
                loading: false,
            },
            alertPromiseResolve: null,
            accounts:[],
            account:{balance:'0.00',currency:'CAD'}
        }),

        getters: {
            currentAbilitiesCount: (state) => state.currentAbilities.length,
        },        
        actions: {
            async createAdmin(data) {     
                this.creating = true;           
                const response = await useClient().http({ method: 'post', path: '/admin', data })
                Object.keys(this.currentUser).forEach(key => {
                    this.currentUser[key]=  ''
                });
                this.creating = false;
                if(response){
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: '',
                    });
                }
            },
            async updateCurrentUser(data,id) {
                this.creating = true;     
                const response = await useClient().http({ method: 'put', path: '/admin/'+id, data })
                this.currentUser = response;
                this.creating = false;
                if(response){
                    Object.assign(this.userForm, response);
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: '',
                    });
                }
            },
            async deleteUser(id){
                const response = await useClient().http({ method: 'delete', path: '/admin/'+id })
                this.currentUser = {};
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
                router.push('/admin/users')
            },
            async fetchCurrentUser(params) {
                const response = await useClient().http({ method: 'get', path: '/admin/me', data })
                this.currentUser = response.data;
                this.userForm = response.data;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },
            async fetchUsersById(id) {
                this.usersLoading = true                
                const response = await useClient().http({ method: 'get', path: '/admin/' + id })                
                //this.currentUser2 = response.data.admin;                                                 
                this.usersLoading = false
                if(response){
                    this.currentUser = response.admin;
                }
            },
            async fetchUsersDashboard(params) {
                const response = await useClient().http({ method: 'get', path: '/users/dashboard_counts' })
                this.usersDashboardData = response
                this.dashboardLoading = false
            },
            async fetchUsers(params = null, path = null) {
                this.usersLoading = true
                const response = await useClient().http({ method: 'get', path: path || '/admin', data: params || {}, fullPath: path ? true : false })
                this.usersLoading = false
                if (response) {
                    this.users = response;
                }                
            },

            async fetchSent(params=null,path=null) {
                this.sentsLoading = true
                const response = await useClient().http({ method: 'get', path:path || '/transaction/sent',data:params||{},fullPath: path?true:false })
                this.sentsLoading = false                
                if(response){
                    this.sents = response;
                }
            },    
            async fetchReceive(params=null,path=null) {
                this.receivesLoading = true
                const response = await useClient().http({ method: 'get', path:path || '/transaction/receive',data:params||{},fullPath: path?true:false })
                this.receivesLoading = false                
                if(response){
                    this.receives = response;
                }
            },        
            async sendMoney(data) {
                const response = await useClient().http({ method: 'post', path: '/transaction/apaylo-send', data })                
                if(response){
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: '',
                    });
                    return true;
                }
                return false
            },

            async fetchUserPermissions() {
                const response = await useClient().http({ method: 'get', path: '/sents/permissions', data })
                this.currentAbilities = response.data.data;
            },

            async dashboard(type='receive'){
                const response = await useClient().http({ method: 'get', path: '/transaction/stat?type='+type })
                return response
            },

            hasAbilities(abilities) {
                return !!this.currentAbilities.find((ab) => {
                    if (ab.name === '*') return true;
                    if (typeof abilities === 'string') {
                        return ab.name === abilities;
                    }
                    return !!abilities.find((p) => ab.name === p);
                });
            },
            async fullfil(data){
                const response = await useClient().http({ method: 'post', path: '/transaction/fulfilment  ',data })
                return response
            },

            async verifyApaylo(data){
                const response = await useClient().http({ method: 'post', path: '/transaction/apaylo-receive  ',data })
                return response
            },

            async fetchProviders(){
                const response = await useClient().http({ method: 'get', path: '/provider' })
                this.providers = response;
            },
            hasAllAbilities(abilities) {
                return abilities.every((ability) =>
                    this.currentAbilities.some((ab) => ab.name === ability || ab.name === '*')
                );
            },
            async payBill(data) {
                const response = await useClient().http({ method: 'post', path: '/transaction/apaylo-paybill', data })                
                if(response){
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: '',
                    });
                    return true;
                }
                return false
            },
            async allowSendMoney(data) {
                const response = await useClient().http({ method: 'post', path: '/account/enable-allocatable-account', data })                
                if(response){
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: '',
                    });
                    return true;
                }
                return false
            },
            async bootstrap(data) {
                this.accounts = [];
                const response = await useClient().http({ method: 'get', path: '/account/allocatable-accounts/user', data })                
                if(response){
                
                    this.accounts = response
                    this.account = this.accounts?.find(item=>item.currency.currency_symbol == 'CAD')
                }
            },
            async requestTopUp(id){
                const response = await useClient().http({ method: 'get', path: '/account/request-topup/'+id })                
                if(response){
                    return true;
                }
            },
            showAlert({ text, title, cancelBtnText, confirmBtnText, loading = false, callback = ()=>{}, imgpath=null }) {
                return new Promise((resolve) => {
                  this.alert = {
                    show: true,
                    text,
                    title,
                    imgpath,
                    cancelBtnText,
                    confirmBtnText,
                    callback,
                    loading,
                  };
                
                  this.alertPromiseResolve = {callback,resolve};
                });
              },
              async handleAlertResponse(response) {
                if (this.alertPromiseResolve) {
                  if(response){
                    this.alert.loading = true;
                    await this.alertPromiseResolve.callback()
                    this.alert.loading = false;
                  }
                  setTimeout(()=>{
                    this.alertPromiseResolve.resolve(response);
                    this.alertPromiseResolve = null;  
                    this.alert.show = false; 
                  },200)
                }
              },
        },
    })();
};

export default useAdminStore;
