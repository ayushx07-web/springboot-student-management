# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml
COPY Studentmanagement/pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY Studentmanagement/src ./src

# Build project
RUN mvn clean package -DskipTests


# Run stage
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
