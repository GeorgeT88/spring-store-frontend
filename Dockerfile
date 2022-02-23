# pull official base image
FROM node:14.9

# set working directory
WORKDIR /spring-store-frontend

# add `/spring-store-frontend/node_modules/.bin` to $PATH
ENV PATH /spring-store-frontend/node_modules/.bin:$PATH

# install spring-store-frontend dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./
COPY package-lock.json ./
# Installs all node packages
RUN npm install 


# Copies everything over to Docker environment
COPY . ./
EXPOSE 3000
# start spring-store-frontend
CMD ["npm", "start"]