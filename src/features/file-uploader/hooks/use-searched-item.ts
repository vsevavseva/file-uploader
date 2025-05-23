import {useCallback, useRef, useState} from "react";
import {debounce} from "lodash";
import {
    ReleaseItem,
    useGetArtistLazyQuery,
    useGetReleasesLazyQuery
} from "../../../__generated__/graphql.ts";

export enum SearchType {
    Artist = "artist",
    Release = "release",
}

interface SearchResult {
    title: string;
}

interface SearchResponse<T> {
    searchArtists?: { results: T[] };
    searchReleases?: { results: T[] };
}

const SEARCH_CONFIG = {
    artist: {
        query: useGetArtistLazyQuery,
        getResults: (data: SearchResponse<SearchResult>) => data?.searchArtists?.results
    },
    release: {
        query: useGetReleasesLazyQuery,
        getResults: (data: SearchResponse<SearchResult>) => data?.searchReleases?.results
    }
} as const;

export const useSearchedItem = (type: SearchType) => {
    const abortRef = useRef(new AbortController());
    const [options, setOptions] = useState<Set<string>>(new Set());
    const [trigger, result] = SEARCH_CONFIG[type].query();
    const getResults = SEARCH_CONFIG[type].getResults;

    const loading = result.loading;

    const onDebounceSearch = useCallback(debounce(async (query: string) => {
        abortRef.current.abort();
        abortRef.current = new AbortController();

        const response  = await trigger({
            variables: {input: {query, type, page: 0, perPage: 10}},
            context: {
                fetchOptions: {
                    signal: abortRef.current.signal,
                },
            }
        });

        const data = getResults(response.data as SearchResponse<SearchResult>);
        setOptions(new Set(data?.map((el: ReleaseItem) => (el.title))));
    }, 500), [trigger, getResults]);

    return {onSearch: onDebounceSearch, options: Array.from(options).map(el => ({value: el, label: el})), loading};
}