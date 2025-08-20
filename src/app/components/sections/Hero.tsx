import { motion } from "framer-motion";
import { ButtonTalkToMe } from "../common/Buttons";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[url('/assets/bg_hero_mobile.png')] lg:bg-[url('/assets/bg_hero_light.png')] bg-cover bg-center bg-no-repeat"
    >
      <section
        className="container mx-auto h-screen pt-[64px] md:pt-[88px] flex items-center justify-center"
        id="home"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center gap-2 h-2/4 md:h-2/3 xl:h-5/6 2xl:h-3/4 p-8 lg:w-full"
        >
          <p className="font-thin text-sm lg:text-xl">
            +2 ANOS CRIANDO APLICAÇÕES WEB
          </p>
          <h1 className="text-4xl lg:text-8xl 2xl:text-9xl font-black">
            VITOR OLIVEIRA
          </h1>
          <h2 className="text-xl lg:text-3xl font-medium">
            Desenvolvedor Frontend
          </h2>
          <div className="flex flex-col mt-4 text-sm lg:text-xl font-thin">
            <p>
              Ajudo a transformar ideias em interfaces rápidas, acessíveis e
              responsivas.
            </p>
            <p>Trabalho com Next.js, React, Tailwind e Prisma.</p>
          </div>
          <div className="flex gap-4 mt-4 text-2xl text-gray">
            <button className="h-10 w-10 border flex items-center justify-center rounded-full text-gray hover:bg-accent-green hover:text-dark hover:shadow shadow-gray scale-100 hover:scale-105 hover:animate-bounce pt-0.5">
              <a href="https://github.com/jsevitor" target="_blank">
                <i className="bi bi-github"></i>
              </a>
            </button>
            <button className="h-10 w-10 border flex items-center justify-center rounded-full text-gray hover:bg-accent-green hover:text-dark hover:shadow shadow-gray scale-100 hover:scale-105 hover:animate-bounce pt-0.5">
              <a href="" target="_blank">
                <i className="bi bi-linkedin"></i>
              </a>
            </button>
            <button className="h-10 w-10 border flex items-center justify-center rounded-full text-gray hover:bg-accent-green hover:text-dark hover:shadow shadow-gray scale-100 hover:scale-105 hover:animate-bounce pt-0.5">
              <a href="" target="_blank">
                <i className="bi bi-instagram"></i>
              </a>
            </button>
          </div>

          <ButtonTalkToMe className="block w-1/2 mx-auto mt-16 lg:hidden" />
        </motion.div>
      </section>
    </motion.div>
  );
}
