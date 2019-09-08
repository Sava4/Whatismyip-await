const btn = document.getElementById('ipbtn');
btn.addEventListener('click', addrBtnhandler);

async function getIP() {
    let res = await fetch('https://api.ipify.org/?format=json');
    let json = await res.json();
    let ip = json.ip
    return ip
}

async function getAddr() {
    let ip = await getIP();
    let res = await fetch(`http://ip-api.com/json/${ip}?fields=continent,country,regionName,city,district&lang=ru`);
    let json = await res.json();
    return json;
}


async function addrBtnhandler() {
    btn.classList.add('is-loading');
    let {city, continent, country, district, regionName} = await getAddr();
    btn.classList.remove('is-loading');
    drawMessage(continent, country, regionName, city, district);
}

function drawMessage(continent, country, regionName, city, district) {
    let msg = document.getElementById('msg');
    if (msg !== null) {msg.remove()}
    let output = document.createElement('article');
    output.classList.add('message', 'is-danger', 'is-large') ;
    output.id = 'msg';
    output.innerHTML = `
        <div class="message-body">
            <p><strong>Ваш континент: </strong>${continent}</p>
            <p><strong>Ваша страна: </strong>${country}</p>
            <p><strong>Ваш регион: </strong>${regionName}</p>
            <p><strong>Ваша город: </strong>${city}</p>
            <p><strong>Ваш район: </strong>${district}</p>
        </div>`
    let container = document.getElementById('container');
    container.appendChild(output);
}