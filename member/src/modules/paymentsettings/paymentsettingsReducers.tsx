import list from '@modules/paymentsettings/list/paymentsettingsListReducers';
import form from '@modules/paymentsettings/form/paymentsettingsFormReducers';
import view from '@modules/paymentsettings/view/paymentsettingsViewReducers';
import destroy from '@modules/paymentsettings/destroy/paymentsettingsDestroyReducers';
import importerReducer from '@modules/paymentsettings/importer/paymentsettingsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
