import toml from "toml";
import fse from "fs-extra";
import prettyjson from "prettyjson";

const fileName = "env.toml";

const options = {
  dashColor: "magenta",
  stringColor: "white",
};

(async () => {
  const str = fse.readFileSync(fileName).toString();
  const data = toml.parse(str);

  console.log(prettyjson.render(data, options));

  const azureFunctionDev = {
    FORM_RECOGNIZER_ENDPOINT: data.formRecognizer.endpoint,
    FORM_RECOGNIZER_API_KEY: data.formRecognizer.apiKey,

    GOOGLE_CLIENT_ID: data.google.app.beta.clientID,
    GOOGLE_CLIENT_SECRET: data.google.app.beta.secret,

    AZURE_TENANT_ID: data.azure.app.tenantID,
    AZURE_CLIENT_ID: data.azure.app.beta.clientID,
    AZURE_CLIENT_SECRET: data.azure.app.beta.secret,
    AZURE_REDIRECT_URL: data.azure.function.dev.url + "/api/authoutlook",
    AZURE_ORIGINAL_URL: data.frontEnd.dev.url,

    LLM_FREQUENCY_PENALTY: data.llm.frequencyPenalty,
    LLM_PRESENCE_PENALTY: data.llm.presencePenalty,
    LLM_TEMPERATURE: data.llm.temperature,
    LLM_MODEL_NAME: data.llm.modelName,
    LLM_API_KEY: data.llm.apiKey,

    SUPABASE_URL: data.supabase.beta.url,
    SUPABASE_SERVICE_KEY: data.supabase.beta.serviceKey,
  };

  fse.writeFileSync("dist/quopilotDev.json", JSON.stringify(azureFunctionDev));

  const azureFunctionBeta = [
    {
      name: "AZURE_CLIENT_ID",
      value: data.azure.app.beta.clientID,
      slotSetting: false,
    },
    {
      name: "AZURE_CLIENT_SECRET",
      value: data.azure.app.beta.secret,
      slotSetting: false,
    },
    {
      name: "AZURE_ORIGINAL_URL",
      value: data.frontEnd.beta.url,
      slotSetting: false,
    },
    {
      name: "AZURE_REDIRECT_URL",
      value: data.azure.function.beta.url + "/api/authoutlook",
      slotSetting: false,
    },
    {
      name: "AZURE_TENANT_ID",
      value: data.azure.app.tenantID,
      slotSetting: false,
    },
    {
      name: "FORM_RECOGNIZER_API_KEY",
      value: data.formRecognizer.apiKey,
      slotSetting: false,
    },
    {
      name: "FORM_RECOGNIZER_ENDPOINT",
      value: data.formRecognizer.endpoint,
      slotSetting: false,
    },
    {
      name: "GOOGLE_CLIENT_ID",
      value: data.google.app.beta.clientID,
      slotSetting: false,
    },
    {
      name: "GOOGLE_CLIENT_SECRET",
      value: data.google.app.beta.secret,
      slotSetting: false,
    },
    {
      name: "LLM_API_KEY",
      value: data.llm.apiKey,
      slotSetting: false,
    },
    {
      name: "LLM_FREQUENCY_PENALTY",
      value: data.llm.frequencyPenalty,
      slotSetting: false,
    },
    {
      name: "LLM_MODEL_NAME",
      value: data.llm.modelName,
      slotSetting: false,
    },
    {
      name: "LLM_PRESENCE_PENALTY",
      value: data.llm.presencePenalty,
      slotSetting: false,
    },
    {
      name: "LLM_TEMPERATURE",
      value: data.llm.temperature,
      slotSetting: false,
    },
    {
      name: "SUPABASE_SERVICE_KEY",
      value: data.supabase.beta.serviceKey,
      slotSetting: false,
    },
    {
      name: "SUPABASE_URL",
      value: data.supabase.beta.url,
      slotSetting: false,
    },
  ];

  fse.writeFileSync(
    "dist/quopilotBeta.json",
    JSON.stringify(azureFunctionBeta)
  );

  const frontEndLocalEnv = `VITE_APP_NAME=Quopilot
VITE_VERSION=0.1.0
VITE_GITHUB_URL=https://github.com/spryinno/quopilot-vite-2
VITE_DOC_URL=https://docusaurus.io/

VITE_SUPABASE_URL="${data.supabase.beta.url}"
VITE_SUPABASE_KEY="${data.supabase.beta.anonKey}"

# VITE_MAIL_AUTH_URL="${data.azure.function.dev.url + "/api"}"
VITE_MAIL_AUTH_URL="${data.azure.function.beta.url + "/api"}"
VITE_MAIL_API_CODE="${data.azure.function.beta.code}"

VITE_GOOGLE_AUTH_CLIENT_ID="${data.google.app.beta.clientID}"

VITE_OUTLOOK_AUTH_TENANT_ID="${data.azure.app.tenantID}"
VITE_OUTLOOK_AUTH_CLIENT_ID="${data.azure.app.beta.clientID}"

# VITE_FORMPARSER_API_ENDPOINT="${
    data.azure.function.dev.url
  }/api/formparser?code=\${VITE_MAIL_API_CODE}"
VITE_FORMPARSER_API_ENDPOINT="${
    data.azure.function.beta.url
  }/api/formparser?code=\${VITE_MAIL_API_CODE}"

VITE_CHATBOT_SERVER_URL="${data.chatbotServer.dev.url}"`;

  fse.writeFileSync("dist/quopilotViteLocal.env", frontEndLocalEnv);
})();
