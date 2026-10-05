# HONGGUO DL (红果短剧下载器)

<div align="center">

![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11%20(x64)-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-100%25%20Free%20%7C%20No%20Ads-d4f938?style=for-the-badge&labelColor=black)
![Developer](https://img.shields.io/badge/Developer-Seavfou%20Eang-blueviolet?style=for-the-badge&logo=github)

<p align="center">
  <b>High-Performance Windows Desktop Application for Parsing, Batch Downloading, Decrypting, and Archiving ByteDance Hongguo (红果短剧) Short Dramas.</b>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#how-to-use">How to Use</a> •
  <a href="#about-the-developer">About Developer</a> •
  <a href="#support--donations">Support (KHQR)</a>
</p>

---

</div>

## 📖 Overview

**HONGGUO DL** is an open, high-speed, and clean desktop tool built specifically for archiving ByteDance's **Hongguo Free Short Drama (红果免费短剧)** series on Windows.

Unlike web-based downloaders that force users through spammy link shorteners, ad walls, or paid VIP subscriptions, HONGGUO DL operates **100% locally on your machine**:
- **Zero Ads & Zero Popups**: Clean, focused dark-mode desktop interface.
- **100% Free**: No subscription fees, token credits, or paywalls.
- **Offline First**: All parsing, stream fetching, decryption, and MP4 remuxing execute directly on your CPU/disk.

---

## ✨ Features

- ⚡ **Instant Catalog Parsing**: Paste any Hongguo series share URL or web link (`hongguoduanju.com`) to instantly resolve the complete episode index (1–100+ episodes) with titles, cover posters, and video metadata.
- 🚀 **Parallel Turbo Downloader**: Multi-stream concurrent segment fetcher with automatic chunk retry, failure recovery, and connection pooling.
- 🔓 **On-Device Stream Decryption**: Automatic extraction of video segments, decrypting cipher payloads, and remuxing into standard MP4 files compatible with any media player (VLC, Windows Media Player, PotPlayer).
- 🏷️ **Smart Episode Renaming**: Files are automatically organized and named neatly: `[Series Name] - Episode 001.mp4`, `[Series Name] - Episode 002.mp4`, etc.
- 🌐 **Bilingual Support**: Fully localized in **English** and **Khmer (ភាសាខ្មែរ)**.
- 📦 **Standalone Portable Executable**: Runs as a single portable `.exe` on Windows 10/11 x64 without requiring complex external dependencies.

---

## 🏗️ Technical Pipeline & Architecture

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

## 🚀 Quick Start (Web App & Showcase)

This repository includes both the technical architecture showcase web application and build instructions for the desktop client.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- `npm` or `bun`

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/seavfoueang-coc/hongguo-dl.git
   cd hongguo-dl
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💻 Desktop Application Usage

1. Launch `hongguo-dl-portable.exe` on Windows 10 or 11.
2. Open the **Hongguo Short Drama (红果短剧)** app or web player and copy the share link of your desired drama.
3. Paste the URL into HONGGUO DL and click **Parse Series (វិភាគតំណ)**.
4. Select the episodes you wish to save (or click **Select All**).
5. Choose your target output folder and click **Download (ទាញយក)**.
6. The app will download, decrypt, and save all episodes as clean `.mp4` files.

---

## 👨‍💻 About the Developer

**Seavfou Eang (សៀវហ្វូ អៀង)**
- **GitHub**: [@seavfoueang-coc](https://github.com/seavfoueang-coc)
- **Telegram**: [@eangseavfou](https://t.me/eangseavfou)
- **Role**: Software Developer & Creator of HONGGUO DL

> *"Hi! I am Seavfou Eang, a software developer passionate about building clean, efficient, and reliable desktop tools. I built HONGGUO DL to give people a straightforward, 100% free way to preserve and watch their favorite Hongguo short dramas offline on Windows—without bloatware, telemetry, or annoying ads."*

---

## 💖 Support & Donations (KHQR)

HONGGUO DL is completely **free to use** and contains **no advertisements**. If this project saved you time or helped you archive your favorite dramas, consider supporting continued maintenance and development with a coffee via Cambodian **KHQR / Bakong**:

<div align="center">

| Official Cambodian KHQR Payment Stand |
| :---: |
| **Account Name**: `SEAVFOU EANG` |
| **Supported Banking Apps**: ABA Mobile, Bakong, Wing, ACLEDA, Canadia, Sathapana, Alipay+, UnionPay |
| *(Scan using any local Cambodian mobile banking application)* |

</div>

---

## ⚖️ Legal Disclaimer

This software is developed strictly for personal educational, research, and archiving purposes. All short drama media, trademarks, and logos belong to their respective copyright holders (ByteDance / Hongguo). Users are responsible for complying with the local laws and terms of service of the content provider.

---

<div align="center">
  <sub>Created with ❤️ by <a href="https://github.com/seavfoueang-coc">Seavfou Eang</a>.</sub>
</div>
