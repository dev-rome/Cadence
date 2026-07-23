import type { Testimonial } from "./testimonials";

type RawTestimonial = {
  _id?: string | null;
  quote?: string | null;
  name?: string | null;
  role?: string | null;
  company?: string | null;
  initials?: string | null;
};

export function mapTestimonials(
  raw: (RawTestimonial | null)[] | null | undefined,
): Testimonial[] {
  if (!raw) return [];

  return raw.flatMap((item): Testimonial[] => {
    if (!item?._id || !item.quote || !item.name) return [];

    return [
      {
        id: item._id,
        quote: item.quote,
        name: item.name,
        role: item.role ?? "",
        company: item.company ?? "",
        initials: item.initials ?? item.name.slice(0, 2).toUpperCase(),
      },
    ];
  });
}
