import React from 'react'
import { getLanguages } from '../../i18n';
import actions from '@modules/layout/layoutActions';
function I18nFlags() {
    const doChangeLanguage = (language) => {
        actions.doChangeLanguage(language);
      };
  return (
    <div className="bottom__signin">
    <div style={{ cursor: "pointer" }}     onClick={() => doChangeLanguage('en')}>
      <img src="/public/flags/america.png" alt="" />{" "}
    </div>
    <div style={{ cursor: "pointer" }}   onClick={() => doChangeLanguage('fr')}>
      <img src="/public/flags/china.png" width={24} alt="" />{" "}
    </div>
  </div>
  )
}

export default I18nFlags