# Breadcrumbs

A student-centric course recommendation platform.

## Running
First install npm, then run:
```npm install```
```npm start```

# Deploying to Firebase

First, login with
```firebase login```

Then, follow one of the following to deploy what you need:

## Deploy to hosting

First, build the webapp with
```npm run build```

This places built files in /build. Then, run
```firebase deploy --only hosting```

The tool will upload all files in /build and provide a deployed link!
