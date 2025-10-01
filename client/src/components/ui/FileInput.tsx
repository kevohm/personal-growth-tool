export const FileInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    type="file"
    {...props}
    className={`block w-full text-sm text-gray-600 
      file:mr-4 file:rounded-lg file:border-0 file:bg-green-600 
      file:px-4 file:py-2 file:text-sm file:font-medium file:text-white 
      hover:file:bg-green-700 ${props.className ?? ""}`}
  />
);