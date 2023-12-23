import invitation from '@modules/tenant/invitation/tenantInvitationReducers';
import list from '@modules/tenant/list/tenantListReducers';
import form from '@modules/tenant/form/tenantFormReducers';
import destroy from '@modules/tenant/destroy/tenantDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  invitation,
  list,
  form,
  destroy,
});
