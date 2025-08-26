// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
 // Ensure correct import
import homeReducer from './reducers/homeReducer';

import userReducer from './userReducer';
import employerReducer from './reducers/employerReducer';
import internshipReducer from './reducers/internshipReducer';
import companyReducer from './reducers/companyReducer';
import applicationFormReducer from './reducers/applicationFormReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  
  // Add more reducers if needed

   // Make sure this key matches the one used in useSelector
  
  home:homeReducer,
  
  user: userReducer,
  employer: employerReducer,
  internship:internshipReducer,
  company:companyReducer,
  application:applicationFormReducer
  
  



});

export default rootReducer;
