# Project Deployment Guide

## Frontend: Hosting on GitHub Pages

### 1. Push Code to GitHub
   - Initialize a Git repository in your project folder if you haven’t already:
     ```bash
     git init
     ```
   - Add all files and commit:
     ```bash
     git add .
     git commit -m "Initial commit"
     ```
   - Create a new repository on GitHub, and then add it as a remote origin:
     ```bash
     git remote add origin https://github.com/username/repository-name.git
     git push -u origin main
     ```

### 2. Enable GitHub Pages
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Source**, select **main** branch, and then choose the root directory (`/`) or `/docs` if your files are there.
   - Save changes, and GitHub Pages will automatically publish your site .

### 3. Access Your Site
   - Once GitHub finishes processing, you’ll see a live URL where your frontend is hosted.
   - You can view your site at `https://username.github.io/repository-name`.

---
