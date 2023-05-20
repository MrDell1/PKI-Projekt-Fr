import { useNavigate, useParams } from "react-router-dom";

export const paths = {
  root: "/",
  public: "/public",
  signIn: "/signIn",
  signUp: "/signUp",
  dashboard: "/dashboard",
  googleAuth: "/oauthgoogle",
  tableTemplate: "/tables/:tableName",
  table: (tableName?: string) => `/tables/${tableName}`,
  notFound: "/notFound",
};

export const useTableName = (): string | undefined => {
  const navigate = useNavigate();

  const { tableName } = useParams();
  if (typeof tableName === "undefined" || tableName === "") {
    navigate(paths.notFound);
    return "";
  }
  return tableName;
};
