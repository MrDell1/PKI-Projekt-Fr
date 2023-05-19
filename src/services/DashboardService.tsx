import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

export type DatabaseService = {
    getDatabaseName: () => Promise<string>;
    getDatabaseTables: () => Promise<void>;
    getTableValues: (tableName: string) => Promise<void>;
    sendSQLRequest: (request: string) => Promise<void>;
};

export type DashboardServiceValue =
  | {
      isInitialize: true;
      value: DatabaseService;
    }
  | {
      isInitialize: false;
    };

export const DashboardService = createContext<DashboardServiceValue>({
  isInitialize: false,
});

export const useDashboardService = (): DatabaseService => {
  const context = useContext(DashboardService);

  if (!context.isInitialize) {
    throw new Error("DatabaseService not defined");
  }

  return context.value;
};

export const getSessionQueryKey = (): string[] => {
  return ["session"];
};

type Props = {
  children: ReactNode;
};

export const DashboardServiceProvider = ({ children }: Props): ReactElement => {
  const context = useContext(DashboardService);

  const value = useMemo<DashboardServiceValue>(() => {
    switch (context.isInitialize) {
      case true:
        return {
          isInitialize: true,
          value: {},
        };

      default:
        return { isInitialize: false };
    }
  }, []);

  return (
    <DashboardService.Provider value={value}>
      {children}
    </DashboardService.Provider>
  );
};
