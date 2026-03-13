"use client";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {toast} from "sonner";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldGroup, FieldError, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
});

export type forgotPasswordData = z.infer<typeof formSchema>;

const ForgotPassword = () => {
    const form = useForm<forgotPasswordData>({
        resolver: zodResolver(formSchema),
        defaultValues: {email: ""},
        mode: "onChange",
    });

    const handleSubmit = (data: forgotPasswordData) => {
        console.log(data);
        form.reset();
        toast.success("Form submitted successfully.");
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email address below to receive an email in your inbox for resetting your password.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-forgot-password" onSubmit={form.handleSubmit(handleSubmit)}>
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
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center gap-4">
                <Field orientation="horizontal">
                    <Button type="submit" className="w-full" form="form-forgot-password">
                        Send Reset Link
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
};

export default ForgotPassword;
