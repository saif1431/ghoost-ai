"use client"

import * as React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/ui/themes"

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"
const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up"

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorBackground: "var(--color-bg-base)",
    colorPrimary: "var(--color-accent-primary)",
    colorText: "var(--color-text-primary)",
    colorTextSecondary: "var(--color-text-primary)",
    colorTextOnPrimary: "var(--color-text-primary)",
    colorTextOnPrimaryInverse: "var(--color-text-primary)",
    colorInputBackground: "var(--color-bg-subtle)",
    colorInputText: "var(--color-text-primary)",
    colorDanger: "var(--color-state-error)",
    colorSuccess: "var(--color-state-success)",
    colorWarning: "var(--color-state-warning)",
    colorNeutral: "var(--color-border-default)",
    fontFamily: "var(--font-geist-sans)",
    borderRadius: "var(--radius-xl)",
  },
  elements: {
    card: "text-foreground",
    header: "text-foreground",
    headerTitle: "text-foreground",
    headerSubtitle: "text-foreground/80",
    headerBackLink: "text-foreground",
    headerBackIcon: "text-foreground",
    formFieldLabel: "text-foreground",
    formFieldInput:
      "text-foreground placeholder:text-muted-foreground bg-transparent",
    formFieldInputShowPasswordButton: "text-foreground/80",
    formFieldHintText: "text-foreground/70",
    formFieldSuccessText: "text-foreground",
    formFieldErrorText: "text-foreground",
    formResendCodeLink: "text-foreground",
    alertText: "text-foreground",
    dividerText: "text-foreground/70",
    dividerLine: "bg-border",
    socialButtonsBlockButton: "text-foreground",
    socialButtonsBlockButtonText: "text-foreground",
    formButtonPrimary: "text-foreground",
    formButtonPrimaryText: "text-foreground",
    formButtonReset: "text-foreground",
    formButtonResetText: "text-foreground",
    formButtonSecondary: "text-foreground",
    formButtonSecondaryText: "text-foreground",
    footerActionText: "text-foreground/70",
    footerActionLink: "text-foreground",
    identityPreviewText: "text-foreground",
    identityPreviewEditButton: "text-foreground",
    identityPreviewTextContainer: "text-foreground",
    badge: "text-foreground",
    profileSectionTitle: "text-foreground",
    profileSectionContent: "text-foreground",
  },
}

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={clerkAppearance}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
    >
      {children}
    </ClerkProvider>
  )
}
