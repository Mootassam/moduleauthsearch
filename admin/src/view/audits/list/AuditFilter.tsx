import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import actions from 'src/modules/audits/list/auditsListActions';
import selectors from 'src/modules/audits/list/auditsListSelectors';
import userEnumerators from 'src/modules/user/userEnumerators';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FilterWrapper from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';

const schema = yup.object().shape({
  fullName: yupFilterSchemas.string(
    i18n('user.fields.fullName'),
  ),
  email: yupFilterSchemas.email(i18n('user.fields.email')),
  role: yupFilterSchemas.enumerator(
    i18n('user.fields.role'),
  ),
  mobile: yupFilterSchemas.integer(i18n('Mobile')),
  secteur: yupFilterSchemas.enumerator(i18n('Secteur')),
  employeur: yupFilterSchemas.string(i18n('Employeur')),
  profession: yupFilterSchemas.string(i18n('Profession')),
  adresse: yupFilterSchemas.string(i18n('Adresse')),
  cin: yupFilterSchemas.integer(i18n('C.I.N')),
  date_naissance: yupFilterSchemas.dateRange(
    i18n('date Naissance'),
  ),
  etat_civil: yupFilterSchemas.enumerator(
    i18n('Etat Civil'),
  ),
  status: yupFilterSchemas.enumerator(i18n('Status')),
  lien_facebook: yupFilterSchemas.string(
    i18n('Lien Facebook'),
  ),
  parrain: yupFilterSchemas.enumerator(i18n('Parrain')),
});

const previewRenders = {
  email: {
    label: i18n('user.fields.email'),
    render: filterRenders.generic(),
  },
  login: {
    label: i18n('user.fields.login'),
    render: filterRenders.dateRange(),
  },
  Logout: {
    label: i18n('user.fields.Logout'),
    render: filterRenders.dateRange(),
  },
};

function AuditFilter(props) {
  const emptyValues = {
    email: null,
    login: null,
    Logout: null,
    userid: props.id,
  };

  console.log('here the props id ', props.id);

  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        rawFilter,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    values.userid = props.id;
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;

  return (
    <FilterWrapper>
      <FilterPreview
        onClick={() => {
          setExpanded(!expanded);
        }}
        renders={previewRenders}
        values={rawFilter}
        expanded={expanded}
        onRemove={onRemove}
      />
      <div className="container">
        <div
          className={`collapse ${expanded ? 'show' : ''}`}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <DatePickerRangeFormItem
                    name={'login'}
                    label={i18n('user.fields.login')}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12 filter-buttons">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    <ButtonIcon
                      loading={loading}
                      iconClass="fas fa-search"
                    />
                    {i18n('common.search')}
                  </button>
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={onReset}
                    disabled={loading}
                  >
                    <ButtonIcon
                      loading={loading}
                      iconClass="fas fa-undo"
                    />
                    {i18n('common.reset')}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </FilterWrapper>
  );
}

export default AuditFilter;
