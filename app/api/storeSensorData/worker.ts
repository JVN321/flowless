import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
});

const ESP32_URL = process.env.ESP32_URL || "http://localhost:3000/api/getSensorData";

async function fetchAndStoreSensorData() {
  try {
    const response = await fetch(ESP32_URL);
    const data = await response.json();
    const result = await pool.query(`
      SELECT sensor1
      FROM water_levels
      ORDER BY timestamp DESC 
      LIMIT 2
    `);
    if (data.sensor1 > 0) {
      await pool.query("INSERT INTO water_levels (sensor1, sensor2, timestamp) VALUES ($1, $2, NOW())", [
        data.sensor1,
        data.sensor2,
      ]);

      const previousValue = result.rows[0]["sensor1"];
      //console.log(data.sensor1, previousValue);
      if (data.sensor1 < previousValue) {
        const [month, day, year] = new Date()
          .toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
          .split(',')[0]
          .split('/');
        const today = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        console.log(today);
        const updateResult = await pool.query(
          `
          UPDATE water_levels_daily 
          SET consumption = consumption + (${previousValue - data.sensor1})
          WHERE date = $1
          RETURNING consumption`,
          [today]
        );

        if (updateResult.rowCount === 0) {
          // If no row exists for today, create one
          await pool.query(
            `
            INSERT INTO water_levels_daily (date, consumption)
            VALUES ($1, $2)`,
            [today, previousValue - data.sensor1]
          );
        }
      }
    }
    //console.log("Stored:", data);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

setInterval(fetchAndStoreSensorData, 1000);
