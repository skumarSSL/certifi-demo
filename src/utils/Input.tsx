import { Eye, EyeOff } from "lucide-react";
import { memo, useState, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { type, value, placeholder, icon, onChange, onFocus, error, ...rest } =
    props;

  return (
    <div className="flex justify-center w-full h-17">
      <div
        className={`
          relative flex items-center w-80 my-3 rounded-xl px-4 py-3
          bg-gray-100
          transition-all duration-200
          ${error ? "border border-red-500" : isFocused ? "border border-primary/50 shadow-[0_0_0_2px_rgba(1,113,177,0.12)]" : "border border-transparent shadow-[0_1px_6px_rgba(0,0,0,0.06)]"}
        `}
      >
        {/* Icon */}
        {icon && (
          <div className="absolute left-1 w-9 h-9 bg-primary rounded-lg flex justify-center items-center">
            <img src={icon} alt="icon" className="w-5 h-5" />
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={() => setIsFocused(false)}
          spellCheck={false}
          className="flex-1 border-none outline-none bg-transparent text-gray-900 text-base pl-12 pr-9"
          {...rest}
        />

        {/* Password Toggle */}
        {type === "password" && value && (
          <div
            className="absolute right-1 w-9 h-9 flex justify-center items-center cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        )}
      </div>
    </div>
  );
});

export default memo(Input);
