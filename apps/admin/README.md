# @nicmosc/admin

App containing the private website to manage the content of `@nicmosc/web`.

Authentication is done via Github credentials. To run the app you need to set the following env vars in a `env.local` file:
```bash
# GITHUB AUTH
GITHUB_ID=
GITHUB_SECRET=
GITHUB_ACCESS_TOKEN=
# Localhost only
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# AWS
S3_AWS_ACCESS_KEY=
S3_AWS_SECRET_KEY=
S3_AWS_BUCKET_NAME=
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see it.
