import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import React, { useState } from 'react';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import TagsFormItem from 'src/view/shared/form/items/TagsFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import Calendar from 'react-calendar';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import userEnumerators from 'src/modules/user/userEnumerators';
import { yupResolver } from '@hookform/resolvers/yup';
import userSecteur from 'src/modules/user/userSecteur';
import moment from 'moment';
import userEtat from 'src/modules/user/userEtat';
import UserAdherantAutocompleteFormItem from 'src/view/user/autocomplete/UserAdherantAutocompleteFormItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const singleSchema = yup.object().shape({
  email: yupFormSchemas.email(i18n('user.fields.email')),
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    {
      // "min": 1
    },
  ),
  phoneNumber: yupFormSchemas.string(i18n('phoneNumber'), {
    // "matches": /^[0-9]/,
    max: 24,
  }),

  secteur: yupFormSchemas.enumerator(i18n('secteur'), {
    options: userSecteur.secteur,
  }),

  employeur: yupFormSchemas.string(i18n('Employeur'), {}),
  profession: yupFormSchemas.string(i18n('Profession'), {}),
  adresse: yupFormSchemas.string(i18n('adresse'), {}),
  fullName: yupFormSchemas.string(i18n('fullName'), {}),
  cin: yupFormSchemas.integer(i18n('cin'), {
    max: 8,
  }),
  date_naissance: yupFormSchemas.date(
    i18n('Date Naissance'),
    {},
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
    {},
  ),
  parrain: yupFormSchemas.relationToOne(
    i18n('user.fields.parrain'),
    {},
  ),
});
const multipleSchema = yup.object().shape({
  emails: yup
    .array()
    .label(i18n('user.fields.emails'))
    .of(
      yup
        .string()
        .transform((cv, ov) => {
          return ov === '' ? null : cv;
        })
        .email(i18n('user.validations.email'))
        .label(i18n('user.fields.email'))
        .max(255)
        .required(),
    )
    .required()
    .min(1),
  roles: yupFormSchemas.stringArray(
    i18n('user.fields.roles'),
    {
      required: false,
      // min: 1
    },
  ),
});

function UserNewForm(props) {
  const { single, saveLoading } = props;
  const record = props.user || {};

  const schema = props.single
    ? singleSchema
    : multipleSchema;

  const [initialValues] = useState(() => ({
    emails: [],
    email: '',
    roles: [],
    phoneNumber: '',
    secteur: '',
    employeur: '',
    profession: '',
    adresse: '',
    fullName: '',
    cin: '',
    date_naissance: record.date_naissance
      ? moment(record.date_naissance, 'DD-MM-YYYY').toDate()
      : null,
    etat_civil: '',
    status: [''],
    lien_facebook: '',
    parrain: '',
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });
  const onSubmit = (values) => {
    const { ...data } = values;

    data.roles[0] = 'membre';
    data.status = 'invited';
    data.parrain = data.parrain.id;

    if (data.email) {
      data.emails = [data.email];
      delete data.email;
    }

    props.onSubmit(null, data);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };
  const [value, onChange] = useState(new Date());

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Row
            style={{
              paddingBottom: '10px',
            }}
          >
            <Col sm={4}>
              <InputFormItem
                name="emails[0]"
                label={i18n('user.fields.email')}
                required={true}
              />
            </Col>
            {/* <Col sm={4}>
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
                mode="multiple"
              />
            </Col> */}
            <Col sm={4}>
              <InputFormItem
                name="fullName"
                label={i18n('user.fields.fullName')}
                required={true}
              />
            </Col>
            <Col sm={4}>
              <InputFormItem
                name="phoneNumber"
                label={i18n('user.fields.phoneNumber')}
                autoComplete="phoneNumber"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <SelectFormItem
                name="secteur"
                label={i18n('user.fields.sector')}
                options={userSecteur.secteur.map(
                  (value) => ({
                    value,
                    label: i18n(`user.sector.${value}`),
                  }),
                )}
              />
            </Col>
            <Col sm={4}>
              <InputFormItem
                name="employeur"
                label={i18n('user.fields.employer')}
              />
            </Col>
            <Col sm={4}>
              <InputFormItem
                name="profession"
                label={i18n('user.fields.profession')}
              />
            </Col>
          </Row>

          <Row
            style={{
              paddingBottom: '10px',
            }}
          >
            <Col sm={4}>
              <InputFormItem
                name="adresse"
                label={i18n('user.fields.address')}
              />
            </Col>
            <Col sm={4}>
              <InputNumberFormItem
                name="cin"
                label={i18n('C.I.N')}
              />
            </Col>
            <Col sm={4}>
              <DatePickerFormItem
                name="date_naissance"
                label={i18n('user.fields.birthDate')}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <SelectFormItem
                name="etat_civil"
                label={i18n('user.fields.maritalStatus')}
                options={userEtat.Etat.map((value) => ({
                  value,
                  label: i18n(
                    `user.maritalStatus.${value}`,
                  ),
                }))}
              />
            </Col>
            {/* <Col sm={4}>
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
            </Col> */}
            <Col sm={4}>
              <InputFormItem
                name="lien_facebook"
                label={i18n('user.fields.facebookLink')}
              />
            </Col>
            <Col sm={4}>
              <UserAdherantAutocompleteFormItem
                name="parrain"
                label={i18n('user.fields.sponsor')}
                showCreate={!props.modal}
              />
            </Col>
          </Row>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={saveLoading}
                iconClass="far fa-save"
              />

              {i18n('common.save')}
            </button>

            <button
              disabled={saveLoading}
              onClick={onReset}
              className="btn btn-light"
              type="button"
            >
              <i className="fas fa-undo"></i>

              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                className="btn btn-light"
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

export default UserNewForm;
