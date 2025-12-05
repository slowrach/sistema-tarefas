import teamBlue from "../assets/team-blue.svg"
import { List } from "../components/List";
import { useLocation } from "react-router";
import { Task } from "../components/Task";

export function MemberPage() {
  const location = useLocation()

  return (
    <main>
      {location.pathname === "/times" ? (
        <div>
        <h1 className="flex gap-1 bg-green-light py-3 justify-center items-center">
          <img src={teamBlue} alt="Ícone de time" className="h-10" />
          <span className="text-background font-bold text-2xl">
            Toronto Raptors
          </span>
        </h1>
        <div className="m-4 font-medium">
          <List />
        </div>
      </div>
      ) : (
        <div className="p-4 flex flex-col md:grid grid-cols-4 grid-flow-dense gap-4 items-center justify-center">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      )}
    </main>
  );
}
