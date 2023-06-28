import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import { NotFound } from './NotFound';
import { WordVenturePrivacyPolicy } from './wordventure/PrivacyPolicy';
import { WordVentureTermsAndConditions } from './wordventure/TermsAndConditions';
import { WordVenture } from './wordventure/WordVenture';
import { SupabaseOuter } from './supabase/SupabaseOuter';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Top />} />
      <Route path="supabase_settings">
        <Route index element={<SupabaseOuter />} />
      </Route>
      <Route path="wordventure">
        <Route index element={<WordVenture />} />
        <Route path="privacy_policy" element={<WordVenturePrivacyPolicy />} />
        <Route path="terms_and_conditions" element={<WordVentureTermsAndConditions />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
