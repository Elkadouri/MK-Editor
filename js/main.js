
let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download= document.getElementById('download');
let img = document.getElementById('img');

let reset = document.getElementById('reset');
let imgBox = document.querySelector('.img-box');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')



document.getElementById('currentYear').textContent = new Date().getFullYear();


function resetValue(){
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
    
    // Clear canvas filters
    ctx.filter = 'none';

    // render the original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    
}





window.onload = function(){
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

upload.onchange = function(){
    resetValue()
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';

    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    
    file.onload = function(){
        img.src = file.result;
    }
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display='none';
    }
}

let filters = document.querySelectorAll('ul li input');
filters.forEach(filter => {
    filter.addEventListener('input' , function(){
     
        ctx.filter = `saturate(${saturate.value}%)`;
        ctx.filter += ` contrast(${contrast.value}%)`;
        ctx.filter += ` brightness(${brightness.value}%)`;
        ctx.filter += ` sepia(${sepia.value}%)`;
        ctx.filter += ` grayscale(${grayscale.value})`;
        ctx.filter += ` blur(${blur.value}px)`;
        ctx.filter += ` hue-rotate(${hueRotate.value}deg)`;

        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
    
})


download.onclick = function(){
    download.href = canvas.toDataURL();
}

