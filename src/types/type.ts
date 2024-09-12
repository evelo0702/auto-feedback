export interface Faqs {
  id: number;
  category_code: number;
  content: { question: string; answer: string };
}
export interface Notices {
  id: number;
  title: string;
  content: string;
  category_code: number;
}
