# syntax=docker/dockerfile:1


FROM node:slim as build
WORKDIR /backend-build
COPY backend/ .
RUN npm i -g typescript