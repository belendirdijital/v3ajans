"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqData } from "@/data/faq";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("1");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          label="Sıkça Sorulan Sorular"
          title="Merak Ettikleriniz"
          description="En çok sorulan sorulara kısa cevaplar."
        />
        <div className="mx-auto mt-16 max-w-3xl space-y-3">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-slate-900"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <span
                    className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-4">
                    <p className="text-slate-600">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
