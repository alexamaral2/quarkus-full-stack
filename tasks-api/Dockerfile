FROM maven:3.9.12-eclipse-temurin-25 AS dev
WORKDIR /work

EXPOSE 8080
EXPOSE 5005

CMD ["./mvnw", "quarkus:dev", "-Dquarkus.http.host=0.0.0.0"]

FROM eclipse-temurin:25-jre AS prod
WORKDIR /app
COPY --from=dev /work/target/quarkus-app/ .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "quarkus-run.jar"]