import user from "../assets/user.svg";

export function List() {
  return (
    <ul className="flex flex-col gap-2 p-2">
      <li className="flex gap-1 items-center">
         <img src={user} alt="Ícone de user" className="w-6" />
         <span className="text-lg">Gradey</span>
      </li>

      <li className="flex gap-1 items-center">
         <img src={user} alt="Ícone de user" className="w-6" />
         <span className="text-lg">RJ Barrett</span>
      </li>
    </ul>
  );
}
