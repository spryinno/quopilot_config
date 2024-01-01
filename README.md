# 設定流程

## Azure

1. 設定Azure Application
   1. Authentication內設定Web Redirect URIs
      1. azure.function.dev.url + /api/authoutlook
      2. azure.function.beta.url + /api/authoutlook
   2. 設定API permissions
      1. Contacts.ReadWrite
      2. Contacts.ReadWrite.Shared
      3. Mail.Read.Shared
      4. Mail.ReadWrite
      5. Mail.Send
      6. Mail.Send.Shared
      7. offline_access
      8. openid
      9. User.Read
      10. User.Read.All
2. 設定Azure function的環境變數

## Google

1. GCP/API和服務/憑證
   1. 建立憑證, OAuth  2.0用戶端ID
   2. 已授權的重新導向URI
      1. azure.function.dev.url
      2. azure.function.beta.url