type EmailInput = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(input: EmailInput) {
  const provider = process.env.EMAIL_PROVIDER ?? "console";

  if (provider === "console") {
    console.info("[email:console]", { to: input.to, subject: input.subject });
    return { id: `console-${Date.now()}` };
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    if (!apiKey || !from) throw new Error("RESEND_API_KEY and EMAIL_FROM are required for the Resend provider");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, ...input }),
    });

    if (!response.ok) throw new Error(`Email provider failed with status ${response.status}`);
    return response.json() as Promise<{ id: string }>;
  }

  throw new Error(`Unsupported EMAIL_PROVIDER: ${provider}`);
}
