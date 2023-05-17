import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

const baseURL = "http://localhost:3000";

export type AuthValue = {
  email: string;
  password: string;
};

export type RegistrationArgs = {
  date?: string;
  email: string;
  password: string;
  privacyPolicy?: boolean;
  rePassword: string;
};

export type AuthService = {
  role: string;
  username: string;
  email: string;
  authorization: string;
  signOut: () => Promise<void>;
  fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
};

export type AnonService = {
  signIn: (value: AuthValue) => Promise<void>;
  oauthGoogle: (value: string) => Promise<void>;
  oauthGithub: (value: string) => Promise<void>;
  signUp: (values: RegistrationArgs) => Promise<void>;
};

export type SessionServiceValue =
  | {
      status: "loading";
    }
  | {
      status: "auth";
      value: AuthService;
    }
  | {
      status: "anon";
      value: AnonService;
    };

type SessionServiceState =
  | {
      status: "auth";
      authorization: string;
      role: string;
      username: string;
      email: string;
    }
  | {
      status: "anon";
    };

export const SessionService = createContext<SessionServiceValue>({
  status: "loading",
});

export const useAuthService = (): AuthService => {
  const context = useContext(SessionService);

  if (context.status !== "auth") {
    throw new Error("AuthService not defined");
  }

  return context.value;
};

export const useAnonService = (): AnonService => {
  const context = useContext(SessionService);
  if (context.status !== "anon") {
    throw new Error("AnonService not defined");
  }

  return context.value;
};

export const useSessionStatus = (): SessionServiceValue["status"] => {
  const context = useContext(SessionService);

  return context.status;
};

export const getSessionQueryKey = (): string[] => {
  return ["session"];
};

type Props = {
  children: ReactNode;
};

export const SessionServiceProvider = ({ children }: Props): ReactElement => {
  const client = useQueryClient();
  const { data } = useQuery(
    getSessionQueryKey(),
    (): Promise<SessionServiceState> => {
      const authorization = localStorage.getItem("authorization");
      const role = localStorage.getItem("role");
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      return Promise.resolve(
        authorization && role && username && email
          ? {
              status: "auth",
              authorization: authorization,
              role: role,
              username: username,
              email: email,
            }
          : { status: "anon" }
      );
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const value = useMemo<SessionServiceValue>(() => {
    switch (data?.status) {
      case "anon":
        return {
          status: "anon",
          value: {
            signIn: async (value) => {
              const response = await fetch(`${baseURL}/auth/signin`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
              });

              const result = await response.json();
              if (!response.ok || !result) {
                throw new Error(result.error);
              }
              localStorage.setItem("authorization", result.token);
              localStorage.setItem("role", result.user.role);
              localStorage.setItem("username", result.user.username);
              localStorage.setItem("email", result.user.email);

              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "auth",
                authorization: result.token,
                role: result.user.role,
                username: result.user.username,
                email: result.user.email,
              });
              return Promise.resolve();
            },
            oauthGoogle: async (value) => {
              const response = await fetch(
                `${baseURL}/auth/oauth/google${value}`,
                {
                  method: "GET",
                }
              );

              const result = await response.json();
              console.log(result);
              if (!response.ok || !result) {
                throw new Error(result.error);
              }
              localStorage.setItem("authorization", result.token);
              localStorage.setItem("role", result.user.role);
              localStorage.setItem("username", result.user.username);
              localStorage.setItem("email", result.user.email);

              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "auth",
                authorization: result.token,
                role: result.user.role,
                username: result.user.username,
                email: result.user.email,
              });
              return Promise.resolve();
            },
            oauthGithub: async (value) => {
              const response = await fetch(
                `https://pkilab6.azurewebsites.net/auth/oauth/github${value}`,
                {
                  method: "GET",
                }
              );

              const result = await response.json();
              console.log(result);
              if (!response.ok || !result) {
                throw new Error(result.error);
              }
              localStorage.setItem("authorization", result.token);
              localStorage.setItem("role", result.user.role);
              localStorage.setItem("username", result.user.username);
              localStorage.setItem("email", result.user.email);

              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "auth",
                authorization: result.token,
                role: result.user.role,
                username: result.user.username,
                email: result.user.email,
              });
              return Promise.resolve();
            },

            signUp: async (value) => {
              const response = await fetch(`${baseURL}/auth/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
              });
              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.error);
              }

              return result;
            },
          },
        };
      case "auth":
        return {
          status: "auth",
          value: {
            signOut: () => {
              localStorage.removeItem("authorization");
              localStorage.removeItem("role");
              localStorage.removeItem("username");
              localStorage.removeItem("email");

              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "anon",
              });
              return Promise.resolve();
            },
            fetcher: async (input, init) => {
              const authorizationToken = data?.authorization;
              if (!authorizationToken) {
                throw new Error("No authorization token");
              }

              const response = await window.fetch(input, {
                ...init,
                headers: {
                  ...init?.headers,
                  Authorization: authorizationToken,
                },
              });

              if (response.status === 401) {
                localStorage.removeItem("authorization");
                client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                  status: "anon",
                });

                throw new Error("Token timeout");
              }

              return response;
            },
            role: data.role,
            username: data.username,
            email: data.email,
            authorization: data.authorization,
          },
        };
      default:
        return { status: "loading" };
    }
  }, [data, client]);

  return (
    <SessionService.Provider value={value}>{children}</SessionService.Provider>
  );
};
