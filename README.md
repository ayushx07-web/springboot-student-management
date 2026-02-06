# 🎓 Student Management System (Spring Boot)

A full-stack **Student Management System** built using **Spring Boot, MySQL, HTML, CSS, and JavaScript**.  
This application allows users to manage student records with CRUD operations.

---

## 🚀 Live Demo
🔗 Coming Soon (Deployed on Cloud Platform)

---

## 📌 Features

✅ Add new students  
✅ View all students  
✅ Search students  
✅ Update student details  
✅ Delete students  
✅ REST API support  
✅ Database integration (MySQL)  
✅ Docker support  
✅ Cloud deployment ready  

---

## 🛠️ Tech Stack

| Layer       | Technology |
|-------------|------------|
| Backend     | Spring Boot (Java 17) |
| Frontend    | HTML, CSS, JavaScript |
| Database    | MySQL |
| ORM         | Hibernate / JPA |
| Build Tool  | Maven |
| Deployment  | Docker, Railway / Render |
| Versioning  | Git & GitHub |

---

## 📂 Project Structure

```
Studentmanagement/
├── src/main/java
│   └── com.StudentManagement
│       ├── controller
│       ├── model
│       ├── repository
│       └── service
├── src/main/resources
│   ├── static
│   └── application.properties
├── Dockerfile
├── pom.xml
└── README.md
```



---

## 🚀 Setup & Run

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ayushx07-web/springboot-student-management.git
cd springboot-student-management
```

### 2️⃣ Configure Database

Update in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=your_password
```
### 3️⃣ Run the Application

Using Maven:

```bash
mvn clean install
mvn spring-boot:run
```

Or using Maven Wrapper:

```bash
./mvnw spring-boot:run
```

---

### 4️⃣ Open in Browser

```text
http://localhost:8080
```

---

## 🐳 Run with Docker

### Build Image

```bash
docker build -t student-management .
```

### Run Container

```bash
docker run -p 8080:8080 student-management
```

---

## 🌐 API Endpoints

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | /students             | Get all students   |
| POST   | /students             | Add student        |
| PUT    | /students/{id}         | Update student     |
| DELETE | /students/{id}         | Delete student     |
| GET    | /students/search      | Search student     |

---




---

## 👨‍💻 Author

**Ayush**  
📌 GitHub: https://github.com/ayushx07-web

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the MIT License.





