FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY target/bankmanagement-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "app.jar"]