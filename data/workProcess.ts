export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const workProcessSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Keşif & Analiz",
    description: "İhtiyaçlarınızı dinliyor, hedeflerinizi analiz ediyor ve proje kapsamını belirliyoruz.",
  },
  {
    step: 2,
    title: "Strateji & Planlama",
    description: "Detaylı proje planı oluşturuyor, zaman çizelgesi ve bütçe belirliyoruz.",
  },
  {
    step: 3,
    title: "Tasarım & Geliştirme",
    description: "Tasarımdan koda, tüm süreçte size yakın çalışarak projeyi hayata geçiriyoruz.",
  },
  {
    step: 4,
    title: "Test & Lansman",
    description: "Kapsamlı testler sonrası projenizi sorunsuz şekilde canlıya alıyoruz.",
  },
];
