import icon from "../assets/icon.png"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export function AuthPage(){
   return (
      <div className="h-screen w-screen bg-blue-light flex items-center">
         <div className="bg-white m-auto rounded-md md:w-100">
            <header className="flex items-center justify-center bg-background p-6 rounded-t-md">
               <img src={icon} alt="ícone de tarefas" className="w-12" />
               <h1 className="text-white uppercase font-bold">Gerenciador de Tarefas</h1>
            </header>

            <main className="p-6 flex flex-col">
               <div className="border p-6 rounded-md border-gray-200 pb-4 flex flex-col gap-3">
                  <div>
                     <Input legend="E-mail" type="e-mail" placeholder="user@email.com" />
                     <Input legend="Senha" type="password" placeholder="∗∗∗∗∗∗"/>
                  </div>

                  <Button>Entrar</Button>
               </div>

               <div className="flex flex-col items-center mt-8 mb-6 border p-6 rounded-md border-gray-200">
                  <h2 className="text-center text-sm mb-3">Ainda não possui uma conta? <br></br>Faça seu cadastro:</h2>

                  <Button>Criar conta</Button>
               </div>
            </main>
         </div>
      </div>
   )
}