FROM alpine:latest

RUN apk add libreoffice py3-pip

RUN apk --no-cache add msttcorefonts-installer fontconfig nodejs npm
RUN update-ms-fonts
RUN fc-cache -f

RUN pip install unoserver uno

ENV URE_BOOTSTRAP=vnd.sun.star.pathname:/usr/lib/libreoffice/program/fundamentalrc
ENV PATH=/usr/lib/libreoffice/program:$PATH
ENV UNO_PATH=/usr/lib/libreoffice/program
ENV LD_LIBRARY_PATH=/usr/lib/libreoffice/program:/usr/lib/libreoffice/ure/lib
ENV PYTHONPATH=/usr/lib/libreoffice/program:$PYTHONPATH

WORKDIR /usr/src/libreoffice-converter
COPY package.json ./
RUN npm install
COPY . .

CMD ["/bin/sh", "-c", "unoserver --daemon; node ./dist/main.js"]