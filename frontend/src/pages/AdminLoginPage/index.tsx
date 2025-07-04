import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  login,
  loginSchema,
  type LoginValues,
} from "@/services/auth/auth.service";
import type { ErrorResponse } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";

export default function AdminLoginPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin",
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: LoginValues) => login(data),
    onError: (err: AxiosError<ErrorResponse>) => {
      if (err.response?.status === 400) {
        return toast.error(
          `${err.response?.data.message}. Please check your email and password.`
        );
      }
      return toast.error(err.response?.data.message || "Something went wrong.");
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginValues) => {
    const response = await mutateAsync(data);

    secureLocalStorage.setItem("SESSION_KEY", response.data);

    navigate("/admin");
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm"></div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email..."
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter password..."
                              autoComplete="current-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    isLoading={isPending}
                    type="submit"
                    className="w-full">
                    Login
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
