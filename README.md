# Authsignal's Azure AD B2C Passkey Integration Example

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and uses the Azure AD B2C Provider from [NextAuth.js](https://next-auth.js.org/) to handle authentication.

**The focus of this repository is to demonstrate how to use Authsignal with Azure AD B2C by adding steps to custom policies.**

## Links

| Resource | URL |
|----------|-----|
| Live Demo | [as-azure-ad-b2c-passkey-example.vercel.app](https://as-azure-ad-b2c-passkey-example.vercel.app) |
| Custom Policies | [./policies/](./policies/) |
| Integration Guide | [docs.authsignal.com](https://docs.authsignal.com/integrations/azure-ad-b2c/azure-ad-b2c-passkey) |

## Quick Start Guide

### Option 1: Follow the Integration Guide

Follow our step-by-step [Integration Guide](https://docs.authsignal.com/integrations/azure-ad-b2c/azure-ad-b2c-passkey) for detailed instructions on integrating Authsignal with Azure AD B2C.

### Option 2: Use Policies as a Starter Template

Use the custom policies in this repo as a starting point for your own implementation.

#### Steps

1. **Download the Azure AD B2C VS Code extension**

   Install the [Azure AD B2C extension](https://marketplace.visualstudio.com/items?itemName=AzureADB2CTools.aadb2c) from the VS Code marketplace.

2. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd azure-ad-b2c-passkey-example
   ```

3. **Copy the example config**
   ```bash
   cp appsettings.example.json appsettings.json
   ```

4. **Replace the config**

   Update `appsettings.json` with your Azure AD B2C tenant details and Authsignal configuration.

5. **Build the policies**

   Run the **B2C Build all policies** command from the VS Code extension (press `Ctrl+Shift+P` or `Cmd+Shift+P` and search for "B2C Build all policies").

6. **Store your Authsignal Tenant Secret on Azure AD B2C**

   Your Authsignal tenant secret is stored as a policy key on Azure AD B2C's Identity Experience Framework and referenced by the technical profile with the Id `B2C_1A_AuthsignalSecret`.

   Find the secret key for your tenant in the [Authsignal Portal](https://portal.authsignal.com) and add it to your Azure AD B2C tenant as a policy key via the Azure Portal.

7. **Upload the custom policies**

   Upload the generated custom policies to your Azure AD B2C tenant via the Azure Portal or using the VS Code extension.

## Manage security policy

The `B2C_1A_MANAGE_SECURITY_PASSKEY` policy in [./policies/ManageSecurity_Passkey.xml](./policies/ManageSecurity_Passkey.xml) runs an Authsignal flow for a user who is already signed in. The flow verifies the user, then shows a page where the user manages authenticators. The demo app shows a **Manage security** button after sign-in.

1. In the Authsignal Portal, create a flow with a verification step and a step that manages authenticators. In the verification step, allow every method your users can enroll, for example passkey, email OTP and SMS.
2. Set `ManageSecurityActionCode` in `appsettings.json` to the action code of that flow.
3. Build and upload the policies.
4. In the Azure AD B2C app registration, add the redirect URI `<NEXTAUTH_URL>/api/auth/callback/azure-ad-b2c-manage-security`.

The policy returns `action_state` and `correlation_id` in the ID token. The policy shows an error page if the flow fails or if the Authsignal user ID does not match the B2C user.
