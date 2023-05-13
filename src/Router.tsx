import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import { NotFound } from './NotFound';

const Router = () => (
  // <Stack>
  //   {/* Here is the projects section for introducing my creates. */}
  //   <div>
  //     <h1>Projects</h1>
  //     <p>Here is the projects section for introducing my creates.</p>
  //   </div>
  // </Stack>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
