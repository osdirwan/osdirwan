const soal = [
  {
    pertanyaan: "1. Siapa nama presiden pertama Indonesia?",
    pilihan: ["Soekarno", "Soeharto", "Habibie", "Jokowi"],
    jawaban: "Soekarno"
  },
  {
    pertanyaan: "2. Ibu kota provinsi Jawa Barat adalah?",
    pilihan: ["Bandung", "Bogor", "Cirebon", "Bekasi"],
    jawaban: "Bandung"
  },
  {
    pertanyaan: "3. Lambang negara Indonesia adalah?",
    pilihan: ["Garuda Pancasila", "Bendera Merah Putih", "Pohon Beringin", "Burung Elang"],
    jawaban: "Garuda Pancasila"
  },
  {
    pertanyaan: "4. Planet terdekat dengan matahari adalah?",
    pilihan: ["Merkurius", "Venus", "Mars", "Bumi"],
    jawaban: "Merkurius"
  },
  {
    pertanyaan: "5. Jumlah sila dalam Pancasila adalah?",
    pilihan: ["5", "4", "6", "7"],
    jawaban: "5"
  }
];

function mulaiKuis() {
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nama || !email) {
    alert("Silakan isi nama dan email terlebih dahulu.");
    return;
  }

  document.getElementById('identitas').style.display = 'none';
  document.getElementById('kuis').style.display = 'block';

  const form = document.getElementById('kuisForm');
  soal.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<p>${item.pertanyaan}</p>` +
      item.pilihan.map(pil =>
        `<label><input type="radio" name="q${index}" value="${pil}"/> ${pil}</label><br>`
      ).join('');
    form.appendChild(div);
  });
}

function submitKuis() {
  let skor = 0;
  soal.forEach((item, index) => {
    const jawaban = document.querySelector(`input[name="q${index}"]:checked`);
    if (jawaban && jawaban.value === item.jawaban) {
      skor++;
    }
  });

  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();

  fetch("https://script.google.com/macros/s/AKfycbyAo7Qsg3aEFT6e5Cm2g9F3uVCQf1VHDDoEmOsR2Dnlm7kUDXbtFr9JFOJ9klAcXjuf/exec", {
    method: "POST",
    body: JSON.stringify({ nama, email, skor }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(res => {
    document.getElementById('kuis').style.display = 'none';
    document.getElementById('hasil').innerHTML = `<h2>Skor Anda: ${skor}/5</h2><p>Terima kasih sudah mengikuti kuis.</p>`;
    document.getElementById('hasil').style.display = 'block';
  })
  .catch(err => alert("Gagal mengirim data. Coba lagi."));
}