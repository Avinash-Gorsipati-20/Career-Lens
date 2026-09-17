# Firebase setup

This client does not contain a Firebase project configuration, service-account key, or fallback credentials. It will show a configuration error until the following setup is complete.

## 1. Add the real web-app configuration

In Firebase Console, open **Project settings → General → Your apps → Web app → SDK setup and configuration**. Copy the values from that web app into a new `.env.local` file using the empty keys in `.env.example`.

Required keys:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

`VITE_FIREBASE_MEASUREMENT_ID` is optional and is not used by this implementation. These are normal browser Firebase configuration values—not Firebase Admin credentials. Never put a service-account JSON key in this project or in a `VITE_` variable.

Restart `npm run dev` after creating or changing `.env.local`.

## 2. Enable Firebase products

1. In **Authentication → Sign-in method**, enable Email/Password and any providers you will keep visible in the app (Google, GitHub, Microsoft).
2. In **Authentication → Settings → Authorized domains**, add your development and production domains.
3. Create a **Cloud Firestore** database in production mode.

## 3. Publish security rules

Paste [firestore.rules](./firestore.rules) into **Firestore Database → Rules** and publish it.

Profile photos are uploaded directly to Cloudinary using the unsigned `career_lens_profile` preset. Firestore stores only the returned Cloudinary `secure_url` in `users/{uid}.photoUrl`.

## 4. Data shape

Firestore uses only two top-level collections:

```text
users/{uid}
  uid, fullName, email, photoUrl, createdAt, updatedAt

documents/{documentId}
  userId, type (resume | portfolio), name, content, createdAt, updatedAt
```

`content` is one Firestore map containing the final editor state. The application does not create autosaves, section collections, revisions, or version records. Profile image bytes live only in Cloudinary; Firestore stores the secure URL.

## 5. Existing local data

The previous local resume key is read only as a migration fallback. It is not autosaved. When that resume is successfully saved to Firestore for the first time, the local copy is removed; if saving fails, it remains untouched. Open cloud documents from the dashboard after that—the cloud copy is the source of truth.
