
## Backend: Deploying Node.js & Express on Vercel

### 1. Set Up Vercel
   - If you don’t have an account, [sign up for Vercel](https://vercel.com/signup).
   - Install the Vercel CLI globally:
     ```bash
     npm install -g vercel
     ```

### 2. Prepare Your Project for Vercel
   - Ensure your project has a `package.json` file listing all dependencies and specifying the main file (usually `index.js` or `server.js`).
   - In the root of your project, create a `vercel.json` file to define configurations:
     ```json
     {
       "version": 2,
       "builds": [
         { "src": "index.js", "use": "@vercel/node" }
       ],
       "routes": [
         { "src": "/(.*)", "dest": "index.js" }
       ]
     }
     ```
   - Add any environment variables by navigating to the **Settings** tab of your Vercel project. Click on **Environment Variables** and add the necessary keys and values (e.g., `DB_URI`, `SECRET_KEY`, etc.).

### 3. Deploy Your Backend
   - From your project folder, run:
     ```bash
     vercel
     ```
   - Follow the prompts to set up your project on Vercel. You’ll be asked to link a directory to a new or existing project and specify deployment settings.
   - Vercel will automatically deploy your project and provide a live URL for your backend API.

### 4. Configure Vercel Settings (Optional)
   - You can configure other settings like **Environment Variables** under your project settings on the Vercel dashboard. This is important for sensitive data like API keys, database URIs, etc.

### 5. Update Frontend API Calls
   - In your frontend code, make sure all API calls are directed to the new Vercel URL.
   - Example:
     ```javascript
     fetch('https://your-vercel-app.vercel.app/api/endpoint')
       .then(response => response.json())
       .then(data => console.log(data));
     ```

### 6. Test Your API
   - Once deployed, test your backend API using Postman or any REST client.
   - Ensure it’s working as expected by accessing the Vercel-provided URL with your defined API routes.

---

Your application is now live with the frontend hosted on GitHub Pages and the backend running on Vercel. Any changes pushed to the main branch of your frontend will automatically update GitHub Pages, and changes to the backend pushed to Vercel will trigger a new deployment.
