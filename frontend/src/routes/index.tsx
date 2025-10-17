import { BrowserRouter } from "react-router";
import { Auth } from "./auth";

export function Routes(){
   return (
      <BrowserRouter>
         <Auth />
      </BrowserRouter>
   )
}