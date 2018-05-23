FROM joeferner/node-java

# Create app directory
WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/logs

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY process.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# RUN npm install pm2 -g

EXPOSE 8080

# Bundle app source
COPY . .
RUN chmod +x /usr/src/app/startup.sh

# CMD ["./startup.sh"]
CMD [ "npm", "start" ]
