"use client";

import Image from "next/image";
import { Sacramento } from "next/font/google";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const sacramento = Sacramento({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div className="bg-background text-center font-bold text-5xl mt-6 font-mono">
        ChromaSense
      </div>
      <div className={clsx(sacramento.className, "text-center text-4xl")}>
        By Ayman
      </div>

      <div className="relative p-8 min-h-[90vh]">
        <div className="max-w-[40vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.p
            className="text-center text-black text-9xl text-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.32, duration: 3 }}
          >
            Take Control of Your Skin
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.1, duration: 1.2 }}
        >
          <Image
            src="/model-2.webp"
            alt="ChromaSense"
            width={320}
            height={480}
            className="w-[320px] h-auto opacity-90 absolute top-[44%] left-[60%] -z-10"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 8 }}
        >
          <Image
            src="/curve-line.svg"
            alt="ChromaSense"
            width={0}
            height={0}
            className="w-[100vw] h-auto absolute top-[-30%] left-[-10%] -z-20 opacity-40"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.2, duration: 1.2 }}
        >
          <Image
            src="/model-1.jpg"
            alt="ChromaSense"
            width={420}
            height={480}
            className="w-[420px] h-auto opacity-90 absolute top-[2%] left-[20%] -z-10"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.2 }}
        >
          <Button
            size={"icon"}
            variant={"outline"}
            className="absolute top-[70%] left-[30%]"
            onClick={() => router.push("/auth/signup")}
          >
            <IconArrowRight stroke={3} size={50} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
