/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type LandingPageQueryVariables = Exact<{ [key: string]: never; }>;


export type LandingPageQuery = { allFeature: Array<{ _id: string | null, title: string | null, body: string | null, visual: string | null, span: string | null, order: number | null }>, allProblem: Array<{ _id: string | null, title: string | null, body: string | null, order: number | null }>, allTestimonial: Array<{ _id: string | null, quote: string | null, name: string | null, role: string | null, company: string | null, initials: string | null, order: number | null }>, allPricingTier: Array<{ _id: string | null, name: string | null, pricePerSeat: number | null, includedSeats: number | null, annualDiscount: number | null, customPricing: boolean | null, features: Array<string | null> | null, highlighted: boolean | null, order: number | null }>, allFaqItem: Array<{ _id: string | null, question: string | null, answer: string | null, order: number | null }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const LandingPageDocument = new TypedDocumentString(`
    query LandingPage {
  allFeature(sort: {order: ASC}) {
    _id
    title
    body
    visual
    span
    order
  }
  allProblem(sort: {order: ASC}) {
    _id
    title
    body
    order
  }
  allTestimonial(sort: {order: ASC}) {
    _id
    quote
    name
    role
    company
    initials
    order
  }
  allPricingTier(sort: {order: ASC}) {
    _id
    name
    pricePerSeat
    includedSeats
    annualDiscount
    customPricing
    features
    highlighted
    order
  }
  allFaqItem(sort: {order: ASC}) {
    _id
    question
    answer
    order
  }
}
    `) as unknown as TypedDocumentString<LandingPageQuery, LandingPageQueryVariables>;