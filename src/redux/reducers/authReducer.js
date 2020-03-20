const initialState = {
   isLoggingIn: false,
   isLoggingOut: false,
   isVerifying: false,
   loginError: false,
   logoutError: false,
   isSigningUp: false,
   signupError: false,
   isAuthenticated: false,
   errorMessage: '',
}

//reducer takes in state = initialState, and the action which will include a type that we are evaluating. Usually you use a switch for action types. NOTE: based on the action, the property name of the payload data will be the name of the variable passed in the action.
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "LOGIN_REQUEST":
         return {
            ...state,
            isLoggingIn: true,
            loginError: false
         };
      case "LOGIN_SUCCESS":
         return {
            ...state,
            isLoggingIn: false,
            isAuthenticated: true,
         };
      case "LOGIN_FAILURE":
         return {
            ...state,
            isLoggingIn: false,
            isAuthenticated: false,
            loginError: true,
            errorMessage: action.payload,
         };
      case "LOGOUT_REQUEST":
         return {
            ...state,
            isLoggingOut: true,
            logoutError: false
         };
      case "LOGOUT_SUCCESS":
         return {
            ...state,
            isLoggingOut: false,
            isAuthenticated: false,
         };
      case "LOGOUT_FAILURE":
         return {
            ...state,
            isLoggingOut: false,
            logoutError: true
         };
      case "DEFAULT":
         return {
            ...initialState,
         }
      case "VERIFY_REQUEST":
         return {
            ...state,
            isVerifying: true,
         };
      case "VERIFY_SUCCESS":
         return {
            ...state,
            isVerifying: false
         };
      case "SIGNUP_REQUEST":
         return {
            ...state,
            isSigningUp: true,
            signupError: false,
         }
      case "SIGNUP_SUCCESS":
         return {
            ...state,
            isSigningUp: false,
            isAuthenticated: true,
         }
      case "SIGNUP_FAILURE":
         return {
            ...state,
            isSigningUp: false,
            isAuthenticated: false,
            signupError: true,
            errorMessage: action.payload,
         }
      default:
         return state;

   }
};

export default reducer;