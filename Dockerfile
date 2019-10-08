FROM cypress/base
COPY package.json /cypress-tests/
#COPY node_modules /cypress-tests/
WORKDIR /cypress-tests
RUN npm install
RUN $(npm bin)/cypress run