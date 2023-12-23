import importerActions from '@modules/shared/importer/importerActions';
import selectors from '@modules/paymentsettings/importer/paymentsettingsImporterSelectors';
import PaymentsettingsService from '@modules/paymentsettings/paymentsettingsService';
import fields from '@modules/paymentsettings/importer/paymentsettingsImporterFields';
import { i18n } from 'src/i18n';

const paymentsettingsImporterActions = importerActions(
  'PAYMENTSETTINGS_IMPORTER',
  selectors,
  PaymentsettingsService.import,
  fields,
  i18n('entities.paymentsettings.importer.fileName'),
);

export default paymentsettingsImporterActions;