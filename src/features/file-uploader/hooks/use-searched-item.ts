import {useCallback, useRef, useState} from "react";
import {debounce} from "lodash";
import {
    ReleaseItem,
    useGetArtistLazyQuery,
    useGetReleasesLazyQuery
} from "../../../__generated__/graphql.ts";

type SearchType = 'artist' | 'release';

export const useSearchedItem = (type: SearchType) => {
    const abortRef = useRef(new AbortController());
    const [options, setOptions] = useState<Set<string>>(new Set());
    const [triggerArtist, artistResult] = useGetArtistLazyQuery();
    const [triggerRelease, releaseResult] = useGetReleasesLazyQuery();

    const trigger = type === 'artist' ? triggerArtist : triggerRelease;
    const loading = type === 'artist' ? artistResult.loading : releaseResult.loading;

    const onDebounceSearch = useCallback(debounce(async (query: string) => {
        abortRef.current.abort();
        abortRef.current = new AbortController();

        const result = await trigger({
            variables: {input: {query, type, page: 0, perPage: 10}},
            context: {
                fetchOptions: {
                    signal: abortRef.current.signal,
                },
            }
        });

        //todo fix types
        const data = type === 'artist'
            ? result?.data?.searchArtists?.results
            : result?.data?.searchReleases?.results;

        setOptions(new Set(data?.map((el: ReleaseItem) => (el.title))));
    }, 500), [trigger, type]);

    return {onSearch: onDebounceSearch, options: Array.from(options).map(el => ({value: el, label: el})), loading};
}