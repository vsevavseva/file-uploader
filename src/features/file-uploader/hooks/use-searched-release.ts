import {useCallback, useRef, useState} from "react";
import {debounce} from "lodash";
import {useGetReleasesLazyQuery} from "../../../__generated__/graphql.ts";

export const useSearchedArtist = () => {
    const abortRef = useRef(new AbortController());
    const [options, setOptions] = useState<Set<string>>(new Set());
    const [trigger, {loading}] = useGetReleasesLazyQuery();

    const onDebounceSearchRelease = useCallback(debounce(async (query: string) => {
        abortRef.current.abort();
        abortRef.current = new AbortController();

        const result = await trigger({
            variables: {input: {query, type: 'release', page: 0, perPage: 10}},
            context: {
                fetchOptions: {
                    signal: abortRef.current.signal,
                },
            }
        });

        setOptions(new Set(result?.data?.searchReleases?.results?.map(el => (el.title))));
    }, 500), [trigger]);

    return {
        onSearch: onDebounceSearchRelease,
        options: Array.from(options).map(el => ({value: el, label: el})),
        isReleaseLoading: loading
    };
}