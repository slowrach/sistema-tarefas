import { useState } from "react";
import icon from "../assets/icon.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function AuthPage() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="h-screen w-screen bg-blue-light flex items-center justify-center">
      <div className="bg-white flex flex-col md:flex-row rounded-md md:w-full md:m-40">
        <header className="flex items-center justify-center bg-background p-6 rounded-t-md md:rounded-t-none md:rounded-l-md lg:w-[40vw]">
          <img src={icon} alt="ícone de tarefas" className="w-15" />
          <h1 className="text-white uppercase font-bold lg:text-2xl">
            Gerenciador de Tarefas
          </h1>
        </header>

        <main className="p-6 flex flex-col flex-1">
          {signUp ? (
            <>
              <div className="border p-6 rounded-md border-gray-200 pb-4 flex flex-col gap-3">
                 <div>
                   <Input legend="Nome" placeholder="Seu nome" />
                   <Input legend="E-mail" type="e-mail" placeholder="user@email.com" />
                   <Input legend="Senha" type="password" placeholder="∗∗∗∗∗∗" />
                 </div>

                 <Button>Cadastrar</Button>
              </div>

              <div className="flex flex-col items-center mt-8 mb-6 border p-6 rounded-md border-gray-200">
                <h2 className="text-center text-sm mb-3 font-medium">
                  Já possui uma conta?
                </h2>

                <Button onClick={() => setSignUp(false)}>Fazer login</Button>
              </div>
            </>
          ) : (
            <>
              <div className="border p-6 rounded-md border-gray-200 pb-4 flex flex-col gap-3">
                <div>
                  <Input
                    legend="E-mail"
                    type="e-mail"
                    placeholder="user@email.com"
                  />
                  <Input legend="Senha" type="password" placeholder="∗∗∗∗∗∗" />
                </div>

                <Button>Entrar</Button>
              </div>

              <div className="flex flex-col items-center mt-8 mb-6 border p-6 rounded-md border-gray-200">
                <h2 className="text-center text-sm mb-3 font-medium">
                  Ainda não possui uma conta? <br></br>Faça seu cadastro:
                </h2>

                <Button onClick={() => setSignUp(true)}>Criar conta</Button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
