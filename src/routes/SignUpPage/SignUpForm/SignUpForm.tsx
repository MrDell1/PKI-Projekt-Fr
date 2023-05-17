import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { useFormik } from "formik";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpForm = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.signUp);
  const toast = useToast();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      rePassword: "",
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
            title: "Signed up",
            description: "Your account has been register, login to get access",
            status: "success",
          });

          navigate(paths.signIn);
        },
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
          id="username"
          name="username"
          onChange={formik.handleChange}
          placeholder="Username"
          py="3"
          textColor="white"
          type="text"
          value={formik.values.username}
        />
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
        <Input
          _placeholder={{ color: "white", opacity: "0.5" }}
          borderRadius="xl"
          h="fit-content"
          id="rePassword"
          name="rePassword"
          onChange={formik.handleChange}
          placeholder="Repeat Password"
          py="3"
          textColor="white"
          type="password"
          value={formik.values.rePassword}
        />
        <Button mt="2" size="md" type="submit" variant="secondary">
          <Text>Sign up</Text>
        </Button>
      </Flex>
    </form>
  );
};
