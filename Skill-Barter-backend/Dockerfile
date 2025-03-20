# Use a base image with Maven and Java 17
FROM maven:3.8.6-eclipse-temurin-17 AS build

# Set the working directory
WORKDIR /app

# Copy pom.xml and download dependencies for caching
COPY pom.xml .
RUN mvn dependency:go-offline -B || echo "Failed to download dependencies; check logs above"

# Copy source code
COPY src ./src

# Build the project with detailed error output
RUN mvn clean package -DskipTests -e || echo "Maven build failed; check logs above for details"

# List the target directory to verify JAR creation
RUN ls -la target/ || echo "Target directory not found"

# Final stage: Run the application
FROM maven:3.8.6-eclipse-temurin-17
WORKDIR /app
COPY --from=build /app/target/Skill-Barter-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "Skill-Barter-0.0.1-SNAPSHOT.jar"]