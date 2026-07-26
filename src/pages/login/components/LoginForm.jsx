import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/schemas/login-schema";
import { GoogleLoginButton } from "@/pages/login/components/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const { user, loginWithCredentials, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values) {
    try {
      await loginWithCredentials(values.email, values.password);
      toast.success("Sesión iniciada correctamente.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message ?? "Ocurrió un error al iniciar sesión.");
    }
  }

  function handleGoogleProfile(profile) {
    loginWithGoogle(profile);
    toast.success("Sesión iniciada con Google.");
    navigate("/dashboard");
  }

  function handleGoogleError(error) {
    toast.error(error.message ?? "Ocurrió un error con el login de Google.");
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bienvenido a CMS</h1>
                <p className="text-balance text-muted-foreground">
                  Ingresa tu correo y contraseña de administrador.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@ejemplo.com"
                  {...register("email")}
                />
                <FieldError errors={[errors.email].filter(Boolean)} />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>

                <Input id="password" type="password" {...register("password")} />
                <FieldError errors={[errors.password].filter(Boolean)} />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                O continua con
              </FieldSeparator>

              <Field className="grid grid-cols-1 gap-4">
                {GOOGLE_CLIENT_ID ? (
                  <GoogleLoginButton
                    onProfile={handleGoogleProfile}
                    onError={handleGoogleError}
                  />
                ) : (
                  <Button
                    variant="outline"
                    type="button"
                    disabled
                    title="Configura VITE_GOOGLE_CLIENT_ID para habilitar el login con Google"
                  >
                    <span className="">Iniciar Sesión con Google</span>
                  </Button>
                )}
              </Field>

              <FieldDescription className="text-center">
                No tienes una cuente? <a href="#">Registrase como admin</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="src/assets/login_images/login-image_result.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        Al continuar, aceptas nuestros{" "}
        <a href="#">Terminos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </FieldDescription>
    </div>
  );
}
