import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DATABASE_USER || "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_NAME || "esp32_data",
  password: process.env.DATABASE_PASSWORD || "1234",
  port: Number(process.env.DATABASE_PORT) || 5432,
});

export async function GET() {
  try {
    // Fetch the latest 50 sensor readings
    const result = await pool.query(`
      SELECT id, sensor1, sensor2, timestamp 
      FROM water_levels 
      ORDER BY timestamp DESC 
      LIMIT 50
    `);

    return NextResponse.json(
      { success: true, data: result.rows },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Database Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
