# Queue Management System

# ระบบจัดการคิว (Queue Management System)

## Installation

## การติดตั้ง (Installation)

1. Prerequisites:
1. ติดตั้งโปรแกรมที่จำเป็น (Prerequisites):
   - XAMPP (Apache & MySQL)
   - XAMPP (Apache และ MySQL)
   - Node.js & npm
   - Node.js และ npm

2. Database Setup:
2. ตั้งค่าฐานข้อมูล (Database Setup):
   ```bash
   1. Start XAMPP
   1. เปิด XAMPP และเริ่มการทำงาน Apache และ MySQL
   2. Open phpMyAdmin
   2. เปิด phpMyAdmin (http://localhost/phpmyadmin)
   3. Import queue_system.sql
   3. นำเข้าไฟล์ queue_system.sql
   ```

3. Install Dependencies:
3. ติดตั้ง Dependencies:
   ```bash
   cd Queue-system-main
   npm install
   ```

4. Start Server:
4. เริ่มการทำงานของเซิร์ฟเวอร์:
   ```bash
   npm start
   ```

5. Access System:
5. เข้าใช้งานระบบ:
   - Display: http://localhost/Queue-system-main/index.html
   - หน้าแสดงผลคิว: http://localhost/Queue-system-main/index.html
   - Admin: http://localhost/Queue-system-main/admin.html
   - หน้าจัดการคิว: http://localhost/Queue-system-main/admin.html

## หมายเหตุ
- ต้องเปิด XAMPP (Apache และ MySQL) ก่อนใช้งานระบบทุกครั้ง
- หากมีปัญหาการเชื่อมต่อฐานข้อมูล ให้ตรวจสอบว่า MySQL ทำงานอยู่
- รหัสผ่าน root MySQL ค่าเริ่มต้นคือค่าว่าง (ไม่มีรหัสผ่าน)
