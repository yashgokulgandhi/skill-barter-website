# Use a base image with Maven and Java 17 (matches your pom.xml)
FROM maven:3.8.6-eclipse-temurin-17

# Set the working directory
WORKDIR /app

# Copy pom.xml and download dependencies for caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the project
RUN mvn clean package -DskipTests

# Run the application
CMD ["java", "-jar", "target/Skill-Barter-backend-0.0.1-SNAPSHOT.jar"]