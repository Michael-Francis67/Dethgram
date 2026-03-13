"use client";

import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {toast} from "sonner";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z
    .string()
    .min(8, {message: "Password must be at least 8 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"}),
});

export type loginData = z.infer<typeof formSchema>;

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<loginData>({
        resolver: zodResolver(formSchema),
        defaultValues: {email: "", password: ""},
        mode: "onChange",
    });

    const handleSubmit = (data: loginData) => {
        console.log(data);
        form.reset();
        toast.success("Form submitted successfully.");
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Login with your credentials below.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-login" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">Email Address</FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="johndoe@gmail.com"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <div className="relative">
                            <Controller
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="w-full flex justify-between items-center">
                                            <FieldLabel htmlFor="form-rhf-demo-description">Password</FieldLabel>
                                            <Link href={"/forgot-password"} className="text-blue-500 hover:underline">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <Input
                                            {...field}
                                            id="form-rhf-password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="************"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 bottom-0 right-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center gap-4">
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-login">
                        Submit
                    </Button>
                </Field>

                <p className="w-full text-center text-muted-foreground text-sm">
                    Don&apos;t have an account yet?{" "}
                    <Link href={"/signup"} className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default Login;
