import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import { NotFound } from './NotFound';
import { WordVenturePrivacyPolicy } from './wordventure/PrivacyPolicy';
import { WordVentureTermsAndConditions } from './wordventure/TermsAndConditions';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/wordventure/privacy_policy" element={<WordVenturePrivacyPolicy />} />
      <Route path="/wordventure/terms_and_conditions" element={<WordVentureTermsAndConditions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
