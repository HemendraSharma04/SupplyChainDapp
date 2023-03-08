FROM node:18

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package.json /react-app
RUN npm install --force

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start