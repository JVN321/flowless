import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
});

const ESP32_URL = process.env.ESP32_URL || "http://localhost:3000/api/getSensorData";
const MIN_LEVEL = 200;  // Minimum water level threshold
const MAX_LEVEL = 1600; // Maximum water level threshold
const esphost = process.env.ESP32_URL.slice(0, -8) + "led";
async function controlMotor(isRunning: boolean) {

    try {
      console.log(`Sending request to change motor state to: ${isRunning ? 'Running' : 'Stopped'}`);
      
      await fetch(esphost, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        // Send 'on' or 'off' as the state parameter
        body: `state=${isRunning ? 'on' : 'off'}`
      });
      
      
    } catch (error) {
      console.error("Error sending request:", error);
    }
};


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

    if (data.sensor1 >= 0) {
      // Auto control motor based on water level
      if (data.sensor1 < MIN_LEVEL) {
        await controlMotor(true); // Start motor when water level is too low
      } else if (data.sensor1 > MAX_LEVEL) {
        await controlMotor(false); // Stop motor when water level is high enough
      }

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

        //console.log(today);
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
