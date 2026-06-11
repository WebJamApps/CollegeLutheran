[![CircleCI](https://circleci.com/gh/WebJamApps/CollegeLutheran.svg?style=svg)](https://circleci.com/gh/WebJamApps/CollegeLutheran)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/3a208c3319a68215904f/test_coverage)](https://codeclimate.com/github/WebJamApps/CollegeLutheran/test_coverage)
[![Issue Count](https://codeclimate.com/github/WebJamApps/CollegeLutheran/badges/issue_count.svg)](https://codeclimate.com/github/WebJamApps/CollegeLutheran/issues)
[![Maintainability](https://api.codeclimate.com/v1/badges/3a208c3319a68215904f/maintainability)](https://codeclimate.com/github/WebJamApps/CollegeLutheran/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/webjamapps/CollegeLutheran/badge.svg)](https://snyk.io/test/github/webjamapps/CollegeLutheran)
# CollegeLutheran
College Lutheran Church website running React

## Local Development

You will need to run web-jam-back for connection to database and authentication

### Local HTTPS (for the admin "Reconnect Facebook" button)

Most local work runs over plain http (`npm run dev` → `http://localhost:7777`).
But the admin **Reconnect Facebook** button uses the Facebook JS SDK's `FB.login`,
which refuses to run on `http://` pages. To exercise it locally, serve the dev
server over https with a self-signed cert:

1. **Generate a self-signed cert into `.certs/`** (gitignored) — one time:

   ```sh
   mkdir -p .certs && openssl req -x509 -newkey rsa:2048 -nodes \
     -keyout .certs/localhost.key -out .certs/localhost.crt \
     -days 825 -subj "/CN=localhost" \
     -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
   ```

2. **`npm run dev`** now serves `https://localhost:7777` (the `dev` script sets
   `DEV_HTTPS=true`). With no certs present it silently falls back to http, so
   this is safe for anyone who skips the setup. Accept the browser's
   self-signed-cert warning the first time.

3. **One-time external setup for the https origin:**
   - **web-jam-back** `AllowUrl` must include `https://localhost:7777` (CORS).
   - **Google OAuth client** — add `https://localhost:7777` to **both**
     Authorized JavaScript origins **and** Authorized redirect URIs, or Google
     login returns a 400 (the token-exchange `redirect_uri` must match the
     scheme the auth code was issued under).
   - **Meta app (Facebook)** — add `localhost` to **Allowed Domains for the
     JavaScript SDK** (and **App Domains**) in the Web Jam LLC app, or `FB.login`
     fails with *"JSSDK Unknown Host domain"*. The full domain list for every
     environment (including the production `web-jam.com` host) is in
     **web-jam-back's README**.

> **When you log into Facebook to Reconnect, keep BOTH the CollegeLutheran and WebJamLLC
> pages checked.** web-jam-back now serves both pages from the one "Web Jam LLC" Meta app
> (web-jam-back#799), and the Facebook consent dialog's page selection is a *replace*, not
> an add: unchecking a page you previously granted revokes the app's access to it and kills
> that page's stored token. So even though this admin only reconnects CollegeLutheran, leave
> WebJamLLC checked too (and vice-versa from the JaMmusic side).
