FROM node:carbon

ENV NPM_CONFIG_LOGLEVEL warn

COPY . .

RUN npm config set '@bit:registry' https://node.bit.dev
RUN npm install @bit/akameco.styled-spinkit.wave-loading
RUN npm run build --production
RUN npm install -g serve

CMD serve -s build

EXPOSE 5000