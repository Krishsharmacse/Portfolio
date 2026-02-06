# ---------- Build Stage ----------
FROM node:20

WORKDIR /app

# Copy only package.json (ignore lockfile)
COPY package.json ./

# Fresh install (Linux deps)
RUN npm install

# Copy project files
COPY . .

# Build
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
