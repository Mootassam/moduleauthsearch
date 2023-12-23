import authActions from '@modules/auth/authActions';
import TenantService from '@modules/tenant/tenantService';
import Errors from '@modules/shared/error/errors';
import { i18n } from '../../../i18n';
import { getHistory } from '@modules/store';
import Message from '@view/shared/message';
import listActions from '@modules/tenant/list/tenantListActions';

const prefix = 'TENANT_DESTROY';

const tenantDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: tenantDestroyActions.DESTROY_STARTED,
      });

      await TenantService.destroyAll([id]);

      dispatch({
        type: tenantDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('tenant.destroy.success'));

      await dispatch(authActions.doRefreshCurrentUser());
      await dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/tenant');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: tenantDestroyActions.DESTROY_ERROR,
      });
    }
  },
};

export default tenantDestroyActions;
