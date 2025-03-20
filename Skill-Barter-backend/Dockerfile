FROM maven:3.8.6-eclipse-temurin-17
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B || echo "Failed to download dependencies; check logs above"
COPY src ./src
RUN mvn clean package -DskipTests || echo "Maven build failed; check logs above for errors"
CMD ["java", "-jar", "target/Skill-Barter-backend-0.0.1-SNAPSHOT.jar"]