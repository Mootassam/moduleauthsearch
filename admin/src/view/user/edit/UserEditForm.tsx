import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/form/userFormActions';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import userEnumerators from 'src/modules/user/userEnumerators';
import { yupResolver } from '@hookform/resolvers/yup';
import userSecteur from 'src/modules/user/userSecteur';
import userEtat from 'src/modules/user/userEtat';
import userStatus from 'src/modules/user/userStatus';
import UserAdherantAutocompleteFormItem from 'src/view/user/autocomplete/UserAdherantAutocompleteFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const schema = yup.object().shape({
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    {
      min: 1,
    },
  ),
  phoneNumber: yupFormSchemas.string(i18n('phoneNumber'), {
    max: 24,
  }),

  secteur: yupFormSchemas.enumerator(i18n('secteur'), {
    options: userSecteur.secteur,
  }),

  employeur: yupFormSchemas.string(i18n('Employeur'), {
    required: false,
  }),
  profession: yupFormSchemas.string(i18n('Profession'), {
    required: false,
  }),
  adresse: yupFormSchemas.string(i18n('adresse'), {
    required: false,
  }),
  fullName: yupFormSchemas.string(i18n('fullName'), {
    required: false,
  }),
  cin: yupFormSchemas.integer(i18n('cin'), {
    maxlength: 8,
  }),
  date_naissance: yupFormSchemas.date(
    i18n('Date Naissance'),
    {
      required: false,
    },
  ),
  etat_civil: yupFormSchemas.enumerator(
    i18n('user.fields.Etat_Civil'),
    {
      options: userEtat.Etat,
    },
  ),
  status: yupFormSchemas.enumerator(
    i18n('user.fields.status'),
    {
      options: userEnumerators.status,
    },
  ),
  lien_facebook: yupFormSchemas.string(
    i18n('Lien Facebook'),
    {
      required: false,
    },
  ),
  parrain: yupFormSchemas.relationToOne(
    i18n('user.fields.parrain'),
    {
      required: false,
    },
  ),
});

function UserEditForm(props) {
  const dispatch = useDispatch();
  // const [initialValues] = useState(() => props.user || {});
  const [initialValues] = useState(() => {
    const record = props.user || {};

    return {
      roles: record.roles[0],
      phoneNumber: record.phoneNumber,
      secteur: record.secteur,
      employeur: record.employeur,
      profession: record.profession,
      adresse: record.adresse,
      fullName: record.fullName,
      cin: record.cin,
      etat_civil: record.etat_civil,
      date_naissance: record.date_naissance
        ? moment(record.date_naissance).toDate()
        : null,
      status: record.status,
      lien_facebook: record.lien_facebook,
      parrain: record.parrain,
    };
  });
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      id: props.user.id,
      ...values,
    };
    delete data.email;
    dispatch(actions.doUpdate(data));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Row
            style={{
              paddingBottom: '10px',
            display:'grid'
            }}
          >
            <Col sm={4}>
              <div className="form-group">
                <label
                  className="col-form-label"
                  htmlFor="email"
                >
                  {i18n('user.fields.email')}
                </label>
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="email"
                  name="email"
                  value={props.user.email}
                />
              </div>
            </Col>
            <Col sm={4}>
              <SelectFormItem
                name="roles"
                label={i18n('user.fields.roles')}
                required={true}
                options={userEnumerators.roles.map(
                  (value) => ({
                    value,
                    label: i18n(`${value}`),
                  }),
                )}
              />
            </Col>
            <Col sm={4}>
            <SelectFormItem
                name="status"
                label={i18n('user.fields.status')}

                options={userEnumerators.status.map(
                  (value) => ({
                    value,
                    label: i18n(`user.status.${value}`),
                  }),
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <InputFormItem
                name="fullName"
                label={i18n('user.fields.fullName')}
                required={true}
              />
            </Col>
  
    
          </Row>



   
          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={props.saveLoading}
                iconClass="far fa-save"
              />
              &nbsp;
              {i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              disabled={props.saveLoading}
              onClick={onReset}
              type="button"
            >
              <i className="fas fa-undo"></i>
              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
                type="button"
              >
                <i className="fas fa-times"></i>
                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default UserEditForm;
