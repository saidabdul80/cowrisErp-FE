export default {
  get(key) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : null
  },

  set(key, val) {
    localStorage.setItem(key, val)
  },

  remove(key) {
    localStorage.removeItem(key)
  },
  permissions(){
    const userPermissions = JSON.parse(this.get('permissions') || "[]");
    return userPermissions;
  },
  account_type(){
   return JSON.parse(this.get('auth.user') || "[]")?.account_type;
  },
  hasPermission(permission){
    if(this.account_type() == 'super_admin'){
      return true;
    }

    return this.permissions().includes(permission)
  }
}
