import { graphql, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "@/test/mocks/server";
import { getLandingContent } from "./get-landing-content";
import { fallbackFeatures } from "./features";

const endpoint =
  "https://test-project.api.sanity.io/v2023-08-01/graphql/production/default";
const api = graphql.link(endpoint);

const liveFeature = {
  _id: "live-1",
  title: "Live feature from the CMS",
  body: "This came over the wire.",
  visual: "routing",
  span: "wide",
};

const liveFaq = {
  _id: "faq-1",
  question: "Live question?",
  answer: "Live answer.",
};

const emptyCollections = {
  allFeature: [],
  allProblem: [],
  allTestimonial: [],
  allPricingTier: [],
  allFaqItem: [],
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getLandingContent", () => {
  it("returns mapped CMS content when the query succeeds", async () => {
    server.use(
      api.query("LandingPage", () =>
        HttpResponse.json({
          data: {
            ...emptyCollections,
            allFeature: [liveFeature],
            allFaqItem: [liveFaq],
          },
        }),
      ),
    );

    const content = await getLandingContent();

    expect(content.features).toHaveLength(1);
    expect(content.features[0].title).toBe("Live feature from the CMS");
    expect(content.faqs[0].question).toBe("Live question?");
  });

  it("falls back to committed content when the request fails", async () => {
    server.use(
      api.query("LandingPage", () =>
        HttpResponse.json({ errors: [{ message: "Boom" }] }, { status: 500 }),
      ),
    );

    const content = await getLandingContent();

    expect(content.features).toEqual(fallbackFeatures);
    expect(content.faqs.length).toBeGreaterThan(0);
  });

  it("falls back per section when only some collections are empty", async () => {
    server.use(
      api.query("LandingPage", () =>
        HttpResponse.json({
          data: { ...emptyCollections, allFeature: [liveFeature] },
        }),
      ),
    );

    const content = await getLandingContent();

    expect(content.features).toHaveLength(1);
    expect(content.features[0].title).toBe("Live feature from the CMS");

    expect(content.faqs.length).toBeGreaterThan(0);
    expect(content.problems.length).toBeGreaterThan(0);
    expect(content.tiers.length).toBeGreaterThan(0);
    expect(content.testimonials.length).toBeGreaterThan(0);
  });

  it("drops malformed documents without failing the whole page", async () => {
    server.use(
      api.query("LandingPage", () =>
        HttpResponse.json({
          data: {
            ...emptyCollections,
            allFeature: [
              liveFeature,
              { ...liveFeature, _id: "bad", visual: "nope" },
            ],
          },
        }),
      ),
    );

    const content = await getLandingContent();

    expect(content.features).toHaveLength(1);
    expect(content.features[0].id).toBe("live-1");
  });
});
