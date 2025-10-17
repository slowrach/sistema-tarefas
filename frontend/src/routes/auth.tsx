import { Route, Routes } from "react-router";
import { AuthPage } from "../pages/AuthPage"

export function Auth(){
   return (
      <Routes>
         <Route path="/" element={<AuthPage />} />
      </Routes>
   )
}