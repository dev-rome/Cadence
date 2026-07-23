import type { Problem } from "./problems";

type RawProblem = {
  _id?: string | null;
  title?: string | null;
  body?: string | null;
};

export function mapProblems(
  raw: (RawProblem | null)[] | null | undefined,
): Problem[] {
  if (!raw) return [];

  return raw.flatMap((item): Problem[] => {
    if (!item?._id || !item.title || !item.body) return [];
    return [{ id: item._id, title: item.title, body: item.body }];
  });
}
