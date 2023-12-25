import React, { useState, useEffect } from "react";
import "./Styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import actions from "@modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "@modules/shared/yup/yupFormSchemas";
import { i18n } from "../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "@view/shared/form/InputFormItem";
import selectors from "@modules/auth/authSelectors";
import { Link } from "react-router-dom";
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
function SigninPage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const [initialValues] = useState({
    email: "",
    password: "",
    rememberMe: true,
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

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  return (
    <div className="app__singnin">
      <div className="singin__page">
        <div className="singin__header">
          <h1> {i18n("auth.signin")}</h1>
          <span>{i18n("auth.singindesc")}</span>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="singin__form">
              <div className="singin__group">
                <label htmlFor="">{i18n("user.fields.email")} </label>
                <InputFormItem
                  type="text"
                  name="email"
                  placeholder={i18n("user.fields.email")}
                  className="singin__input"
                  externalErrorMessage={externalErrorMessage}
                />
              </div>

              <div className="singin__group">
                <label htmlFor="">{i18n("user.fields.password")}</label>
                <InputFormItem
                  type="text"
                  name="password"
                  placeholder={i18n("user.fields.password")}
                  className="singin__input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="singin__button"
              >
                <ButtonIcon loading={loading} />

                <span>{i18n("auth.signin")}</span>
              </button>
              <div className="singin__donthaveaccount">
                <Link to="/auth/signup" className="link-without-underline">
                  <span>
                    <label htmlFor="" className="signup__link">
                      {i18n("auth.createAnAccount")}
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

export default SigninPage;
