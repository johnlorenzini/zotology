import Image from "next/image";
import uciSeal from "./uci-seal.svg";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="rounded-[1.5em_1.5em_0_0] relative bg-gradient-to-l from-[#0064a4] to-[#1b3d6d] shadow-[0_0_24px_12px_rgba(203,213,225,1)] w-full p-12 items-center z-50">
      {/* <div className="shadow-2xl absolute top-0 left-0 w-full h-6 bg-white rounded-bl-[1.5em] rounded-br-[1.5em] rounded-t-none">
      </div> */}
      <div className="w-full flex flex-col items-center justify-center gap-5 lg:gap-10 font-body">
        {/* UCI Seal */}
        <div className="w-24 sm:w-32">
          <Image
            src={uciSeal}
            alt=""
            height={180}
            width={180}
            className="invert brightness-0"
          />
        </div>

        <div className="w-full grid-cols-2 text-sm items-center">
          <p className="justify-center font-body text-center text-white">
            <a className="font-medium">
              {" "}
              Office of the Provost · Enrollment Management
            </a>
            <br></br>
            <a
              href="mailto://registrar@uci.edu"
              className="font-medium text-slate-50 dark:text-white-500 hover:underline"
            >
              registrar@uci.edu
            </a>{" "}
            • ph:{" "}
            <a
              href="tel:9498246124"
              className="font-medium text-slate-50 dark:text-white-500 hover:underline"
            >
              (949) 824-6124
            </a>{" "}
            • fax:{" "}
            <a
              href="tel:9498247896"
              className="font-medium text-slate-50 dark:text-white-500 hover:underline"
            >
              (949) 824-7896
            </a>
            <br></br> University of California, Irvine • 215 Aldrich Hall •
            Irvine, CA 92697-4975
          </p>

          <div className="w-full h-8 flex flex-col md:flex-row items-center text-white justify-center gap-5 lg:gap-16 font-body">
            <a
              href="https://zotology.com"
              className="font-medium text-slate-50 dark:text-white-500 hover:underline"
            >
              Made with ❤️, Zotology
            </a>
          </div>
        </div>

        {/* <div className="flex justify-between items-center gap-4">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 110 75"
            fill="currentColor"
            className="w-12 sm:w-20 text-white"
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
          <span className="text-2xl sm:text-4xl text-white font-regular">
            University Registrar
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
