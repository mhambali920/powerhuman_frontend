export const state = () => ({
    sidebarOpen: false
  })
    
  export const mutations = {
    SET_SIDEBAR_VISIBLE(state,value) {
      state.sidebarOpen = value
    }
  }
  

  