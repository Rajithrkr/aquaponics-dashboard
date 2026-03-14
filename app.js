const SUPABASE_URL = "https://yxljjkddzqqcfjhsdbmx.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4bGpqa2RkenFxY2ZqaHNkYm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzcxOTcsImV4cCI6MjA4NjQxMzE5N30.KrNt-jJWKNbfd25uMres7A2eOYi18SyYmb4V4Kvg_nA"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)



// -------------------------------
// LOAD SENSOR DATA
// -------------------------------

async function loadSensors(){

try{

let { data, error } = await client
.from("sensor_data")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

if(error){
console.log("Sensor error:",error)
return
}

if(!data || data.length === 0){
console.log("No sensor data found")
return
}

let s = data[0]

document.getElementById("temperature").innerText = s.temperature ?? "--"
document.getElementById("ph").innerText = s.ph ?? "--"
document.getElementById("tds").innerText = s.tds ?? "--"
document.getElementById("ec").innerText = s.ec ?? "--"

document.getElementById("water1").innerText = s.water1 ?? "--"
document.getElementById("water2").innerText = s.water2 ?? "--"
document.getElementById("water3").innerText = s.water3 ?? "--"

}catch(err){

console.log("Sensor loading failed:",err)

}

}



// -------------------------------
// LOAD PLANT DETECTION
// -------------------------------

async function loadDetection(){

try{

let { data, error } = await client
.from("detections")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

if(error){
console.log("Detection error:",error)
return
}

if(!data || data.length === 0){
console.log("No detection data")
return
}

let d = data[0]

document.getElementById("disease").innerText = d.disease ?? "--"
document.getElementById("confidence").innerText = d.confidence ? d.confidence + " %" : "--"

let img = document.getElementById("plantImage")

if(d.image_url){
img.src = d.image_url
}else{
img.src = "no-image.png"
}

}catch(err){

console.log("Detection loading failed:",err)

}

}



// -------------------------------
// FERTILIZER PUMP
// -------------------------------

async function pump1On(){

try{

await client
.from("relay_control")
.update({relay1:true})
.eq("id",1)

alert("Fertilizer Pump ON")

}catch(err){

console.log("Pump1 ON error:",err)

}

}

async function pump1Off(){

try{

await client
.from("relay_control")
.update({relay1:false})
.eq("id",1)

alert("Fertilizer Pump OFF")

}catch(err){

console.log("Pump1 OFF error:",err)

}

}



// -------------------------------
// PESTICIDE PUMP
// -------------------------------

async function pump2On(){

try{

await client
.from("relay_control")
.update({relay2:true})
.eq("id",1)

alert("Pesticide Pump ON")

}catch(err){

console.log("Pump2 ON error:",err)

}

}

async function pump2Off(){

try{

await client
.from("relay_control")
.update({relay2:false})
.eq("id",1)

alert("Pesticide Pump OFF")

}catch(err){

console.log("Pump2 OFF error:",err)

}

}



// -------------------------------
// RASPBERRY PI SHUTDOWN
// -------------------------------

async function shutdownPi(){

try{

await client
.from("system_control")
.update({shutdown:true})
.eq("id",1)

alert("Shutdown command sent to Raspberry Pi")

}catch(err){

console.log("Shutdown error:",err)

}

}



// -------------------------------
// AUTO REFRESH
// -------------------------------

function refresh(){

loadSensors()
loadDetection()

}

// first load
refresh()

// refresh every 5 seconds
setInterval(refresh,5000)