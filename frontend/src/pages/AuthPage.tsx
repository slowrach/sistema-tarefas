import icon from "../assets/icon.png"
import { Input } from "../components/Input"

export function AuthPage(){
   return (
      <div className="h-screen w-screen bg-gray-400 flex items-center">
         <div className="bg-white m-auto rounded-md">
            <header className="flex items-center gap-2 bg-blue-900 p-6 rounded-t-md">
               <img src={icon} alt="ícone de tarefas" className="w-8" />
               <h1 className="text-white">Gerenciador de Tarefas</h1>
            </header>

            <main className="p-3 flex flex-col">
               <div className="border-b border-gray-300">
                  <Input legend="E-mail" type="e-mail" />

                  <Input legend="Senha" type="password"/>
               </div>

               <div className="flex flex-col items-center mt-3">
                  <h2 className="text-center">Ainda não possui uma conta? <br></br>Faça seu cadastro:</h2>

                  <button>Criar conta</button>
               </div>
            </main>
         </div>
      </div>
   )
}