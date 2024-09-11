export interface Faqs {
  id: number;
  category: string;
  content: { question: string; answer: string };
}
export interface Notices {
  id: number;
  title: string;
  content: string;
}
