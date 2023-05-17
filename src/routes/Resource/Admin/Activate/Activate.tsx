import { Button, useToast } from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";

type Props = {
  id: string;
};

export const Activate = ({ id }: Props): ReactElement => {
  const authService = useAuthService();
  const toast = useToast();

  const { mutate } = useMutation((value: string) =>
    authService
      .fetcher("https://pkilab6.azurewebsites.net/resources/admin/active", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: value }),
      })
      .then((response) => response.json())
  );
  const active = () => {
    mutate(id, {
      onError: (error) => {
        toast({
          title: "Error",
          description: `${error}`,
          status: "error",
        });
      },
    });
  };
  return (
    <Button onClick={active} size="sm">
      Activate
    </Button>
  );
};
