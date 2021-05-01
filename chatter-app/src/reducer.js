//when app starts how data layer looks
export const initialState = {
  user: null,
};
//where we push info into datalayer
export const actionTypes = {
  SET_USER: "SET_USER",
};
//listening to actions - setuser action
//change user to whatever we dispatch
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
