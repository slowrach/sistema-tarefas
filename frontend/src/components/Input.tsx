type Props = React.ComponentProps<"input"> & {
   legend: string
   type?: string
}

export function Input({ legend, type = "text", ...rest }: Props){
   return (
      <fieldset className="flex text-background font-medium focus-within:text-red-light mb-4">
         <legend className="uppercase mb-1">{legend}</legend>
         
         <input type={type} {...rest} className="border border-background outline-none focus:border-red-light focus:border-1 rounded-sm flex-1 text-gray-500 font-normal p-2" />
      </fieldset>
   )
}