"use client";

import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {EyeIcon, EyeOffIcon, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {toast} from "sonner";
import Link from "next/link";
import {useSignupMutation} from "@/state/endpoints/auth-endpoints";
import {useRouter} from "next/navigation";

const formSchema = z
.object({
    displayName: z
    .string()
    .min(2, {message: "Name must be at least 2 characters long"})
    .max(50, {message: "Name must be at most 50 characters long"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z
    .string()
    .min(8, {message: "Password must be at least 8 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"}),
    confirmPassword: z
    .string()
    .min(8, {message: "Password must be at least 8 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"}),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type signUpData = z.infer<typeof formSchema>;

const SignUp = () => {
    const [signup, {isLoading}] = useSignupMutation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<signUpData>({
        resolver: zodResolver(formSchema),
        defaultValues: {displayName: "", email: "", password: "", confirmPassword: ""},
        mode: "onChange",
    });

    const handleSubmit = async (data: signUpData) => {
        try {
            const result = await signup({
                displayName: data.displayName,
                email: data.email,
                password: data.password,
            }).unwrap();

            console.log("Signup success", result);
            form.reset();
            toast.success("Signup successful.");

            router.push("/verify-email");
        } catch (error) {
            console.log("Signup failed", error);
        }
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Sign up with your email and password</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-signup" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="displayName"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">Full Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-displayName"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="John Doe"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
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
                                        <FieldLabel htmlFor="form-rhf-demo-description">Password</FieldLabel>
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
                        <div className="relative">
                            <Controller
                                name="confirmPassword"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">Confirm Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
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
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                            </button>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center gap-4">
                <Field orientation="horizontal">
                    <Button type="button" disabled={isLoading} variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" disabled={isLoading} form="form-signup">
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="size-4 animate-spin" /> Loading...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </Field>

                <p className="w-full text-center text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <Link href={"/login"} className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default SignUp;
