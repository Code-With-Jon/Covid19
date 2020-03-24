const initialState = {
   allPosts: {},
   general: {},
   'pre-diagnosis': {},
   'post-diagnosis': {},
   'personal-loss': {},
   'income-loss': {},
   'economy-outlook': {},
}

//reducer takes in state = initialState, and the action which will include a type that we are evaluating. Usually you use a switch for action types. NOTE: based on the action, the property name of the payload data will be the name of the variable passed in the action.
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "FETCH_USERS":
         return {
            ...state,
            ...action.payload,
         };
      default:
         return state;

   }
};

export default reducer;