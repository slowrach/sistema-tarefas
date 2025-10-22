import { BrowserRouter } from "react-router";
import { Auth } from "./auth";
import { Member } from "./member";

export function Routes(){
   return (
      <BrowserRouter>
         <Member />
      </BrowserRouter>
   )
}