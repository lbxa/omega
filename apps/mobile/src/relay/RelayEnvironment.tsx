import * as SecureStore from "expo-secure-store";
import React, { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import type { FetchFunction, IEnvironment } from "relay-runtime";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

const fetchFn: FetchFunction = async (params, variables) => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch("http://localhost:6969/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const data = response.json();

  if (response.status === 401) {
    // Handle unauthorized error (e.g., token expired)
    await SecureStore.deleteItemAsync("accessToken");
    // You might want to redirect to login screen or refresh token here
  }

  return data;
};

function createEnvironment(): IEnvironment {
  const network = Network.create(fetchFn);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}

export const RelayEnvironment = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const environment = useMemo(() => {
    return createEnvironment();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
