import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

export const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    uri: 'http://localhost:5189/graphql',
    cache,
    devtools: {enabled: true},
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={apolloClient}>
            <App/>
        </ApolloProvider>
    </StrictMode>,
)
