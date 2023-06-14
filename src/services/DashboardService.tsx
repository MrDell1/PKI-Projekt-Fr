import { QueryFunction } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { baseURL, SessionService } from "./SessionService";

export type DatabaseDetail = {
  name: string;
  tables: [
    {
      tableName: string;
    }
  ];
};

export type Row = {
  cells: [
    {
      columnName: string;
      value: string;
    }
  ];
};

type DatabaseNameKey = ["databaseName", string] | ["databaseName"];
type TableKey = ["table", string] | ["table"];

export type DatabaseService = {
  tableKey: (args?: string) => TableKey;
  databaseDetailKey: (args?: string) => DatabaseNameKey;
  getDatabaseDetail: QueryFunction<DatabaseDetail, DatabaseNameKey>;
  getTableValues: QueryFunction<Row[], TableKey>;
  sendSQLRequest: (request: string) => Promise<void>;
};

export type DashboardServiceValue =
  | {
      isInitialize: false;
    }
  | {
      isInitialize: true;
      value: DatabaseService;
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
  const context = useContext(SessionService);
  const value = useMemo<DashboardServiceValue>(() => {
    if (context.status !== "auth") {
      return { isInitialize: false };
    }

    return {
      isInitialize: true,
      value: {
        tableKey: (args) => {
          return args ? ["table", args] : ["table"];
        },
        databaseDetailKey: (args) => {
          return args ? ["databaseName", args] : ["databaseName"];
        },
        getDatabaseDetail: async ({ queryKey }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [, arg] = queryKey;
          const databaseNameResponse = await context.value.fetcher(
            `${baseURL}/resources/databaseName`
          );
          const databaseNameResult = await databaseNameResponse.json();
          if (!databaseNameResponse.ok) {
            if (databaseNameResult.error.name === "TokenExpiredError") {
              context.value.signOut();
            }
            throw new Error(databaseNameResult.error);
          }
          const tablesNamesResponse = await context.value.fetcher(
            `${baseURL}/resources/tablesNames`
          );
          const tablesNamesResult = await tablesNamesResponse.json();
          if (!tablesNamesResponse.ok) {
            throw new Error(tablesNamesResult.error);
          }
          const databaseDetail: DatabaseDetail = {
            name: databaseNameResult.name,
            tables: tablesNamesResult,
          };
          return databaseDetail;
        },

        getTableValues: async ({ queryKey }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [, arg] = queryKey;
          const response = await context.value.fetcher(
            `${baseURL}/resources/SQLRequest?request=${arg}`
          );
          const result = await response.json();
          if (!response.ok) {
            if (result.error.name === "TokenExpiredError") {
              context.value.signOut();
            }
            throw new Error(result.error);
          }

          const table = result.flatMap(
            (resultRow: { [s: string]: unknown } | ArrayLike<unknown>) => {
              const cells = [];
              for (const [key, value] of Object.entries(resultRow)) {
                cells.push({ columnName: key, value: value });
              }
              return { cells };
            }
          );

          return table;
        },
        sendSQLRequest: async (request) => {
          const response = await context.value.fetcher(
            `${baseURL}/resources/SQLRequest?request=${request}`
          );
          const result = await response.json();
          if (!response.ok) {
            if (result.error.name === "TokenExpiredError") {
              context.value.signOut();
            }
            throw new Error(result.error);
          }

          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return (
    <DashboardService.Provider value={value}>
      {children}
    </DashboardService.Provider>
  );
};
