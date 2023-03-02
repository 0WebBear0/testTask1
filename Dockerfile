FROM node:16
WORKDIR /front
COPY ./ ./
#RUN npm install -g npm
RUN npm install --legacy-peer-deps
EXPOSE 80
CMD ["npm", "run", "dev", "--", "--host"]
