import form from '@modules/user/form/userFormReducers';
import view from '@modules/user/view/userViewReducers';
import { combineReducers } from 'redux';
export default combineReducers({
  form,
  view,
});
