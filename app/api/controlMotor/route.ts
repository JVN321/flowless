import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DATABASE_USER || "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_NAME || "esp32_data",
  password: process.env.DATABASE_PASSWORD || "1234",
  port: Number(process.env.DATABASE_PORT) || 5432
});

if (!process.env.DATABASE_HOST) {
  throw new Error("DATABASE_HOST is not defined");
}
const esphost = process.env.ESP32_URL.slice(0, -8) + "led";
export async function POST(request: Request) {
    try {
      const { isRunning } = await request.json();
  
      const result = await pool.query(
        `INSERT INTO motor_controls (motor_status) VALUES ($1) RETURNING *`,
        [isRunning]
      );
  
      // Send correct state parameter to ESP32
      await fetch(esphost, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        // Send 'on' or 'off' as the state parameter
        body: `state=${isRunning ? 'on' : 'off'}`
      });
  
      return NextResponse.json(
        { success: true, data: result.rows[0], status: isRunning },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }