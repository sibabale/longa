# Longa

Monorepo containing the Longa mobile client and API server.

## Submodules

- **longa-mobile** – Expo/React Native mobile client
- **longa-server** – API server that powers the client

## Getting started

Clone with submodules:

```bash
git clone --recurse-submodules git@github.com:sibabale/longa.git
cd longa
```

If you already have a clone:

```bash
git submodule update --init --recursive
```

### Mobile client

```bash
cd longa-mobile
npm install
npx expo start
```

### API server

```bash
cd longa-server
npm install
npm run dev
```
