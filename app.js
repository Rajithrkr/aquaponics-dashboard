
const SUPABASE_URL = "https://yxljjkddzqqcfjhsdbmx.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4bGpqa2RkenFxY2ZqaHNkYm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzcxOTcsImV4cCI6MjA4NjQxMzE5N30.KrNt-jJWKNbfd25uMres7A2eOYi18SyYmb4V4Kvg_nA"

const supabase = supabase.createClient(SUPABASE_URL,SUPABASE_KEY)


async function loadDetection(){

const {data,error} = await supabase
.from("detections")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

let d = data[0]

document.getElementById("disease").innerText = d.disease
document.getElementById("confidence").innerText = d.confidence

document.getElementById("plantImage").src = d.image_url

}

async function loadSensors(){

const {data,error} = await supabase
.from("sensor_readings")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

let s = data[0]

document.getElementById("temp").innerText = s.temperature
document.getElementById("humidity").innerText = s.humidity
document.getElementById("ph").innerText = s.ph
document.getElementById("water").innerText = s.water_level

}


async function controlPump(type,value){

await supabase
.from("controls")
.insert({

device:type,
value:value

})

alert(type+" pump command sent")

}


loadDetection()
loadSensors()