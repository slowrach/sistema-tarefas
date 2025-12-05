import { Route, Routes } from "react-router";
import { Layout } from "../components/Layout";
import { MemberPage } from "../pages/MemberPage";
import { NotFound } from "../pages/NotFound";

export function Member() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/times" element={<MemberPage />} />

        <Route path="/tarefas" element={<MemberPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
