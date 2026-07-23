import { print } from "graphql";
import { LandingPageDocument } from "@/lib/graphql/generated/graphql";
import { graphqlClient } from "./client";

export async function fetchLandingPage() {
  return graphqlClient.request(LandingPageDocument);
}
