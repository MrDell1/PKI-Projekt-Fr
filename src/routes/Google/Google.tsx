import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router";
import { GoogleAuth } from "./GoogleAuth/GoogleAuth";

const Google = (): ReactElement => {
  const status = useSessionStatus();

  if (status === "auth") {
    return <Navigate replace to={paths.resources} />;
  }
  return <GoogleAuth />;
};
export default Google;
