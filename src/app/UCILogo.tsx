import cn from "classnames";

export interface UCILogoProps {
  size?: "small" | "large";
}

const UCILogo = ({ size = "large" }: UCILogoProps) => {
  return (
    <div
      className={cn(
        "flex items-center text-current",
        size === "small" ? "gap-2" : "gap-4"
      )}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 110 75"
        fill="currentColor"
        className={size === "small" ? "w-8" : "w-16"}
      >
        <g>
          <path
            d="M0,40.26V14.995h12.6v25.008c0,6.493,3.278,9.579,8.293,9.579c5.079,0,8.358-2.957,8.358-9.258V14.995
			h12.601v24.943c0,14.465-8.294,20.894-21.087,20.894C8.035,60.832,0,54.339,0,40.26z"
          />
          <path
            d="M47.893,37.625v-0.128c0-13.115,10.029-23.4,23.659-23.4c9.192,0,15.106,3.857,19.092,9.321l-9.385,7.265
			c-2.573-3.149-5.53-5.272-9.836-5.272c-6.301,0-10.735,5.401-10.735,11.958v0.129c0,6.75,4.435,12.02,10.735,12.02
			c4.692,0,7.457-2.186,10.158-5.462l9.385,6.685c-4.244,5.851-9.965,10.157-19.864,10.157
			C58.243,60.896,47.893,51.06,47.893,37.625z"
          />
          <path d="M97.971,14.995h12.472v45H97.971V14.995z" />
        </g>
      </svg>
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "text-lg leading-5 text-current sm:inline-block",
            size === "small" ? "font-normal" : "font-semibold"
          )}
        >
          WebReg
        </span>
        <span
          className={cn(
            "font-light leading-5 text-current",
            size === "small" ? "hidden" : "block"
          )}
        >
          University Registrar
        </span>
      </div>
    </div>
  );
};

export default UCILogo;
