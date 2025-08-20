import API_URL from "@/lib/apiConfig";
import { useEffect, useState } from "react";
import { StacksSkeleton } from "../feedback/Skeletons";
import { motion } from "framer-motion";

interface Stack {
  id: string;
  icon: string;
  name: string;
}

export default function Skills() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStacks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stacks`);
      if (!res.ok) throw new Error("Erro ao buscar stacks");
      const data = await res.json();
      setStacks(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-dark my-8">
      <motion.h3
        className="text-xl text-center font-extrabold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        HABILIDADES TÉCNICAS
      </motion.h3>

      {loading ? (
        <StacksSkeleton />
      ) : (
        <motion.div
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:gap-4 text-sm border-t border-b border-gray py-4 lg:px-8 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {stacks.map((item) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray shadow hover:text-accent-green"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <i className={`${item.icon} text-4xl lg:text-6xl`}></i>
              <p>{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
