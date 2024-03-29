export const state = () => ({
  name: '',
  email: '',
  gender: '',
  age: '',
  phone: '',
  photo: '',
  role_id: '',
  role_name: '',
  team_id: '',
})

export const mutations = {
  updateName(state, payload) {
    state.name = payload
  },
  updateEmail(state, payload) {
    state.email = payload
  },
  updateGender(state, payload) {
    state.gender = payload
  },
  updateAge(state, payload) {
    state.age = payload
  },
  updatePhone(state, payload) {
    state.phone = payload
  },
  updatePhoto(state, payload) {
    state.photo = payload
  },
  updateTeamId(state, payload) {
    state.team_id = payload
  },
  updateRoleId(state, payload) {
    state.role_id = payload
  },
  updateRoleName(state, payload) {
    state.role_name = payload
  },
}

export const actions = {
  uploadPhoto({ commit }, payload) {
    commit('updatePhoto', payload)
  },
}

export const getters = {
  photo: (state) => state.photo,
}
