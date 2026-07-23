import type { Tier } from "@/lib/pricing";

type RawTier = {
  _id?: string | null;
  name?: string | null;
  pricePerSeat?: number | null;
  includedSeats?: number | null;
  annualDiscount?: number | null;
  customPricing?: boolean | null;
  features?: (string | null)[] | null;
  highlighted?: boolean | null;
};

export function mapTiers(raw: (RawTier | null)[] | null | undefined): Tier[] {
  if (!raw) return [];

  return raw.flatMap((item): Tier[] => {
    if (!item?._id || !item.name) return [];

    const pricePerSeat = item.pricePerSeat ?? 0;
    const includedSeats = item.includedSeats ?? 0;
    const annualDiscount = item.annualDiscount ?? 0;

    if (pricePerSeat < 0 || includedSeats < 0) return [];
    if (annualDiscount < 0 || annualDiscount > 1) return [];

    const features = (item.features ?? []).filter(
      (f): f is string => typeof f === "string" && f.length > 0,
    );

    return [
      {
        id: item._id,
        name: item.name,
        pricePerSeat,
        includedSeats,
        annualDiscount,
        customPricing: item.customPricing ?? false,
        features,
        highlighted: item.highlighted ?? false,
      },
    ];
  });
}
