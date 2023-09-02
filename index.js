const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", tusHareketleri);

let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;
let x = 20;
let y = 20;
let hareketX = 0;
let hareketY = 0;

let elmaX = 13;
let elmaY = 5;

let armutX = 19;
let armutY = 11;

let karpuzX = 3;
let karpuzY = 7;

let muzX = 8;
let muzY = 15;

let iskeletX = 16;
let iskeletY = 3;

let konum = 40;

let boyutElma = 60;
let boyutArmut = 60;
let boyutKarpuz = 60;
let boyutMuz = 60;
let boyutIskelet = 60;

let boyut = 60;
let boyutBas = 60;
let yilanUzunlugu = 5;
let yilanParcalari = [];
let skor = 0;
let hiz = 5;
let can = 3;
const elmaResmi = new Image();
elmaResmi.src = './image/elma.png';

const armutResmi = new Image();
armutResmi.src = './image/armut.png';

const karpuzResmi = new Image();
karpuzResmi.src = './image/karpuz.png';

const muzResmi = new Image();
muzResmi.src = './image/muz.png';

const iskeletResmi = new Image();
iskeletResmi.src = './image/iskelet.jpg';

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
yilanBasResmi = yilanBasSolResmi;

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
    armutuCiz();
    karpuzuCiz();
    muzuCiz();
    iskeletiCiz();
    yilanHareketiniGuncelle();
    elmaninKonumunuGuncelle();
    armutunKonumunuGuncelle();
    karpuzunKonumunuGuncelle();
    muzunKonumunuGuncelle();
    iskeletinKonumunuGuncelle();

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
    ctx.drawImage(elmaResmi, elmaX * konum, elmaY * konum, boyutElma, boyutElma);
}

function armutuCiz() {
    ctx.drawImage(armutResmi, armutX * konum, armutY * konum, boyutArmut, boyutArmut);
}

function karpuzuCiz() {
    ctx.drawImage(karpuzResmi, karpuzX * konum, karpuzY * konum, boyutKarpuz, boyutKarpuz);
}

function muzuCiz() {
    ctx.drawImage(muzResmi, muzX * konum, muzY * konum, boyutMuz, boyutMuz);
}

function iskeletiCiz() {
    ctx.drawImage(iskeletResmi, iskeletX * konum, iskeletY * konum, boyutIskelet, boyutIskelet);
}

function tusHareketleri(e) {
    switch (e.keyCode) {
        case 37: //sol
            if (hareketX === 1) return;
            hareketX = -1;
            hareketY = 0;
            yilanBasResmi = yilanBasSolResmi;
            break;
        case 38: //yukarı
            if (hareketY === 1) return;
            hareketY = -1;
            hareketX = 0;
            yilanBasResmi = yilanBasYukariResmi;
            break;
        case 39: //sağ
            if (hareketX === -1) return;
            hareketX = 1;
            hareketY = 0;
            yilanBasResmi = yilanBasSagResmi;
            break;
        case 40: //aşağı
            if (hareketY === -1) return;
            hareketY = 1;
            hareketX = 0;
            yilanBasResmi = yilanBasAsagiResmi;
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
        elmaX = Math.floor(Math.random() * konum / 2);
        elmaY = Math.floor(Math.random() * konum / 2);

        let elmaKonumuMüsaitMi = false;
        while (!elmaKonumuMüsaitMi) {
            elmaKonumuMüsaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === elmaX && parca.y === elmaY) {
                    elmaX = Math.floor(Math.random() * konum / 2);
                    elmaY = Math.floor(Math.random() * konum / 2);
                    elmaKonumuMüsaitMi = false;
                }
            }
            if (elmaX === armutX && elmaY === armutY) return;
            if (elmaX === karpuzX && elmaY === karpuzY) return;
            if (elmaX === muzX && elmaY === muzY) return;
            if (elmaX === iskeletX && elmaY === iskeletY) return;
        }
        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 2;
        }
    }
}

function armutunKonumunuGuncelle() {
    if (x === armutX && y === armutY) {
        armutX = Math.floor(Math.random() * konum / 2);
        armutY = Math.floor(Math.random() * konum / 2);

        let armutKonumuMüsaitMi = false;
        while (!armutKonumuMüsaitMi) {
            armutKonumuMüsaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === armutX && parca.y === armutY) {
                    armutX = Math.floor(Math.random() * konum / 2);
                    armutY = Math.floor(Math.random() * konum / 2);
                    armutKonumuMüsaitMi = false;
                }
            }
            if (armutX === elmaX && armutY === elmaY) return;
            if (armutX === karpuzX && armutY === karpuzY) return;
            if (armutX === muzX && armutY === muzY) return;
            if (armutX === iskeletX && armutY === iskeletY) return;
        }
        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 2;
        }
    }
}

function karpuzunKonumunuGuncelle() {
    if (x === karpuzX && y === karpuzY) {
        karpuzX = Math.floor(Math.random() * konum / 2);
        karpuzY = Math.floor(Math.random() * konum / 2);

        let karpuzKonumuMüsaitMi = false;
        while (!karpuzKonumuMüsaitMi) {
            karpuzKonumuMüsaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === karpuzX && parca.y === karpuzX) {
                    karpuzX = Math.floor(Math.random() * konum / 2);
                    karpuzY = Math.floor(Math.random() * konum / 2);
                    karpuzKonumuMüsaitMi = false;
                }
            }
            if (karpuzX === elmaX && karpuzY === elmaY) return;
            if (karpuzX === armutX && karpuzY === armutY) return;
            if (karpuzX === muzX && karpuzY === muzY) return;
            if (karpuzX === iskeletX && karpuzY === iskeletY) return;
        }
        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 2;
        }
    }
}

function muzunKonumunuGuncelle() {
    if (x === muzX && y === muzY) {
        muzX = Math.floor(Math.random() * konum / 2);
        muzY = Math.floor(Math.random() * konum / 2);

        let muzKonumuMüsaitMi = false;
        while (!muzKonumuMüsaitMi) {
            muzKonumuMüsaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === muzX && parca.y === muzY) {
                    muzX = Math.floor(Math.random() * konum / 2);
                    muzY = Math.floor(Math.random() * konum / 2);
                    muzKonumuMüsaitMi = false;
                }
            }
            if (muzX === elmaX && muzY === elmaY) return;
            if (muzX === armutX && muzY === armutY) return;
            if (muzX === karpuzX && muzY === karpuzY) return;
            if (muzX === iskeletX && muzY === iskeletY) return;
        }
        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 2;
        }
    }
}

let iskeletiYemeSayaci=0;
function iskeletinKonumunuGuncelle() {
    if (x === iskeletX && y === iskeletY) {
        iskeletX = Math.floor(Math.random() * konum / 2);
        iskeletY = Math.floor(Math.random() * konum / 2);

        let iskeletKonumuMüsaitMi = false;
        while (!iskeletKonumuMüsaitMi) {
            iskeletKonumuMüsaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === iskeletX && parca.y === iskeletY) {
                    iskeletX = Math.floor(Math.random() * konum / 2);
                    iskeletY = Math.floor(Math.random() * konum / 2);
                    iskeletKonumuMüsaitMi = false;
                }
            }
            if (iskeletX === elmaX && iskeletY === elmaY) return;
            if (iskeletX === armutX && iskeletY === armutY) return;
            if (iskeletX === karpuzX && iskeletY === karpuzY) return;
            if (iskeletX === muzX && iskeletY === muzY) return;
        }
        yilanParcalari.shift();
        yilanUzunlugu -= 2;
        skor -= 20;

        iskeletiYemeSayaci++;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 2;
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
                oyunBitti = true;
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
    if (iskeletiYemeSayaci === 2) {
        // İskeleti 3 kez yediyse canı azalt
        can--;
        iskeletiYemeSayaci = 0; // Sayacı sıfırla
        if(can===0) oyunBitti=true;
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