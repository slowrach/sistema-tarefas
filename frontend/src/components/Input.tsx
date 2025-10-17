type Props = React.ComponentProps<"input"> & {
   legend: string
   type?: string
}

export function Input({ legend, type = "text", ...rest }: Props){
   return (
      <fieldset className="flex text-gray-600 focus-within:text-blue-700 mb-4">
         <legend className="uppercase mb-1">{legend}</legend>
         
         <input type={type} {...rest} className="border border-gray-400 outline-none focus:border-blue-700 focus:border-2 rounded-sm flex-1 text-gray-700" />
      </fieldset>
   )
}