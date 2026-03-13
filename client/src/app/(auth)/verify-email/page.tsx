"use client";

import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldGroup} from "@/components/ui/field";
import {toast} from "sonner";
import {useVerifyEmailMutation} from "@/state/endpoints/auth-endpoints";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export type otpData = z.infer<typeof formSchema>;

const VerifyEmail = () => {
    const [verifyEmail, {isLoading}] = useVerifyEmailMutation();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
        mode: "onChange",
    });

    const handleSubmit = (data: otpData) => {
        try {
            const result = verifyEmail({
                code: data.otp,
            }).unwrap();

            console.log("Verify email success", result);
            form.reset();
            toast.success("Email verified successfully.");

            router.push("/");
        } catch (error) {
            console.log("Verify email failed", error);
        } finally {
            form.reset();
        }
    };

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Verify Email</CardTitle>
                <CardDescription>Enter the six digit code you copied from your inbox.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-verify-email" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="otp"
                            control={form.control}
                            render={({fieldState, field}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <InputOTP
                                        className="w-full"
                                        maxLength={6}
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        <InputOTPGroup className="flex w-full justify-evenly">
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    {fieldState.invalid && (
                                        <FieldError className="w-full text-center" errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center gap-4">
                <Field orientation="horizontal">
                    <Button type="submit" disabled={isLoading} className="w-full" form="form-verify-email">
                        {isLoading ? "Verifying..." : "Verify"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
};

export default VerifyEmail;
