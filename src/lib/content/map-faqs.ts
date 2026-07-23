import type { Faq } from "./faqs";

type RawFaq = {
  _id?: string | null;
  question?: string | null;
  answer?: string | null;
};

export function mapFaqs(raw: (RawFaq | null)[] | null | undefined): Faq[] {
  if (!raw) return [];

  return raw.flatMap((item): Faq[] => {
    if (!item?._id || !item.question || !item.answer) return [];
    return [{ value: item._id, question: item.question, answer: item.answer }];
  });
}
