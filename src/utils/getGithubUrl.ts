export const getGithubUrl = () => {
  const rootUrl = `https://github.com/login/oauth/authorize`;

  const options = {
    client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID,
    scope: "user:email",
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
