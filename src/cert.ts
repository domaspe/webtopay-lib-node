import { Certificate } from '@fidm/x509';

const cert = Certificate.fromPEM(
  Buffer.from(
    `-----BEGIN CERTIFICATE-----
MIIECTCCA3KgAwIBAgIBADANBgkqhkiG9w0BAQUFADCBujELMAkGA1UEBhMCTFQx
EDAOBgNVBAgTB1ZpbG5pdXMxEDAOBgNVBAcTB1ZpbG5pdXMxHjAcBgNVBAoTFVVB
QiBFVlAgSW50ZXJuYXRpb25hbDEtMCsGA1UECxMkaHR0cDovL3d3dy5tb2tlamlt
YWkubHQvYmFua2xpbmsucGhwMRkwFwYDVQQDExB3d3cubW9rZWppbWFpLmx0MR0w
GwYJKoZIhvcNAQkBFg5wYWdhbGJhQGV2cC5sdDAeFw0wOTA3MjQxMjMxMTVaFw0x
NzEwMTAxMjMxMTVaMIG6MQswCQYDVQQGEwJMVDEQMA4GA1UECBMHVmlsbml1czEQ
MA4GA1UEBxMHVmlsbml1czEeMBwGA1UEChMVVUFCIEVWUCBJbnRlcm5hdGlvbmFs
MS0wKwYDVQQLEyRodHRwOi8vd3d3Lm1va2VqaW1haS5sdC9iYW5rbGluay5waHAx
GTAXBgNVBAMTEHd3dy5tb2tlamltYWkubHQxHTAbBgkqhkiG9w0BCQEWDnBhZ2Fs
YmFAZXZwLmx0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeT23V/kNtf/hr
Nae/ZsLfRZd8E+os6HZ9CbgvB+X659kBDBq5vjMDCVkY6sicn1fcFfuotEcbhKSK
DrDAQ+DmCMm96C7A4gqCC5OqmINauxYDdbie7V9GJWnbRXDs/5Mu722f5TuOUG3H
hN/vTg8uCxIrGIYv9idhvTbDyieVCwIDAQABo4IBGzCCARcwHQYDVR0OBBYEFI1V
hRQeacLkR4OekokkQq0dFDAHMIHnBgNVHSMEgd8wgdyAFI1VhRQeacLkR4Oekokk
Qq0dFDAHoYHApIG9MIG6MQswCQYDVQQGEwJMVDEQMA4GA1UECBMHVmlsbml1czEQ
MA4GA1UEBxMHVmlsbml1czEeMBwGA1UEChMVVUFCIEVWUCBJbnRlcm5hdGlvbmFs
MS0wKwYDVQQLEyRodHRwOi8vd3d3Lm1va2VqaW1haS5sdC9iYW5rbGluay5waHAx
GTAXBgNVBAMTEHd3dy5tb2tlamltYWkubHQxHTAbBgkqhkiG9w0BCQEWDnBhZ2Fs
YmFAZXZwLmx0ggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAwIZw
Rb2E//fmXrcO2hnUYaG9spg1xCvRVrlfasLRURzcwwyUpJian7+HTdTNhrMa0rHp
NlS0iC8hx1Xfltql//lc7EoyyIRXrom4mijCFUHmAMvR5AmnBvEYAUYkLnd/QFm5
/utEm5JsVM8LidCtXUppCehy1bqp/uwtD4b4F3c=
-----END CERTIFICATE-----`
  )
);

export default cert;