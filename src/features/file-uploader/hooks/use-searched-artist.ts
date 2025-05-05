import {useCallback, useRef} from "react";
import {debounce} from "lodash";
import {useGetArtistLazyQuery} from "../../../__generated__/graphql.ts";

export const useSearchedArtist = () => {
    const abortRef = useRef(new AbortController());
    const [trigger, {data, loading}] = useGetArtistLazyQuery();

    const onDebounceSearchArtist = useCallback(debounce(async (query: string) => {
        abortRef.current.abort();
        abortRef.current = new AbortController();

        await trigger({
            variables: {input: {query, type: 'artist', page: 0, perPage: 10}},
            context: {
                fetchOptions: {
                    signal: abortRef.current.signal,
                },
            }
        });
    }, 500), [trigger]);

    return {onSearch: onDebounceSearchArtist, results: data?.searchArtists?.results, isArtistsLoading: loading};
}