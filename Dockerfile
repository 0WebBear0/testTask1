FROM node:16
WORKDIR /front
COPY ./ ./
#RUN npm install -g npm
RUN npm install --legacy-peer-deps
RUN npm run build
EXPOSE 80
#CMD ["npm", "run", "dev", "--", "--host"]
CMD ["npm", "run", "preview", "--", "--host"]
