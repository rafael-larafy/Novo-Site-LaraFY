"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  BarChart3,
  Building2,
  CircleDollarSign,
  FileSpreadsheet,
  LineChart,
  Users,
  type LucideIcon,
} from "lucide-react";

import { fadeUpVariants, scrollTransition, scrollViewport } from "@/lib/scroll-motion";

type Chip = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const chips: Chip[] = [
  { label: "Recuperação de créditos", href: "#solucoes", icon: CircleDollarSign },
  { label: "Planejamento tributário", href: "#solucoes", icon: BarChart3 },
  { label: "Simulador da reforma", href: "#solucoes", icon: LineChart },
  { label: "Contabilidade Lucro Real", href: "#solucoes", icon: FileSpreadsheet },
  { label: "Folha de pagamento", href: "#solucoes", icon: Users },
  { label: "Holding patrimonial", href: "#solucoes", icon: Building2 },
  { label: "M&A", href: "#solucoes", icon: ArrowLeftRight },
];

export function FlashChipsRail() {
  return (
    <section aria-label="Soluções em destaque" className="bg-white py-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        variants={fadeUpVariants}
        transition={scrollTransition}
        className="mx-auto flex max-w-[1200px] snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 lg:px-11 [&::-webkit-scrollbar]:hidden"
      >
        {chips.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="flex shrink-0 snap-start items-center gap-3 rounded-full border border-[#002e43]/10 bg-[#eef3f6] py-3 pl-3.5 pr-5 text-sm font-bold text-[#002e43] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_-16px_rgba(0,46,67,0.22)]"
          >
            <span
              className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#07e0ff]"
              aria-hidden
            >
              <Icon className="h-[18px] w-[18px] text-[#002e43]" strokeWidth={2.2} />
            </span>
            {label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
