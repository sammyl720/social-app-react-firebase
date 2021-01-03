const userReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return {
        user:null,
        profile: null,
        profile_reference: null,
        error: null,
        loading: false,
      };
    case 'SET_USER':
      return { ...state, user: action.payload};
    case 'SET_PROFILE_REF':
      return { ...state, profile_reference: action.payload};
    case 'SET_PROFILE':
      return { ...state, profile: action.payload};
    case 'SET_LOADING':
      return { ...state, loading: action.payload};
    case 'SET_ERROR':
      return { ...state, error: action.payload};
    default: return state;
  }
}

export default userReducer;