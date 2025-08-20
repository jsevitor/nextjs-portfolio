import { useEffect, useState, useRef } from "react";
import API_URL from "@/lib/apiConfig";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface Contact {
  id: string;
  name: string;
  icon: string;
  user: string;
  link: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contacts`);
      if (!res.ok) throw new Error("Erro ao buscar projetos");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      className="py-16 bg-[url('/assets/bg.png')] bg-cover bg-top bg-no-repeat"
    >
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="container mx-auto  2xl:h-[76vh] px-4"
        id="contacts"
      >
        <div className="flex flex-col gap-8 py-8">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              CONTATOS
            </h1>
          </div>
          <div className="flex flex-col gap-8 items-center justify-center mt-4 2xl:mt-16">
            <div className="mx-auto w-[150px] h-[150px] rounded-full overflow-hidden border border-dark">
              <Image
                src="/assets/me.jpg"
                alt="Profile Picture"
                width={300}
                height={300}
                className="w-full"
              />
            </div>
            <div>
              <p className="text-center font-extrabold text-4xl lg:text-7xl">
                Vamos trabalhar juntos!
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 mt-8">
              <p className="text-center text-lg lg:text-2xl">
                Onde me encontrar?
              </p>
              <div className="w-fit mx-auto grid grid-cols-3 lg:flex justify-center flex-wrap gap-4 lg:gap-20 px-4 lg:px-16 border-t border-b border-gray py-2">
                {contacts
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <motion.button
                      className="h-24 w-24 rounded-2xl hover:border border-dark hover:scale-105 hover:bg-accent-green hover:text-dark hover:shadow transition-all duration-300"
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{ rotate: 5 }}
                    >
                      <a
                        href={item.link}
                        className="flex flex-col items-center gap-2"
                      >
                        <i className={`${item.icon} text-4xl`}></i>
                        <div>{item.name}</div>
                      </a>
                    </motion.button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
