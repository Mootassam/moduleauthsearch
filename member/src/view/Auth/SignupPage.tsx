import React, { useState, useEffect } from "react";
import "./Styles/styles.css";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "@modules/shared/yup/yupFormSchemas";
import { i18n } from "../../i18n";
import { useDispatch, useSelector } from "react-redux";
import actions from "@modules/auth/authActions";
import selectors from "@modules/auth/authSelectors";
import InputFormItem from "@view/shared/form/InputFormItem";
import ButtonIcon from "@view/shared/ButtonIcon";
import I18nFlags from "@view/layout/I18nFlags";

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.email"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});
function SignupPage() {
  const dispatch = useDispatch();

  const [initialValues] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({ email, password }) => {
    dispatch(actions.doRegisterEmailAndPassword(email, password));
  };

  const loading = useSelector(selectors.selectLoading);

  return (
    <div className="app__singnin">
      <div className="singin__page">
        <div className="singin__header">
          <h1>  {i18n('auth.signup')}</h1>
          <span>{i18n('auth.signupdesc')}</span>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="singin__form">
              <div className="singin__group">
                <label htmlFor=""> {i18n('user.fields.email')}  </label>
                <InputFormItem
                  type="text"
                  name="email"
                  placeholder={i18n('user.fields.email')}
                  className="singin__input"
                  externalErrorMessage={externalErrorMessage}
                />
              </div>

              <div className="singin__group">
                <label htmlFor="">{i18n('user.fields.password')}</label>
                <InputFormItem
                  type="text"
                  name="password"
                  placeholder={i18n('user.fields.password')}
                  className="singin__input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="singin__button"
              >
                <ButtonIcon loading={loading} />

                <span>  {i18n('auth.signup')}</span>
              </button>
              <div className="singin__donthaveaccount">
                <Link to="/auth/signin" className="link-without-underline">
                  <span>
            
                     &nbsp;
                    <label htmlFor="" className="signup__link">
                    {i18n('auth.alreadyHaveAnAccount')}
                    </label>
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
        <I18nFlags />
      </div>
    </div>
  );
}

export default SignupPage;
