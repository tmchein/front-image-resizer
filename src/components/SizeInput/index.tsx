interface SizeInputProps {
  placeholder: string;
  type: "text" | "number";
  size?: any;
  setSize?: any;
  name: string;
}

const SizeInput = ({
  placeholder,
  type,
  size,
  setSize,
  name,
}: SizeInputProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSize({ ...size, [name]: e.target.value });
  }

  return (
    <input
      name={name}
      value={size[name]}
      onChange={handleChange}
      type={type}
      className="bg-white rounded-md h-12 w-24 text-center
        text-black text-lg px-4 outline-none focus:border-black placeholder:text-gray-500
        border-2 border-gray-300 transition-all duration-300 capitalize"
      placeholder={placeholder}
    />
  );
};

export default SizeInput;
