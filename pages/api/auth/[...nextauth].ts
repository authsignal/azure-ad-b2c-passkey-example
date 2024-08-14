import NextAuth from "next-auth";

const tenantId = process.env.AZURE_AD_B2C_TENANT_NAME!;

const policy = "B2C_1A_SIGNUP_SIGNIN_PASSKEY";

const issuer = `${process.env.AZURE_AD_B2C_CUSTOM_DOMAIN}/${tenantId}.onmicrosoft.com/v2.0`;

export default NextAuth({
  providers: [
    {
      id: "azure-ad-b2c",
      name: "Azure Active Directory B2C",
      type: "oauth",
      wellKnown: `${issuer}/.well-known/openid-configuration?p=${policy}`,
      idToken: true,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
      authorization: { params: { scope: "offline_access openid" } },
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
});
