import icon from "../assets/icon.svg";
import logOut from "../assets/log-out.svg";
import team from "../assets/team.svg";
import task from "../assets/task.svg";
import home from "../assets/home.svg";

import { Outlet } from "react-router";
import { Link } from "./Link";
import { useLocation } from "react-router";

export function Layout() {
  const location = useLocation();

  return (
    <div className="h-svh flex flex-col">
      <header className="bg-background flex items-center justify-between px-4">
        <a href="/">
          <img src={icon} alt="ícone do site" />
        </a>

        <div className="flex gap-2">
          <span className="font-medium text-blue-light">Olá, Gradey</span>
        </div>
      </header>

      <div className="flex h-svh">
        <aside className="py-6 bg-blue-light flex flex-col justify-between items-center w-25 md:w-80">
          <div className="flex flex-col gap-4">
            <Link url="/times" legend="Meu time" icon={team} />
            <Link url="/tarefas" legend="Minhas tarefas" icon={task} />
          </div>
          <img
            src={logOut}
            alt="ícone de deslogar"
            className="hover:cursor-pointer hover:opacity-50 w-8"
          />
        </aside>

        {location.pathname === "/" ? (
          <div className="grid content-center gap-6 w-full bg-white">
            <img
              src={home}
              alt="ícone da tela principal"
              className="w-1/3 md:w-1/5 m-auto"
            />

            <p className="text-background text-lg md:text-2xl font-bold text-center">
              <span className="block md:inline">Bem-vindo ao Sistema Tarefas.</span>

              <span> Vamos começar?</span>
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
