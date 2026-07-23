import type { Feature, FeatureVisual, GridSpan } from "./features";

const VISUALS: FeatureVisual[] = [
  "routing",
  "timeline",
  "status",
  "postmortem",
  "integrations",
  "metrics",
];
const SPANS: GridSpan[] = ["wide", "standard"];

type RawFeature = {
  _id?: string | null;
  title?: string | null;
  body?: string | null;
  visual?: string | null;
  span?: string | null;
};

export function mapFeatures(
  raw: (RawFeature | null)[] | null | undefined,
): Feature[] {
  if (!raw) return [];

  return raw.flatMap((item): Feature[] => {
    if (!item?._id || !item.title || !item.body) return [];
    if (!VISUALS.includes(item.visual as FeatureVisual)) return [];
    if (!SPANS.includes(item.span as GridSpan)) return [];

    return [
      {
        id: item._id,
        title: item.title,
        body: item.body,
        visual: item.visual as FeatureVisual,
        span: item.span as GridSpan,
      },
    ];
  });
}
