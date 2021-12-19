import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client'
import './index.css'
import "./paginas/estilos/Main.css";
import App from './App';

import ClienteApollo from './graphql/ClienteApollo';

ReactDOM.render(
    <React.StrictMode >
        <ApolloProvider client={ClienteApollo} >
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
