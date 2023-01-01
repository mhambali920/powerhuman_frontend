// Helper function untuk menyimpan state Vuex ke dalam local storage
const saveState = (key, state) => {
  window.localStorage.setItem(key, JSON.stringify(state))
}
export const state = () => {
  let companyId = window.localStorage.getItem('companyId')
  return {
    sidebarOpen: false,
    companyId: companyId ? Number(companyId) : null,
  }
}

export const mutations = {
  SET_SIDEBAR_VISIBLE(state, value) {
    state.sidebarOpen = value
  },
  SET_COMPANY_ID(state, value) {
    state.companyId = value
    saveState('companyId', value)
  },
}
