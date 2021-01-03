const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload};
    case 'SET_PROFILE_REF':
      return { ...state, profile_reference: action.payload}
    case 'SET_LOADING':
      return { ...state, loading: action.payload};
    case 'SET_ERROR':
      return { ...state, error: action.payload};
    default: return state;
  }
}

export default userReducer;