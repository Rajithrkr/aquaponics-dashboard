
const SUPABASE_URL = "https://yxljjkddzqqcfjhsdbmx.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4bGpqa2RkenFxY2ZqaHNkYm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzcxOTcsImV4cCI6MjA4NjQxMzE5N30.KrNt-jJWKNbfd25uMres7A2eOYi18SyYmb4V4Kvg_nA"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)


async function loadSensors(){

let { data } = await client
.from("sensor_data")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

let s = data[0]

document.getElementById("temperature").innerText = s.temperature
document.getElementById("ph").innerText = s.ph
document.getElementById("tds").innerText = s.tds
document.getElementById("ec").innerText = s.ec

document.getElementById("water1").innerText = s.water1
document.getElementById("water2").innerText = s.water2
document.getElementById("water3").innerText = s.water3

}


async function loadDetection(){

let { data } = await client
.from("detections")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

let d = data[0]

document.getElementById("disease").innerText = d.disease
document.getElementById("confidence").innerText = d.confidance

document.getElementById("plantImage").src = d.image_url

}


async function pump1(){

await client
.from("relay_control")
.insert([{relay1:true}])

alert("Fertilizer Pump Activated")

}


async function pump2(){

await client
.from("relay_control")
.insert([{relay2:true}])

alert("Pesticide Pump Activated")

}


loadSensors()
loadDetection()


setInterval(()=>{

loadSensors()
loadDetection()

},5000)const SUPABASE_URL = "https://yxljjkddzqqcfjhsdbmx.supabase.co"
const SUPABASE_KEY = "YOUR_ANON_PUBLIC_KEY"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)


async function loadSensors(){

let { data } = await client
.from("sensor_data")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

let s = data[0]

document.getElementById("temperature").innerText = s.temperature
document.getElementById("ph").innerText = s.ph
document.getElementById("tds").innerText = s.tds
document.getElementById("ec").innerText = s.ec

document.getElementById("water1").innerText = s.water1
document.getElementById("water2").innerText = s.water2
document.getElementById("water3").innerText = s.water3

}


async function loadDetection(){

let { data } = await client
.from("detections")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

let d = data[0]

document.getElementById("disease").innerText = d.disease
document.getElementById("confidence").innerText = d.confidance

document.getElementById("plantImage").src = d.image_url

}


async function pump1(){

await client
.from("relay_control")
.insert([{relay1:true}])

alert("Fertilizer Pump Activated")

}


async function pump2(){

await client
.from("relay_control")
.insert([{relay2:true}])

alert("Pesticide Pump Activated")

}


loadSensors()
loadDetection()


setInterval(()=>{

loadSensors()
loadDetection()

},5000)