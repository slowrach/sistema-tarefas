import team from "../assets/team.svg"

export function MemberPage() {
  return (
    <main>
      <h1 className="flex gap-1 bg-green-light p-3 justify-center items-center">
        <img src={team} alt="Ícone de time" className="h-10" />

        <span className="text-background font-bold text-2xl">
          Toronto Raptors
        </span>
      </h1>

      <div className="m-4 border border-gray-300 text-red-light font-medium">
        <h2 className="text-lg text-center uppercase border-b border-b-gray-300">
          Members:
        </h2>

        <ul className="list-disc px-7 py-3">
          <li>Gradey Sumner</li>
          <li>Gary Temple</li>
          <li>RJ Barrett</li>
        </ul>
      </div>
    </main>
  );
}
