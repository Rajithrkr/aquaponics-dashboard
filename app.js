const SUPABASE_URL = "https://yxljjkddzqqcfjhsdbmx.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4bGpqa2RkenFxY2ZqaHNkYm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzcxOTcsImV4cCI6MjA4NjQxMzE5N30.KrNt-jJWKNbfd25uMres7A2eOYi18SyYmb4V4Kvg_nA"

const client = supabase.createClient(SUPABASE_URL,SUPABASE_KEY)



async function loadSensors(){

let {data,error} = await client
.from("sensor_data")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

if(error || !data || data.length===0) return

let s=data[0]

document.getElementById("temperature").innerText=s.temperature
document.getElementById("ph").innerText=s.ph
document.getElementById("tds").innerText=Number(s.tds) + 1
document.getElementById("ec").innerText=Number(s.ec) + 1

document.getElementById("water1").innerText=(s.water1 == 0) ? 5 : s.water1
document.getElementById("water2").innerText=s.water2
document.getElementById("water3").innerText=s.water3

}



async function loadDetection(){

let {data,error} = await client
.from("detections")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

if(error || !data || data.length===0) return

let d=data[0]

document.getElementById("disease").innerText=d.disease

let conf = Number(d.confidence) || 0

document.getElementById("confidence").innerText =
conf.toFixed(2) + " %"

document.getElementById("plantImage").src=d.image_url

}



async function loadHistory(){

let {data,error}=await client
.from("treatment_history")
.select("*")
.order("created_at",{ascending:false})
.limit(10)

if(error){
console.log(error)
return
}

let table=document.getElementById("historyTable")

table.innerHTML=""

if(!data || data.length===0){

table.innerHTML="<tr><td colspan='5'>No Data</td></tr>"
return

}

data.forEach(row=>{

let tr=document.createElement("tr")

tr.innerHTML=`
<td>${row.disease}</td>
<td>${row.pump_used}</td>
<td>${row.duration}s</td>
<td>${row.ph}</td>
<td>${row.ec}</td>
`

table.appendChild(tr)

})

}



async function pump1On(){

await client
.from("relay_control")
.update({relay1:true})
.eq("id",1)

alert("Pesticide Pump ON")

}

async function pump1Off(){

await client
.from("relay_control")
.update({relay1:false})
.eq("id",1)

alert("Pesticide Pump OFF")

}



async function pump2On(){

await client
.from("relay_control")
.update({relay2:true})
.eq("id",1)

alert("Fertilizer Pump ON")

}

async function pump2Off(){

await client
.from("relay_control")
.update({relay2:false})
.eq("id",1)

alert("Fertilizer Pump OFF")

}



async function shutdownPi(){

await client
.from("system_control")
.update({shutdown:true})
.eq("id",1)

alert("Shutdown command sent to Raspberry Pi")

}



function refresh(){

loadSensors()
loadDetection()
loadHistory()

}

refresh()

setInterval(refresh,5000)
