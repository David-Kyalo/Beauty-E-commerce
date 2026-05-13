# 📓 Peachy Cherie: Deployment Challenges & Solutions Log

This document details the technical hurdles encountered during the hybrid deployment (Vercel + Render) of the Peachy Cherie platform and the strategies used to resolve them.

---

## 1. TypeScript Module Resolution (The "Node10" Crisis)
*   **Challenge**: Render build logs showed that `moduleResolution: node10` was deprecated and would stop working in TypeScript 7.0.
*   **Solution**: Reverted the backend to **`CommonJS`** and used the **`bundler`** resolution for the frontend. This satisfied the compiler while allowing us to keep our clean import syntax.

## 2. Missing Production Type Definitions
*   **Challenge**: The TypeScript compiler (`tsc`) on Render couldn't find `@types/node` and `@types/express`, causing the build to fail.
*   **Root Cause**: These packages were in `devDependencies`, which Render ignores in production mode.
*   **Solution**: Moved all critical `@types/*` packages from `devDependencies` to the main **`dependencies`** block in `package.json`.

## 3. The "0 Variables Injected" Error
*   **Challenge**: Even with a `.env` file present, the server reported that it found 0 variables and crashed.
*   **Solution**: 
    1.  Updated `config.ts` to use absolute paths with `__dirname`.
    2.  Manually entered all keys into the Render Dashboard environment settings (Render ignores `.env` files from Git).

## 4. Express 5 Type Strictness
*   **Challenge**: Express 5 introduced stricter types for `req.params`, causing errors like `Argument of type string | string[] is not assignable to string`.
*   **Solution**: Explicitly cast URL parameters using `as string` in the controllers (e.g., `req.params.id as string`).

## 5. Next.js 15 Suspense Bailout
*   **Challenge**: The Vercel build failed with a "Missing Suspense Boundary" error on the login page.
*   **Root Cause**: Next.js 15 requires any component using `useSearchParams()` to be wrapped in a `<Suspense>` boundary.
*   **Solution**: Refactored the login page to wrap the form logic in a `<Suspense>` block.

## 6. React 19 Peer Dependency Conflict
*   **Challenge**: `npm install` failed on Vercel because `lucide-react` didn't support React 19's peer dependencies yet.
*   **Solution**: 
    1.  Upgraded `lucide-react` to the latest version.
    2.  Configured Vercel to use the `--legacy-peer-deps` flag.

## 7. React2Shell Security Vulnerability (CVE-2025-55182)
*   **Challenge**: Vercel flagged the deployment as unsafe due to a critical RCE vulnerability in earlier Next.js 15 versions.
*   **Solution**: Upgraded Next.js to the latest patched version and utilized the official Vercel remediation tool: `npx fix-react2shell-next`.

## 8. MySQL Index Mismatch (Prisma)
*   **Challenge**: Running `npx prisma db push` failed on Aiven with an error about dropping a non-existent index.
*   **Solution**: Used the **`--force-reset`** flag to synchronize the database schema perfectly with the Prisma model.

## 9. CORS Policy & Vercel Subdomains
*   **Challenge**: Vercel's unique deployment subdomains (e.g., `*-git-main-*.vercel.app`) were being blocked by the server's strict CORS policy.
*   **Solution**: Updated the CORS middleware in `index.ts` with a Regular Expression (`/\.vercel\.app$/`) to automatically trust all Vercel subdomains.

## 10. API Path Mismatch (The "/api" Suffix)
*   **Challenge**: Products failed to load on Vercel with 404/500 errors.
*   **Root Cause**: The frontend was hitting the root URL instead of the `/api` prefix.
*   **Solution**: Updated the `NEXT_PUBLIC_API_URL` environment variable on Vercel to include the explicit **`/api`** suffix.

## 11. Remote Database Seeding
*   **Challenge**: The live site was connected to Aiven but showed 0 products.
*   **Solution**: 
    1.  Temporarily updated the local `server/.env` with the Aiven `DATABASE_URL`.
    2.  Ran `npx prisma db push` and `npm run seed` to upload the product catalog to Aiven.

## 12. Aiven SSL Connection Requirements
*   **Challenge**: Initial connection to Aiven failed with "Connection reset" errors.
*   **Solution**: Appended **`?ssl-mode=REQUIRED`** to the end of the Aiven connection string in both local `.env` and Render dashboard.

---

### 💡 Summary for Future Development:
*   **Backend**: Keep it in **CommonJS** mode for maximum stability.
*   **Deployment**: Always clear the Build Cache on Render/Vercel if weird configuration errors persist.
*   **Environment**: Always use the `/api` suffix for the frontend API URL.
