FROM node:15.14.0 as webapp

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /src/

COPY . .

RUN yarn install

RUN yarn run build

FROM golang:1.16 as server

WORKDIR /go/src/github.com/Lendiom/docs

COPY .git .
COPY main.go .
COPY go.mod .
COPY go.sum .

RUN go mod vendor && \
    GIT_COMMIT=$(git log --pretty=format:'%h' -n 1) && \
    GOOS=linux && \
    go build -ldflags "-X main.Commit=$GIT_COMMIT" -o server

FROM alpine:latest

WORKDIR /root/

RUN apk --no-cache add ca-certificates libc6-compat && \
    mkdir app

WORKDIR /root/app

ENV GIN_MODE=release

COPY --from=webapp /src/build /root/app/build
COPY --from=server /go/src/github.com/Lendiom/docs/server /root/app/

EXPOSE 5005

CMD ["/root/app/server"]
