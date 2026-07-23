/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query LandingPage {\n  allFeature(sort: {order: ASC}) {\n    _id\n    title\n    body\n    visual\n    span\n    order\n  }\n  allProblem(sort: {order: ASC}) {\n    _id\n    title\n    body\n    order\n  }\n  allTestimonial(sort: {order: ASC}) {\n    _id\n    quote\n    name\n    role\n    company\n    initials\n    order\n  }\n  allPricingTier(sort: {order: ASC}) {\n    _id\n    name\n    pricePerSeat\n    includedSeats\n    annualDiscount\n    customPricing\n    features\n    highlighted\n    order\n  }\n  allFaqItem(sort: {order: ASC}) {\n    _id\n    question\n    answer\n    order\n  }\n}": typeof types.LandingPageDocument,
};
const documents: Documents = {
    "query LandingPage {\n  allFeature(sort: {order: ASC}) {\n    _id\n    title\n    body\n    visual\n    span\n    order\n  }\n  allProblem(sort: {order: ASC}) {\n    _id\n    title\n    body\n    order\n  }\n  allTestimonial(sort: {order: ASC}) {\n    _id\n    quote\n    name\n    role\n    company\n    initials\n    order\n  }\n  allPricingTier(sort: {order: ASC}) {\n    _id\n    name\n    pricePerSeat\n    includedSeats\n    annualDiscount\n    customPricing\n    features\n    highlighted\n    order\n  }\n  allFaqItem(sort: {order: ASC}) {\n    _id\n    question\n    answer\n    order\n  }\n}": types.LandingPageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LandingPage {\n  allFeature(sort: {order: ASC}) {\n    _id\n    title\n    body\n    visual\n    span\n    order\n  }\n  allProblem(sort: {order: ASC}) {\n    _id\n    title\n    body\n    order\n  }\n  allTestimonial(sort: {order: ASC}) {\n    _id\n    quote\n    name\n    role\n    company\n    initials\n    order\n  }\n  allPricingTier(sort: {order: ASC}) {\n    _id\n    name\n    pricePerSeat\n    includedSeats\n    annualDiscount\n    customPricing\n    features\n    highlighted\n    order\n  }\n  allFaqItem(sort: {order: ASC}) {\n    _id\n    question\n    answer\n    order\n  }\n}"): typeof import('./graphql').LandingPageDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
