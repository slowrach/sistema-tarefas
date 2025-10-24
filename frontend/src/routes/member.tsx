import { Route, Routes } from "react-router";
import { Layout } from "../components/Layout";
import { MemberPage } from "../pages/MemberPage";

export function Member() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/times" element={<MemberPage />} />
      </Route>
    </Routes>
  );
}
