import icon from "../assets/icon.svg";
import logOut from "../assets/log-out.svg";
import team from "../assets/team.svg";
import task from "../assets/task.svg";

import { Outlet } from "react-router";

export function Layout() {
  return (
    <div>
      <header className="bg-background flex items-center justify-between px-4">
        <img src={icon} alt="ícone do site" />

        <div className="flex gap-2">
          <span className="font-medium text-blue-light">Olá, Gradey</span>

          <img
            src={logOut}
            alt="ícone de deslogar"
            className="hover:cursor-pointer hover:opacity-50"
          />
        </div>
      </header>

      <div className="flex">
        <aside className="flex flex-col gap-4 p-4 bg-blue-light">
          <a href="/times"><img src={team} alt="" className="w-8" /></a>

          <img src={task} alt="" />
        </aside>

        <Outlet />
      </div>
    </div>
  );
}
