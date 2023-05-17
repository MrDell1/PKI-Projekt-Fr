import { Spinner, useTimeout } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { useNavigate } from "react-router";

export const GitHubAuth = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.oauthGithub);
  const navigate = useNavigate();

  const auth = () => {
    mutate(window.location.search, {
      onError: () => {
        navigate(paths.signIn);
      },
      onSuccess: () => {
        navigate(paths.resources);
      },
    });
  };
  useTimeout(auth, 3000);
  return <Spinner size="xl" />;
};
