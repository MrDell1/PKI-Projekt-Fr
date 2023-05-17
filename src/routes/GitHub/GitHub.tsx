import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router";
import { GitHubAuth } from "./GitHubAuth/GitHubAuth";

const GitHub = (): ReactElement => {
  const status = useSessionStatus();

  if (status === "auth") {
    return <Navigate replace to={paths.resources} />;
  }
  return <GitHubAuth />;
};
export default GitHub;
