FROM maven:3.8.6-eclipse-temurin-17
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests
CMD ["java", "-jar", "target/Skill-Barter-0.0.1-SNAPSHOT.jar"]