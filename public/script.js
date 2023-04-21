let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")
var io = io.connect('http://localhost:8080');

let x 
let y
let mousedown  = false
let strokeColor = "#000000" // default color is black


const colorPicker = document.getElementById('colorPicker')
colorPicker.addEventListener('input', (e) => {
    strokeColor = e.target.value
})

window.onmousedown = (e)=>{
    ctx.moveTo(x,y)
    io.emit("down",({x,y}))
    mousedown = true
}
window.onmouseup=  (e)=>{
    mousedown = false;
    
}
io.on("ondraw",({x,y})=>{
    ctx.lineTo(x,y)
    ctx.stroke()
    
})
io.on("ondown",({x,y})=>{
    ctx.moveTo(x,y)
})

window.onmousemove = (e)=>{
             
    x = e.clientX
    y = e.clientY
 
    if(mousedown)
    {
        io.emit("draw",({x,y}))
        ctx.strokeStyle = strokeColor // set the stroke color
        ctx.lineTo(x,y)
        ctx.stroke()
    }
}
