import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ArtistItem = {
  __typename?: 'ArtistItem';
  title: Scalars['String']['output'];
};

export type ArtistSearchResult = {
  __typename?: 'ArtistSearchResult';
  page: Scalars['Float']['output'];
  pages: Scalars['Float']['output'];
  results: Array<ArtistItem>;
  total: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  searchArtists: ArtistSearchResult;
  searchReleases: ReleaseSearchResult;
};


export type QuerySearchArtistsArgs = {
  input: SearchInput;
};


export type QuerySearchReleasesArgs = {
  input: SearchInput;
};

export type ReleaseItem = {
  __typename?: 'ReleaseItem';
  country?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  year?: Maybe<Scalars['Float']['output']>;
};

export type ReleaseSearchResult = {
  __typename?: 'ReleaseSearchResult';
  page: Scalars['Float']['output'];
  pages: Scalars['Float']['output'];
  results: Array<ReleaseItem>;
  total: Scalars['Float']['output'];
};

export type SearchInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type GetArtistQueryVariables = Exact<{
  input: SearchInput;
}>;


export type GetArtistQuery = { __typename?: 'Query', searchArtists: { __typename?: 'ArtistSearchResult', total: number, page: number, pages: number, results: Array<{ __typename?: 'ArtistItem', title: string }> } };

export type GetReleasesQueryVariables = Exact<{
  input: SearchInput;
}>;


export type GetReleasesQuery = { __typename?: 'Query', searchReleases: { __typename?: 'ReleaseSearchResult', total: number, page: number, pages: number, results: Array<{ __typename?: 'ReleaseItem', title: string, country?: string | null, year?: number | null, format?: Array<string> | null }> } };


export const GetArtistDocument = gql`
    query getArtist($input: SearchInput!) {
  searchArtists(input: $input) {
    total
    page
    pages
    results {
      title
    }
  }
}
    `;

/**
 * __useGetArtistQuery__
 *
 * To run a query within a React component, call `useGetArtistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetArtistQuery(baseOptions: Apollo.QueryHookOptions<GetArtistQuery, GetArtistQueryVariables> & ({ variables: GetArtistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, options);
      }
export function useGetArtistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArtistQuery, GetArtistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, options);
        }
export function useGetArtistSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetArtistQuery, GetArtistQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, options);
        }
export type GetArtistQueryHookResult = ReturnType<typeof useGetArtistQuery>;
export type GetArtistLazyQueryHookResult = ReturnType<typeof useGetArtistLazyQuery>;
export type GetArtistSuspenseQueryHookResult = ReturnType<typeof useGetArtistSuspenseQuery>;
export type GetArtistQueryResult = Apollo.QueryResult<GetArtistQuery, GetArtistQueryVariables>;
export const GetReleasesDocument = gql`
    query getReleases($input: SearchInput!) {
  searchReleases(input: $input) {
    total
    page
    pages
    results {
      title
      country
      year
      format
    }
  }
}
    `;

/**
 * __useGetReleasesQuery__
 *
 * To run a query within a React component, call `useGetReleasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReleasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReleasesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetReleasesQuery(baseOptions: Apollo.QueryHookOptions<GetReleasesQuery, GetReleasesQueryVariables> & ({ variables: GetReleasesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReleasesQuery, GetReleasesQueryVariables>(GetReleasesDocument, options);
      }
export function useGetReleasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReleasesQuery, GetReleasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReleasesQuery, GetReleasesQueryVariables>(GetReleasesDocument, options);
        }
export function useGetReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReleasesQuery, GetReleasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReleasesQuery, GetReleasesQueryVariables>(GetReleasesDocument, options);
        }
export type GetReleasesQueryHookResult = ReturnType<typeof useGetReleasesQuery>;
export type GetReleasesLazyQueryHookResult = ReturnType<typeof useGetReleasesLazyQuery>;
export type GetReleasesSuspenseQueryHookResult = ReturnType<typeof useGetReleasesSuspenseQuery>;
export type GetReleasesQueryResult = Apollo.QueryResult<GetReleasesQuery, GetReleasesQueryVariables>;