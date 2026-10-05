# NEXUS TOOL — Developer Suite by Seavfou Eang
## Featuring: HONGGUO DL (红果短剧下载器)

<div align="center">

![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11%20(x64)-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![Release](https://img.shields.io/badge/Release-v1.0.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-100%25%20Free%20%7C%20No%20Ads-d4f938?style=for-the-badge&labelColor=black)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)
![Developer](https://img.shields.io/badge/Developer-Seavfou%20Eang-blueviolet?style=for-the-badge&logo=github)

<br/>

[![Download for Windows](https://img.shields.io/badge/⬇️_Direct_Download-HONGGUO.DL--1.0.0--Setup.exe-success?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/seavfoueang-coc/HONGGUA-DL/releases/download/v1.0.0/HONGGUO.DL-1.0.0-Setup.exe)

<p align="center">
  <b>High-Performance Windows Desktop Application for Parsing, Batch Downloading, Decrypting, and Archiving ByteDance Hongguo (红果短剧) Short Dramas.</b>
</p>

<p align="center">
  <a href="#download">Download</a> •
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#hosting-on-vercel">Vercel Hosting</a> •
  <a href="#about-the-developer">About Developer</a> •
  <a href="#support--donations-khqr">Support (KHQR)</a>
</p>

---

</div>

## Download

Get the official Windows executable installer:

- **Direct Download**: [**HONGGUO.DL-1.0.0-Setup.exe**](https://github.com/seavfoueang-coc/HONGGUA-DL/releases/download/v1.0.0/HONGGUO.DL-1.0.0-Setup.exe)
- **Target OS**: Windows 10 / Windows 11 (64-bit)
- **Release Version**: `v1.0.0`
- **License**: 100% Free · No Ads · Standalone

---

## Overview

**HONGGUO DL** is an open, high-speed, and clean desktop tool built specifically for archiving ByteDance's **Hongguo Free Short Drama (红果免费短剧)** series on Windows.

Unlike web-based downloaders that force users through spammy link shorteners, ad walls, or paid VIP subscriptions, HONGGUO DL operates **100% locally on your machine**:
- **Zero Ads & Zero Popups**: Clean, focused dark-mode desktop interface.
- **100% Free**: No subscription fees, token credits, or paywalls.
- **Offline First**: All parsing, stream fetching, decryption, and MP4 remuxing execute directly on your CPU/disk.

---

## Features

- **Instant Catalog Parsing**: Paste any Hongguo series share URL or web link (`hongguoduanju.com`) to instantly resolve the complete episode index (1–100+ episodes) with titles, cover posters, and video metadata.
- **Parallel Turbo Downloader**: Multi-stream concurrent segment fetcher with automatic chunk retry, failure recovery, and connection pooling.
- **On-Device Stream Decryption**: Automatic extraction of video segments, decrypting cipher payloads, and remuxing into standard MP4 files compatible with any media player (VLC, Windows Media Player, PotPlayer).
- **Smart Episode Renaming**: Files are automatically organized and named neatly: `[Series Name] - Episode 001.mp4`, `[Series Name] - Episode 002.mp4`, etc.
- **Bilingual Support**: Fully localized in **English** and **Khmer (ភាសាខ្មែរ)**.
- **Standalone Installer**: One-click install and run on Windows 10/11 x64.

---

## Architecture & Pipeline

The application pipeline is structured into five isolated, robust modules:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  URL Ingestion  │ ──> │ Metadata Parser  │ ──> │ Concurrent Fetcher  │
│ (Share / Link)  │     │ (SSR Catalog JSON│     │ (Multi-part Streams)│
└─────────────────┘     └──────────────────┘     └─────────────────────┘
                                                            │
                                                            ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  Finished MP4   │ <── │ Remux & Assembly │ <── │  Crypto Decryption  │
│  (Local Storage)│     │ (FFmpeg Engine)  │     │  (AES / Payload)    │
└─────────────────┘     └──────────────────┘     └─────────────────────┘
```

1. **Ingestion & Normalization**: Sanitizes incoming short drama share URLs, resolving 302 redirects and canonical series identifiers.
2. **Metadata Discovery**: Emulates client handshakes to parse initial server state, discovering episode IDs, bitrates (720p / 1080p), and CDN manifests.
3. **Chunked Downloader**: Pulls byte-range video chunks in parallel threads to saturate available bandwidth.
4. **Decryption Engine**: Decrypts DRM/encrypted chunk payloads directly in memory buffers.
5. **Remuxing Pipeline**: Multiplexes audio and video streams into clean, standard H.264/AAC MP4 containers without re-encoding quality loss.

---

## Hosting on Vercel

This repository is pre-configured with `vercel.json` for one-click deployment on **Vercel**:

1. Push this repository to your GitHub account: `https://github.com/seavfoueang-coc/HONGGUA-DL`.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel automatically detects the Vite framework and runs:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your site will be live instantly with global CDN and automated SPA routing rewrites!

---

## Desktop Application Usage

1. Download and run [**HONGGUO.DL-1.0.0-Setup.exe**](https://github.com/seavfoueang-coc/HONGGUA-DL/releases/download/v1.0.0/HONGGUO.DL-1.0.0-Setup.exe).
2. Open the **Hongguo Short Drama (红果短剧)** app or web player and copy the share link of your desired drama.
3. Paste the URL into HONGGUO DL and click **Parse Series (វិភាគតំណ)**.
4. Select the episodes you wish to save (or click **Select All**).
5. Choose your target output folder and click **Download (ទាញយក)**.
6. The app will download, decrypt, and save all episodes as clean `.mp4` files.

---

## About the Developer

**Seavfou Eang**
- **GitHub**: [@seavfoueang-coc](https://github.com/seavfoueang-coc)
- **Telegram**: [@eangseavfou](https://t.me/eangseavfou)
- **Role**: Software Developer & Creator of HONGGUO DL
- **Methodology**: ⚡ Vibe Coded with passion & precision

> *"Hi! I am Seavfou Eang. I vibe coded HONGGUO DL to give everyone a straightforward, 100% free way to preserve and watch their favorite Hongguo short dramas offline on Windows—without bloatware, telemetry, or annoying ads."*

### 🔒 Bypass Engine & Source Code Notice
> **Important Note**: The stream decryption and internal bypass engine source code is proprietary and **not publicly disclosed**. It is kept private to protect long-term stability and prevent upstream CDN API patch invalidation. The full working Windows application is distributed as a pre-compiled, standalone binary installer (`.exe`).

---

## Support & Donations (KHQR)

HONGGUO DL is completely **free to use** and contains **no advertisements**. If this project saved you time or helped you archive your favorite dramas, consider supporting continued maintenance and development with a coffee via Cambodian **KHQR / Bakong**:

<div align="center">

| Official Cambodian KHQR Payment Stand |
| :---: |
| **Account Name**: `SEAVFOU EANG` |
| **Supported Banking Apps**: ABA Mobile, Bakong, Wing, ACLEDA, Canadia, Sathapana, Alipay+, UnionPay |
| *(Scan using any local Cambodian mobile banking application)* |

*Place your official QR image at `public/khqr.png` to display it automatically in the web app.*

</div>

---

## Legal Disclaimer

This software is developed strictly for personal educational, research, and archiving purposes. All short drama media, trademarks, and logos belong to their respective copyright holders (ByteDance / Hongguo). Users are responsible for complying with the local laws and terms of service of the content provider.

---

<div align="center">
  <sub>Crafted by <a href="https://github.com/seavfoueang-coc">Seavfou Eang</a>.</sub>
</div>
