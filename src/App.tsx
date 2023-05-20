import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "@routes/Router";
import { DashboardServiceProvider } from "@services/DashboardService";
import { SessionServiceProvider } from "@services/SessionService";
import { rawTheme } from "@styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

const theme = extendTheme(rawTheme);

const App = (): ReactElement => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <SessionServiceProvider>
          <DashboardServiceProvider>
            <Router />
          </DashboardServiceProvider>
        </SessionServiceProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
