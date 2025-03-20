# Step 1: Start with an image that has Java and Maven
FROM maven:3.8.6-eclipse-temurin-17

# Step 2: Set a working directory (like a folder in the container)
WORKDIR /app

# Step 3: Copy your project files into the container
COPY . .

# Step 4: Build your project with Maven
RUN mvn clean package -DskipTests

# Step 5: Tell Docker how to run your app
CMD ["java", "-jar", "target/your-app-name.jar"]