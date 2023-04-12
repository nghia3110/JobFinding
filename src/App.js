import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from 'store';
import { ApplicationNavigator } from 'translations/navigators/Application';
import './translations';
import './theme/FoundationConfig';
import './theme/ComponentsConfig';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'libs';

export const App = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <ApplicationNavigator/>
            </QueryClientProvider>
        </PersistGate>
    </Provider>
);
