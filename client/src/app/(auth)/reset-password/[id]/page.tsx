"use client";

import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {toast} from "sonner";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";

const formSchema = z
.object({
    password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(20, "Password must not exceed 20 characters"),
    confirmPassword: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(20, "Password must not exceed 20 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type formData = z.infer<typeof formSchema>;

const ResetPassword = () => {
    const params = useParams<{id: string}>();
    console.log(params.id);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const handleSubmit = (data: formData) => {
        console.log(data);
        form.reset();
        toast.success("Form submitted successfully.");
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Enter your new password and confirm it to reset your password.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-reset-password" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FieldGroup>
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
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-reset-password">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
};

export default ResetPassword;
