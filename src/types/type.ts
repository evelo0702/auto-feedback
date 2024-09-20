export interface Faqs {
  _id?: any;
  id: number;
  category_code: number;
  content: { question: string; answer: string };
  category_name?: { eng: string; kor: string };
}
export interface Notices {
  _id?: any;
  id: number;
  title: string;
  content: string;
  category_code: number;
  category_name?: { eng: string; kor: string };
  date: string;
}

export interface Openai {
  id: number;
  title?: string;
  type: string;
  content?: { question: string; answer: string };
  newId: number;
  category_code: number;
}

export interface Contacts {
  text: string;
  category_code: number;
  date: string;
  email: string;
}

export interface Services {
  _id?: any;
  category_code: number;
  text: string;
  email: string;
  date: string;
}
