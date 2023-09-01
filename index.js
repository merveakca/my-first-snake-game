const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", tusHareketleri);

let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;
let x = 20;
let y = 20;
let hareketX = 0;
let hareketY = 0;
let elmaX = 10;
let elmaY = 10;
let konum = 40;
let boyutElma = 60;
let boyut = 60;
let boyutBas=60;
let yilanUzunlugu = 5;
let yilanParcalari = [];
let skor = 0;
let hiz = 5;
let can = 3;
const elmaResmi = new Image();
elmaResmi.src = './image/elma.png'
const yilanKuyrukSVG = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
<!-- Yılanın kuyruğu -->
<circle cx="50" cy="50" r="45" style="fill:green;stroke:black;stroke-width:5;" />
</svg>
`;
const yilanKuyrukResmi = new Image();
yilanKuyrukResmi.src = 'data:image/svg+xml,' + encodeURIComponent(yilanKuyrukSVG);

let yilanBasResmi = new Image();
let yilanBasSolResmi = new Image();
let yilanBasSagResmi = new Image();
let yilanBasAsagiResmi = new Image();
let yilanBasYukariResmi = new Image();
yilanBasSolResmi.src = './image/sol.png';
yilanBasSagResmi.src = './image/sag.png';
yilanBasAsagiResmi.src = './image/asagi.png';
yilanBasYukariResmi.src = './image/yukari.png';
yilanBasResmi=yilanBasSolResmi;

class YilanParcasi {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function oyunuCiz() {
    ekraniTemizle();
    yilaniCiz();
    elmayiCiz();
    yilanHareketiniGuncelle();
    elmaninKonumunuGuncelle();
    skoruCiz();
    hiziCiz();
    canCiz();
    const sonuc = oyunBittiMi();

    if (sonuc)
        return;

    setTimeout(oyunuCiz, 1000 / hiz);
}

function ekraniTemizle() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function yilaniCiz() {
    ctx.fillStyle = "green";
    for (let i of yilanParcalari) {
        //ctx.fillRect(i.x * konum, i.y * konum, boyut, boyut)
        ctx.drawImage(yilanKuyrukResmi, i.x * konum, i.y * konum, boyut, boyut);
    }

    yilanParcalari.push(new YilanParcasi(x, y));

    if (yilanParcalari.length > yilanUzunlugu) {
        yilanParcalari.shift();
    }

    ctx.fillStyle = "white";
    //ctx.fillRect(x * konum,y * konum,boyut,boyut)
    ctx.drawImage(yilanBasResmi, x * konum, y * konum, boyutBas, boyut);
}

function elmayiCiz() {
    ctx.fillStyle = "red";
    //ctx.fillRect(elmaX * konum, elmaY * konum,boyut,boyut);
    ctx.drawImage(elmaResmi, elmaX * konum, elmaY * konum, boyutElma, boyutElma);
}

function tusHareketleri(e) {
    switch (e.keyCode) {
        case 37: //sol
            if (hareketX === 1) return;
            hareketX = -1;
            hareketY = 0;
            yilanBasResmi=yilanBasSolResmi;
            break;
        case 38: //yukarı
            if (hareketY === 1) return;
            hareketY = -1;
            hareketX = 0;
            yilanBasResmi=yilanBasYukariResmi;
            break;
        case 39: //sağ
            if (hareketX === -1) return;
            hareketX = 1;
            hareketY = 0;
            yilanBasResmi=yilanBasSagResmi;
            break;
        case 40: //aşağı
            if (hareketY === -1) return;
            hareketY = 1;
            hareketX = 0;
            yilanBasResmi=yilanBasAsagiResmi;
            break;
    }

}

function yilanHareketiniGuncelle() {
    let sonucX = x + hareketX;
    let sonucY = y + hareketY;

    if (sonucY < 0) {
        sonucY = 21
    } else if (sonucY > 21) {
        sonucY = 0
    }

    if (sonucX < 0) {
        sonucX = 21
    } else if (sonucX > 21) {
        sonucX = 0;
    }

    x = sonucX;
    y = sonucY;
}

function elmaninKonumunuGuncelle() {
    if (x === elmaX && y === elmaY) {
        elmaX = Math.floor(Math.random() * konum/2);
        elmaY = Math.floor(Math.random() * konum/2);

        let elmaKonumuMüsaitMi = false;
        while (!elmaKonumuMüsaitMi) {
            elmaKonumuMüsaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === elmaX && parca.y === elmaY) {
                    elmaX = Math.floor(Math.random() * konum/2);
                    elmaY = Math.floor(Math.random() * konum/2);
                    elmaKonumuMüsaitMi = false;
                }
            }
        }
        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 3;
        }
    }
}

function skoruCiz() {
    ctx.fillStyle = "white";
    ctx.font = "20px verdena";
    ctx.fillText(`Skor: ${skor}`, canvasWidth - 80, 30);
}

function hiziCiz() {
    ctx.fillStyle = "white";
    ctx.font = "20px verdena";
    ctx.fillText(`Hız: ${hiz}`, canvasWidth - 160, 30);
}

function oyunBittiMi() {
    let oyunBitti = false;
    if (hareketX === 0 && hareketY === 0) return;

    for (let index in yilanParcalari) {

        let parca = yilanParcalari[index]
        if (parca.x === x && parca.y === y) {
            can--;
            if (can === 0) {
                oyunBitti = true
                break;
            }

            yilanParcalari.splice(0, index);
            yilanUzunlugu = yilanParcalari.length;
            // Reset the score based on the new length
            skor = yilanUzunlugu * 10;
            hiz -= 3;
            //oyunBitti = true;
            break;
        }
    }

    if (oyunBitti) {
        ctx.fillStyle = "white";
        ctx.font = "50px verdena";
        ctx.fillText(`Game Over!`, canvasWidth / 4.5, canvasHeight / 2);
    }

    return oyunBitti;
}

function canCiz() {
    ctx.fillStyle = "white";
    ctx.font = "20px verdena";
    ctx.fillText(`Can: ${can}`, canvasWidth - 230, 30)
}

function yeniOyun() {
    document.location.reload();
}
oyunuCiz();