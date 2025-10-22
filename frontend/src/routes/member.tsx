import { Route, Routes } from "react-router";
import { MemberPage } from "../pages/MemberPage";

export function Member() {
   return (
      <Routes>
         <Route path="/" element={<MemberPage />} />
      </Routes>
   )
}