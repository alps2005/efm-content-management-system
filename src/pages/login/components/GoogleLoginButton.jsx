import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";

export function GoogleLoginButton({ onProfile, onError }) {
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "openid profile email",
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener el perfil de Google.");
        }
        const profile = await response.json();
        onProfile(profile);
      } catch (error) {
        onError(error);
      }
    },
    onError: () => {
      onError(new Error("No se pudo iniciar sesión con Google."));
    },
  });

  return (
    <Button variant="outline" type="button" onClick={() => googleLogin()}>
      <span className="">Iniciar Sesión con Google</span>
    </Button>
  );
}
