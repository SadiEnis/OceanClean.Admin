import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { getLoginErrorMessage, useLogin } from '@/features/auth/hooks/use-login'
import {
    loginSchema,
    type LoginFormValues,
} from '@/features/auth/components/login-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
    const loginMutation = useLogin()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    function onSubmit(values: LoginFormValues) {
        loginMutation.mutate(values)
    }

    const errorMessage = loginMutation.isError
        ? getLoginErrorMessage(loginMutation.error)
        : null

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="admin"
                    {...form.register('username')}
                />

                {form.formState.errors.username && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.username.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...form.register('password')}
                />

                {form.formState.errors.password && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            {loginMutation.isError && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {errorMessage ?? 'Login failed. Please check your credentials.'}
                </div>
            )}

            <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
            </Button>
        </form>
    )
}