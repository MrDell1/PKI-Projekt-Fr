import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ReactElement } from "react";

export const SignInForm = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.signIn);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values, {
        onError: (error) => {
          toast({
            title: "Error",
            description: `${error}`,
            status: "error",
          });
        },
        onSuccess: () => {
          toast({
            title: "Loged in",
            description: "Successful loged in",
            status: "success",
          })
        }
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex alignItems="center" flexDir="column" gap="4" w="96">
        <Input
          _placeholder={{ color: "white", opacity: "0.5" }}
          borderRadius="xl"
          h="fit-content"
          id="email"
          name="email"
          onChange={formik.handleChange}
          placeholder="Email"
          py="3"
          textColor="white"
          type="email"
          value={formik.values.email}
        />
        <Input
          _placeholder={{ color: "white", opacity: "0.5" }}
          borderRadius="xl"
          h="fit-content"
          id="password"
          name="password"
          onChange={formik.handleChange}
          placeholder="Password"
          py="3"
          textColor="white"
          type="password"
          value={formik.values.password}
        />
        <Button mt="2" size="md" type="submit" variant="secondary">
          <Text>Sign in</Text>
        </Button>
      </Flex>
    </form>
  );
};
