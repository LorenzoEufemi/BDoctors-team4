import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AdvancedSearch from "../pages/AdvancedSearch/AdvancedSearch";
import HomePage from "../pages/HomePage/HomePage";
import SingleDoctor from "../pages/SingleDoctor/SingleDoctor";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dottori" element={<AdvancedSearch />} >
            <Route path=":slug" element={<SingleDoctor />} />
          </Route>
          <Route path="/accedi" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;