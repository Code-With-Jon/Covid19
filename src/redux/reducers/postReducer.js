const initialState = {
   isAddingPost: false,
   addPostError: false,
   addPostErrorMessage: '',
   docs: {},
   comments: {},
   general: {
      docsArray: [],
   },
   'pre-diagnosis': {
      docsArray: [],
   },
   'post-diagnosis': {
      docsArray: [],
   },
   'personal-loss': {
      docsArray: [],
   },
   'income-loss': {
      docsArray: [],
   },
   'economy-outlook': {
      docsArray: [],
   }
}

//reducer takes in state = initialState, and the action which will include a type that we are evaluating. Usually you use a switch for action types. NOTE: based on the action, the property name of the payload data will be the name of the variable passed in the action.
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "POSTADD_REQUEST":
         return {
            ...state,
            isAddingPost: true,
            addPostError: false
         };
      case "POSTADD_SUCCESS":
         return {
            ...state,
            isAddingPost: false,
         };
      case "POSTADD_FAILURE":
         return {
            ...state,
            isAddingPost: false,
            addPostError: true,
            addPostErrorMessage: action.payload,
         };
      case "FETCH_TOPIC_POSTS":
         return {
            ...state,
            [action.payload.topic]: action.payload.data,
         };
      case "FETCH_POST":
         return {
            ...state,
            docs: action.payload,
         };
      case "FETCH_COMMENTS":
         return {
            ...state,
            comments: action.payload,
         };
      default:
         return state;

   }
};

export default reducer;