type Props = React.ComponentProps<"a"> & {
   legend?: string
   icon: string
   url: string
}

export function Link({legend, icon, url}: Props) {
   return (
      <a href={url} className="bg-background p-2 rounded-lg flex gap-1 items-center hover:opacity-70 focus-within:opacity-70">
         <img src={icon} alt="botão de times" />

         <span className="uppercase text-white font-medium text-lg hidden md:block">{legend}</span>
      </a>
   )
}