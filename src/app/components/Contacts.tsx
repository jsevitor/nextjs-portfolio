"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  icon: string;
  user: string;
  link: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch("https://dashfolio.netlify.app/api/contacts");
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
    <div className="container mx-auto px-4 my-16 md:px-0">
      <div className="flex flex-col gap-8 py-8">
        <div className="border-l-2 border-foreground pl-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[100] py-2">
            CONTATOS
          </h1>
        </div>

        <div className="flex flex-col justify-center gap-8 my-16">
          <p className="text-center">Onde me encontrar?</p>

          <div className="flex justify-center flex-wrap gap-20 my-8">
            {contacts
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="flex flex-col items-center gap-2"
                >
                  <i className={`${item.icon} text-4xl`}></i>
                  <div className="font-extralight">{item.name}</div>
                  <div className="text-xs">{item.user}</div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
