import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
            <section className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">OceanClean Admin</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to manage players, matches, economy and events.
                    </p>
                </div>

                <LoginForm />
            </section>
        </main>
    )
}