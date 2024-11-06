const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'queue_system'
});

db.connect((err) => {
    if (err) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', err);
        throw err;
    }
    console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
});

io.on('connection', (socket) => {
    console.log('ผู้ใช้เชื่อมต่อแล้ว');

    function updateQueueStatus() {
        db.query('SELECT * FROM queue_status', (err, result) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลคิว:', err);
                socket.emit('error', { message: 'เกิดข้อผิดพลาดในการดึงข้อมูลคิว กรุณาลองใหม่อีกครั้ง' });
                return;
            }
            io.emit('updateQueue', {
                currentNumber: result[0].current_number,
                queueLength: result[0].queue_length
            });
        });
    }

    socket.on('addToQueue', () => {
        db.query('UPDATE queue_status SET queue_length = queue_length + 1', (err) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการเพิ่มคิว:', err);
                socket.emit('error', { message: 'เกิดข้อผิดพลาดในการรับคิว กรุณาลองใหม่อีกครั้ง' });
                return;
            }
            updateQueueStatus();
        });
    });

    socket.on('nextInQueue', () => {
        db.query('UPDATE queue_status SET current_number = current_number + 1, queue_length = GREATEST(queue_length - 1, 0)', (err) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการเรียกคิวถัดไป:', err);
                socket.emit('error', { message: 'เกิดข้อผิดพลาดในการเรียกคิวถัดไป กรุณาลองใหม่อีกครั้ง' });
                return;
            }
            updateQueueStatus();
        });
    });

    socket.on('resetQueue', () => {
        db.query('DROP TABLE IF EXISTS queue_status', (err) => {
            if (err) {
                console.error('Error dropping table:', err);
                socket.emit('error', { message: 'เกิดข้อผิดพลาดในการรีเซ็ตคิว' });
                return;
            }
            
            db.query(`
                CREATE TABLE queue_status (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    current_number INT NOT NULL DEFAULT 0,
                    queue_length INT NOT NULL DEFAULT 0
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    socket.emit('error', { message: 'เกิดข้อผิดพลาดในการรีเซ็ตคิว' });
                    return;
                }
                
                db.query('INSERT INTO queue_status (current_number, queue_length) VALUES (0, 0)', (err) => {
                    if (err) {
                        console.error('Error inserting initial record:', err);
                        socket.emit('error', { message: 'เกิดข้อผิดพลาดในการรีเซ็ตคิว' });
                        return;
                    }
                    console.log('รีเซ็ตคิวสำเร็จ');
                    updateQueueStatus();
                });
            });
        });
    });

    socket.on('disconnect', () => {
        console.log('ผู้ใช้ยกเลิกการเชื่อมต่อ');
    });

    updateQueueStatus();
});

http.listen(3000, () => {
    console.log('เซิร์ฟเวอร์ทำงานที่พอร์ต 3000');
});

