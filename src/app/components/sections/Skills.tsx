import API_URL from "@/lib/apiConfig";
import { useEffect, useState } from "react";
import { StacksSkeleton } from "../feedback/Skeletons";

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
    <section className="felx flex-col items-center justify-center text-dark my-8">
      <h3 className="text-xl text-center font-extrabold mb-4">
        HABILIDADES TÉCNICAS
      </h3>
      {loading ? (
        <StacksSkeleton />
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:gap-4 text-sm border-t border-b border-gray py-4 lg:px-8">
          {stacks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray shadow hover:text-accent-green"
            >
              <i className={`${item.icon} text-4xl lg:text-6xl`}></i>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
