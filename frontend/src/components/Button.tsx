type Props = React.ComponentProps<"button">

export function Button({children, ...rest}: Props){
   return (
      <button {...rest} className="bg-background py-2 px-5 rounded-md text-white hover:opacity-80 hover:cursor-pointer focus-within:opacity-80 w-full">{children}</button>
   )
}